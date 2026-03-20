/**
 * Global Threat Monitor — Server Tests
 * Tests for Express endpoints using Supertest.
 */

'use strict';

const request = require('supertest');
const app     = require('../server');

describe('GET /health', () => {
    it('returns 200 with ok status', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('ok');
        expect(typeof res.body.uptime).toBe('number');
        expect(typeof res.body.version).toBe('string');
    });
});

describe('GET /api/radar/attacks', () => {
    it('returns 503 when no CLOUDFLARE_TOKEN is set', async () => {
        delete process.env.CLOUDFLARE_TOKEN;
        const res = await request(app).get('/api/radar/attacks');
        expect(res.statusCode).toBe(503);
        expect(res.body.simulation).toBe(true);
        expect(typeof res.body.error).toBe('string');
    });
});

describe('GET unknown route', () => {
    it('serves the SPA index.html for unknown routes', async () => {
        const res = await request(app).get('/some/unknown/path');
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toMatch(/html/);
    });
});
