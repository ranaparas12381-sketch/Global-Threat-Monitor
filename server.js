/**
 * Global Threat Monitor — Node.js Backend Server
 *
 * Serves the static frontend and provides a proxy API endpoint
 * for Cloudflare Radar so that API tokens are never exposed to the browser.
 *
 * Usage:
 *   node server.js
 *   PORT=3000 node server.js
 */

'use strict';

const express   = require('express');
const path      = require('path');
const cors      = require('cors');
const helmet    = require('helmet');
const morgan    = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// ── Security Middleware ───────────────────────────────────────────────────────
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc:  ["'self'"],
            scriptSrc:   ["'self'", "'unsafe-inline'", "unpkg.com", "*.unpkg.com"],
            styleSrc:    ["'self'", "'unsafe-inline'"],
            imgSrc:      ["'self'", "data:", "blob:", "unpkg.com", "*.unpkg.com"],
            connectSrc:  ["'self'", "api.cloudflare.com"],
            fontSrc:     ["'self'"],
            objectSrc:   ["'none'"],
            frameSrc:    ["'none'"],
        },
    },
}));

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());

// ── Rate Limiting ─────────────────────────────────────────────────────────────
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' },
});

app.use('/api/', apiLimiter);

// ── Static Files ──────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
    etag: true,
}));

// ── Health Check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
    res.json({
        status:    'ok',
        timestamp: new Date().toISOString(),
        uptime:    process.uptime(),
        version:   require('./package.json').version,
    });
});

// ── Cloudflare Radar Proxy ────────────────────────────────────────────────────
// Proxies requests to Cloudflare Radar API so the token stays server-side.
app.get('/api/radar/attacks', async (req, res) => {
    const token = process.env.CLOUDFLARE_TOKEN;

    if (!token) {
        return res.status(503).json({
            error: 'Cloudflare API token not configured. Running in simulation mode.',
            simulation: true,
        });
    }

    try {
        const cfUrl = new URL('https://api.cloudflare.com/client/v4/radar/attacks/layer3/summary');
        // Forward any query params (dateRange, etc.)
        Object.entries(req.query).forEach(([k, v]) => cfUrl.searchParams.set(k, v));

        const response = await fetch(cfUrl.toString(), {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type':  'application/json',
            },
        });

        if (!response.ok) {
            const errBody = await response.text();
            console.error('[Radar] Upstream error:', response.status, errBody);
            return res.status(response.status).json({ error: 'Upstream API error' });
        }

        const data = await response.json();
        res.json(data);

    } catch (err) {
        console.error('[Radar] Fetch error:', err.message);
        res.status(500).json({ error: 'Failed to fetch from Cloudflare Radar' });
    }
});

// ── SPA Fallback ──────────────────────────────────────────────────────────────
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, HOST, () => {
    console.log(`
╔══════════════════════════════════════════════╗
║       GLOBAL THREAT MONITOR — SERVER         ║
╠══════════════════════════════════════════════╣
║  Status : Running                            ║
║  Host   : http://${HOST}:${PORT}${' '.repeat(Math.max(0, 22 - (HOST+PORT).length))}║
║  Mode   : ${(process.env.NODE_ENV || 'development').padEnd(34)}║
╚══════════════════════════════════════════════╝
    `);
});

module.exports = app;
