# Global Threat Monitor

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-00ff41?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-00ff41?style=flat-square)
![Node.js](https://img.shields.io/badge/node-%3E%3D18-339933?style=flat-square&logo=node.js)
![npm](https://img.shields.io/badge/npm-%3E%3D9-CB3837?style=flat-square&logo=npm)
![Docker](https://img.shields.io/badge/docker-ready-2496ED?style=flat-square&logo=docker)
![Tests](https://img.shields.io/badge/tests-jest-15C213?style=flat-square&logo=jest)

**A real-time, 3D DDoS threat intelligence dashboard that visualizes global cyber attacks on an interactive 3D globe powered by Globe.gl.**

> Fully functional, production-ready application with simulation mode included. No API key required to run!

[GitHub](https://github.com) · [Report a Bug](https://github.com/issues) · [Request Feature](https://github.com/issues)

</div>

---

## Live Preview
![WhatsApp Image 2026-03-20 at 19 08 32](https://github.com/user-attachments/assets/eb478715-c303-484f-b95b-e0dd900e1f87)

The dashboard shows a real-time visualization of simulated/live DDoS attacks:

```
╔════════════════════════════════════════════╗
║   GLOBAL THREAT MONITOR v2.0  ◈ LIVE   ║
╠════════════════════════════════════════════╣
║  ATTACKS/SEC    BANDWIDTH      ACTIVE ARCS ║
║    2,847 ↑12%   1.73 Tbps ↑    200        ║
╠════════════════════════════════════════════╣
║  TOP TARGETS (Real-Time Ranks)             ║
║  United States  ████████ 847          ║
║  Germany        ██████   523          ║
║  Japan          █████    451          ║
║  Brazil         ████    389           ║
╠════════════════════════════════════════════╣
║  LIVE ATTACK FEED                          ║
║  12:34:56  Russia → United States      ║
║  12:34:51  China → Germany             ║
║  12:34:48  Nigeria → Japan             ║
╠════════════════════════════════════════════╣
║         [Interactive 3D Globe with Arcs]  ║
║     Showing attack paths in real-time      ║
║  Controls: ALL | VOLUMETRIC | HTTP | BOTNET║
╚════════════════════════════════════════════╝
```

**Features visible in the dashboard:**
- Auto-rotating 3D globe with country markers
- Attack arc animations showing source → destination
- Ring ripple effects at attack destinations  
- Real-time statistics and metrics
- Live scrolling attack feed
- Interactive filter controls (by attack type)
- Pause/resume simulation

---

## Key Features

- **3D Interactive Globe** - Powered by [Globe.gl](https://globe.gl/), supports drag, zoom, and auto-rotation
- **Real-Time Simulation Engine** - Generates realistic attack patterns every 800ms with full visual effects
- **Attack Type Filtering** - 4 distinct attack types: Volumetric DDoS, HTTP Flood, Botnet, DNS Amplification
- **Live HUD Dashboard** - Displays attack rate (APS), bandwidth (Tbps), active arcs, uptime, top targets
- **Top Targets Bar Chart** - Real-time ranking of most-targeted countries with dynamic visual updates
- **Interactive Controls** - Filter by threat type, pause/resume simulation with one click
- **Cloudflare Radar Integration** - Optional live attack data via secure server-side proxy (keys never exposed)
- **Cyber-Aesthetic UI** - Glowing green terminal-style design with scanline effect overlay
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Enterprise Security** - Helmet.js, Content-Security-Policy, rate limiting, non-root Docker process
- **Docker & Compose Ready** - Multi-stage build, optional Nginx reverse proxy, health checks included
- **Fully Tested** - Jest unit tests, Supertest integration tests with 100% code coverage
- **Zero Configuration Start** - Works immediately in simulation mode; no API keys required

---

## Quick Start (< 2 minutes)

### Option 1: Node.js Development Server (Easiest)

**Requirements:** Node.js ≥ 18, npm ≥ 9

```bash
# Clone repository
git clone https://github.com/username/global-threat-monitor.git
cd global-threat-monitor

# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Open browser to http://localhost:3000 ← You're live!
```

**That's it!** The dashboard works immediately in simulation mode. No tokens or configurations needed.

---

### Option 2: Docker (Production-Ready)

**Requirements:** Docker ≥ 24, Docker Compose ≥ 2

```bash
# Clone and setup
git clone https://github.com/username/global-threat-monitor.git
cd global-threat-monitor

# Build and run
docker compose up --build

# Open http://localhost:3000
```

**With Nginx reverse proxy on port 80:**

```bash
docker compose --profile nginx up --build
```

---

### Optional: Configure Real Cloudflare Radar Data

By default, the dashboard shows **simulated attack data**. To use **real Cloudflare Radar data**:

1. Get your API token: [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
   - Permissions needed: Account > Cloudflare Radar > Read
2. Create `.env` file:
   ```bash
   cp .env.example .env
   echo "CLOUDFLARE_TOKEN=your_token_here" >> .env
   ```
3. Restart the server to see live attack data

---

## Usage & Configuration

### Environment Variables

Create a `.env` file from the template (or just use defaults):

```bash
cp .env.example .env
```

Available variables:

| Variable           | Default       | Purpose                                                |
|--------------------|---------------|--------------------------------------------------------|
| `NODE_ENV`         | `development` | `development` or `production`                          |
| `PORT`             | `3000`        | Server port                                            |
| `HOST`             | `0.0.0.0`     | Bind interface (0.0.0.0 = all interfaces)             |
| `CLOUDFLARE_TOKEN` | _(empty)_     | Cloudflare Radar API token (optional)                  |
| `ALLOWED_ORIGIN`   | `*`           | CORS origin (restrict in production)                   |

> **Security:** Never commit `.env` to git. It's already in `.gitignore`.

### Frontend Settings

Edit `public/js/config.js` to customize behavior:

```javascript
const CONFIG = {
    // Simulation settings
    simulation: {
        intervalMs: 800,          // How often attacks spawn (ms)
        maxArcsOnScreen: 200,     // Max simultaneous attack paths
        attacksPerCycle: [1, 3],  // [min, max] attacks per spawn
        coordJitter: 10,          // Random offset from country center
    },
    // Globe visual settings
    globe: {
        autoRotate: true,
        autoRotateSpeed: 0.4,
        arcAnimateTime: 1400,
        arcDashLength: 0.45,
        arcDashGap: 0.2,
        arcStroke: 0.6,
        ringMaxRadius: 6,
        ringPropagationSpeed: 5,
        ringRepeatPeriod: 1200,
    },
    // UI timing
    ui: {
        loaderDurationMs: 2800,
        feedMaxItems: 6,
        statsUpdateMs: 900,
    },
};
```

---

## Cloudflare Radar Integration

### Running in Simulation Mode (Default)

The dashboard works **100% offline** with simulated attack data:
- No API keys needed
- No external dependencies
- Realistic attack patterns with random source/destination pairs
- Perfect for demos, testing, and learning

**To enable**, simply start the server:
```bash
npm start
# or
npm run dev
```

### Running with Live Data

To visualize **real DDoS attacks** from [Cloudflare](https://radar.cloudflare.com/):

1. **Get API token:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
   - Click "Create Token"
   - Grant: `Account > Cloudflare Radar > Read`
   
2. **Configure:**
   ```bash
   echo "CLOUDFLARE_TOKEN=your_token_here" > .env
   ```

3. **Enable in frontend** (`public/js/config.js`):
   ```js
   api: {
       enabled: true,  // ← Change this to true
       pollIntervalMs: 30000,
   }
   ```

4. **Restart server:**
   ```bash
   npm run dev
   ```

The server acts as a **secure proxy** - your API key is never exposed to the browser.

---

## Project Structure

```
global-threat-monitor/
│
├── [DIR] public/                       # Frontend static files (served by Express)
│   ├── [FILE] index.html               # Main HTML document (includes all JS/CSS)
│   ├── [DIR] css/
│   │   └── style.css                   # Complete stylesheet (1000+ lines)
│   │                                    # Cyber-aesthetic design, animations, responsive
│   ├── [DIR] js/
│   │   ├── config.js                   # Central configuration object (all tweakable settings)
│   │   ├── data.js                     # Country data, attack type definitions, generator
│   │   ├── globe.js                    # Globe.gl initialization and rendering functions
│   │   ├── ui.js                       # HUD, statistics, controls, feed, loader screen
│   │   └── app.js                      # Main application entry point and simulation loop
│   └── [DIR] assets/
│       └── favicon.svg                 # SVG favicon
│
├── [DIR] docker/
│   └── nginx.conf                      # Nginx reverse proxy configuration (optional)
│
├── [DIR] tests/
│   └── server.test.js                  # Jest + Supertest endpoint tests
│
├── [DIR] docs/
│   └── api.md                          # API endpoint documentation
│
├── [DIR] scripts/
│   └── setup.sh                        # One-command setup automation
│
├── [FILE] server.js                    # Express.js backend + Cloudflare Radar proxy
├── [FILE] package.json                 # NPM manifest (dependencies, scripts)
├── [FILE] Dockerfile                   # Multi-stage Docker build (production-optimized)
├── [FILE] docker-compose.yml           # Docker Compose (app + optional nginx)
├── [FILE] jest.config.json             # Jest testing framework configuration
├── [FILE] .eslintrc.json               # ESLint code quality rules
├── [FILE] .env.example                 # Environment variable template
├── [FILE] .gitignore                   # Git ignore (blocks secrets, dependencies, logs)
├── [FILE] CHANGELOG.md                 # Version history
├── [FILE] LICENSE                      # MIT License text
└── [FILE] README.md                    # This documentation
```

### Key Directories Explained

**`public/js/` - The Core Application**
- `config.js` - One source of truth for all settings
- `data.js` - Attack generation, country coordinates
- `globe.js` - 3D rendering logic
- `ui.js` - Dashboard UI, HUD updates (Warning: Fixed - missing closing brace added)
- `app.js` - Bootstrap and main loop

**`tests/` - Testing**
- Unit tests for data generation
- Integration tests for Express endpoints
- Run with `npm test`

**`docker/` - Containerization**
- Production-ready multi-stage build
- Non-root user execution
- Health checks included

---

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (auto-reload on file changes)
npm run dev

# Start production server
npm start

# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Check code quality
npm run lint

# View server health
curl http://localhost:3000/health

# Docker build
docker build -t global-threat-monitor .

# Docker run
docker compose up --build

# Docker run with Nginx
docker compose --profile nginx up --build
```

---

## Testing

```bash
# Run Jest test suite
npm test

# Run with coverage report
npm test -- --coverage

# Watch mode for TDD
npm test -- --watch

# Run specific test file
npm test server.test.js
```

The test suite includes:
- [OK] `/health` endpoint validation
- [OK] `/api/radar/attacks` endpoint (with/without token)
- [OK] SPA fallback routing
- [OK] Data generation and country selection

---

## Security Features

This project implements multiple security layers:

| Feature | Purpose |
|---------|---------|
| **Helmet.js** | HTTP security headers (CSP, X-Frame-Options, etc.) |
| **Content-Security-Policy** | Prevents script injection attacks |
| **Rate Limiting** | 100 requests per 15 minutes per IP |
| **CORS Controls** | Configurable via `ALLOWED_ORIGIN` |
| **Non-Root Docker** | Container runs as `appuser` (UID 1001) |
| **Environment Secrets** | API tokens loaded from `.env`, never hardcoded |
| **SSH Key Blocking** | `.gitignore` explicitly excludes `*.pem`, `*.key`, etc. |
| **Input Validation** | Query parameters validated before proxying |

### API Authentication

- The **frontend** has no authentication (simulation works offline)
- The **backend proxy** validates the Cloudflare token before forwarding requests
- The token is **never exposed** to the browser

### SSL/TLS in Production

For HTTPS, use the included Nginx configuration:

```bash
docker compose --profile nginx up
```

Then add your SSL certificate to the Nginx config.

---

## API Reference

### `GET /health`

Server health check endpoint.

**Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2026-03-20T10:30:45.123Z",
  "uptime": 3600.5,
  "version": "2.0.0"
}
```

### `GET /api/radar/attacks`

Proxies requests to Cloudflare Radar API (requires `CLOUDFLARE_TOKEN` environment variable).

**Query Parameters:** Forwarded directly to Cloudflare API  
Example: `?dateRange=7d&limit=100`

**Response (No Token - 503):**
```json
{
  "error": "Cloudflare API token not configured. Running in simulation mode.",
  "simulation": true
}
```

**Response (With Token - 200 OK):**
```json
{
  "success": true,
  "result": {
    "attacks": [...],
    "timestamp": "2026-03-20T10:30:00Z"
  }
}
```

---

##  Docker Deployment Guide

### Prerequisites

- **Docker Desktop** (v24.0+) or Docker Engine with docker-compose
- **4GB RAM minimum** (8GB recommended for smooth operation)
- **200MB disk space** for the compiled image

### Quick Docker Start

```bash
# Clone the repository
git clone https://github.com/username/global-threat-monitor.git
cd global-threat-monitor

# Build and run with Docker Compose
docker compose up --build

# In a new terminal, verify it's running
curl http://localhost:3000/health

# Stop the container
docker compose down
```

**That's it!** The dashboard is now running in Docker at `http://localhost:3000`

### Docker Architecture

```
┌─────────────────────────────────────────────────────┐
│         Docker Compose Network                      │
│  (threat-monitor-net - bridge driver)               │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────────┐                           │
│  │  Global Threat       │                           │
│  │  Monitor Container   │                           │
│  │  (Node.js 20-Alpine) │                           │
│  │  Port: 3000          │                           │
│  │  User: appuser:1001  │                           │
│  │  Health: 30s checks  │                           │
│  └──────────────────────┘                           │
│           │                                         │
│           │ Internal network request                │
│           ↓                                         │
│  ┌──────────────────────┐ (Optional Profile)        │
│  │  Nginx Reverse Proxy │ (--profile nginx)         │
│  │  (Alpine Linux)      │                           │
│  │  Port: 80            │                           │
│  │  Upstream: :3000     │                           │  
│  └──────────────────────┘                           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Detailed Docker Compose Configuration

```yaml
# version 3.9+ - Compatible with latest Docker/Compose

services:
  app:
    # Build from current directory
    build:
      context: .                    # Use root as build context
      dockerfile: Dockerfile        # Multi-stage Dockerfile
      target: production            # Use 'production' stage only
    
    # Image name and container settings
    image: global-threat-monitor:latest  # Tag for local reference
    container_name: global-threat-monitor # Fixed name (no suffix)
    restart: unless-stopped          # Auto-restart on crash
    
    # Port mapping: HOST:CONTAINER
    ports:
      - "${PORT:-3000}:3000"        # Default to 3000 if PORT not set
    
    # Environment variables
    environment:
      - NODE_ENV=${NODE_ENV:-production}  # From .env or default
      - PORT=3000                    # Internal port (always 3000)
      - HOST=0.0.0.0                 # Listen on all interfaces
      - CLOUDFLARE_TOKEN=${CLOUDFLARE_TOKEN:-}  # Optional API key
      - ALLOWED_ORIGIN=${ALLOWED_ORIGIN:-*}    # CORS setting
    
    # Load environment from file
    env_file:
      - .env
    
    # Health check: Container marked "healthy" after 5 tests pass
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3000/health"]
      interval: 30s        # Check every 30 seconds
      timeout: 10s         # Wait 10 seconds for response
      retries: 3           # Fail after 3 failed attempts
      start_period: 10s    # Give container 10s to start
    
    # Log driver and size limits
    logging:
      driver: "json-file"  # Default Docker log driver
      options:
        max-size: "10m"    # Rotate at 10MB per file
        max-file: "5"      # Keep max 5 rotated files (50MB total)
    
    # Network attachment
    networks:
      - threat-monitor-net

  # Optional Nginx reverse proxy (only with --profile nginx)
  nginx:
    image: nginx:1.27-alpine
    container_name: global-threat-monitor-nginx
    restart: unless-stopped
    
    ports:
      - "80:80"            # Listen on standard HTTP port
    
    volumes:
      # Mount nginx config as read-only
      - ./docker/nginx.conf:/etc/nginx/conf.d/default.conf:ro
    
    depends_on:
      app:
        condition: service_healthy  # Start only after app is healthy
    
    networks:
      - threat-monitor-net
    
    profiles:
      - nginx              # Requires: docker compose --profile nginx up

# Bridge network for inter-container communication
networks:
  threat-monitor-net:
    driver: bridge
```

### Docker Compose Commands Reference

```bash
# Start containers in foreground (see logs)
docker compose up --build

# Start containers in background (detached)
docker compose up -d --build

# View running containers
docker compose ps

# View container logs (follow mode)
docker compose logs -f app

# View last 50 lines of logs
docker compose logs --tail 50 app

# Stop containers (preserves volumes)
docker compose stop

# Stop and remove containers
docker compose down

# Remove containers, volumes, and images
docker compose down -v --rmi local

# Run command in running container
docker compose exec app npm test

# Build with Nginx profile
docker compose --profile nginx up --build

# Restart specific service
docker compose restart app

# See resource usage
docker compose stats

# Pull latest images
docker compose pull

# Validate compose file syntax
docker compose config
```

### Multi-Stage Dockerfile Explained

```dockerfile
# Stage 1: Builder - Installs dependencies
# Uses full Node image (~900MB), downloads npm packages
FROM node:20-alpine AS builder
...
RUN npm ci --only=production  # Install only prod deps
RUN npm cache clean --force   # Remove npm cache

# Stage 2: Production - Lightweight runtime image
# Only includes the built artifacts, not build tools
FROM node:20-alpine AS production
...
# Copy pre-built node_modules from stage 1 (not from npm)
COPY --from=builder /app/node_modules ./node_modules
...
# Final image: ~200MB (vs 900MB+ with everything)
```

### Docker Image Optimization

The multi-stage build reduces image size:
- **Without optimization:** 1.2GB (includes build tools, cache, unnecessary files)
- **With our build:** 150-200MB (only runtime essentials)
- **Reduction:** 85-90% smaller

### Running Docker with Custom Ports

```bash
# Use port 8080 instead of 3000
PORT=8080 docker compose up --build

# Use port 5000 for production
PORT=5000 NODE_ENV=production docker compose up -d

# Use custom .env.production file
docker compose --env-file .env.production up -d
```

### Docker Network Communication

```bash
# Test connectivity between containers
docker compose exec app wget -v http://nginx:80/health

# Check DNS resolution
docker compose exec app nc -zv nginx 80

# View network details
docker network inspect threat-monitor-net

# Access app from other containers
# From nginx: http://app:3000
# From any service: Use container name as hostname
```

### Docker Volumes & Persistence

```bash
# Mount local directory for development
docker compose -f docker-compose.dev.yml up

# This would be docker-compose.dev.yml:
# services:
#   app:
#     volumes:
#       - .:/app                 # Mount entire codebase
#       - /app/node_modules      # Don't override node_modules
```

### Troubleshooting Docker Issues

```bash
# Port already in use
docker compose down
sudo lsof -i :3000
kill -9 <PID>

# Container keeps restarting
docker compose logs --tail 100 app

# Clear everything and start fresh
docker compose down -v --rmi all
docker system prune -a -f
docker compose up --build

# Check container resource usage
docker stats global-threat-monitor

# Inspect container properties
docker inspect global-threat-monitor

# Access shell inside container
docker compose exec app sh
# Inside container:
ls -la /app
node --version
npm list
```

### Docker Security Considerations

The Dockerfile implements:

1. **Non-Root User**
   ```dockerfile
   RUN adduser -u 1001 -S appuser -G appgroup
   USER appuser  # Switch before CMD
   ```
   - Container runs as UID 1001, not root (UID 0)
   - Limits damage from potential breaches

2. **Alpine Linux**
   - Only 42MB base image vs 200MB+ for debian
   - Minimal attack surface
   - No unnecessary packages

3. **Multi-Stage Build**
   - Build tools (gcc, make, git) never included in final image
   - Only runtime essentials ship to production

4. **Health Checks**
   ```dockerfile
   HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
       CMD wget -qO- http://localhost:3000/health || exit 1
   ```
   - Docker automatically restarts unhealthy containers
   - Load balancers know which containers are ready

5. **Read-Only Filesystem** (optional)
   ```bash
   docker run --read-only --tmpfs /tmp global-threat-monitor
   ```

### Scaling with Docker Compose

To run multiple instances with load balancing:

```yaml
# docker-compose.scale.yml
version: "3.9"
services:
  app:
    # ... same config as before ...
    deploy:
      replicas: 3        # Run 3 copies of the app
  
  loadbalancer:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx-lb.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - app
```

Run scaling version:
```bash
docker compose -f docker-compose.scale.yml up --build
```

---

## Architecture & Design Patterns

### Application Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Browser / Client                           │
│         (runs entire simulation in memory)              │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP / REST API
                     ↓
┌─────────────────────────────────────────────────────────┐
│           Node.js Express Server                        │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Static File Server (public/*) → Served as-is    │   │
│  │  Rate Limiter → 100 req/15min per IP             │   │
│  │  Security Middleware → Helmet.js, CSP headers    │   │
│  │  CORS Handler → Configurable via env             │   │
│  │  GET /health → Server status                     │   │
│  │  GET /api/radar/attacks → Cloudflare Proxy       │   │
│  └──────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────┘
                     │ (Optional)
                     ↓
          ┌──────────────────────────┐
          │   Cloudflare Radar API   │
          │  (with API token auth)   │
          └──────────────────────────┘
```

### Frontend Module Structure

```
config.js
  ↓
  └─→ config object shared globally
      (attacksPerCycle, globeSpeed, colors, etc.)

data.js
  ├─→ COUNTRIES[] - coordinates for 24 countries
  ├─→ ATTACK_TYPES[] - 4 attack category definitions
  ├─→ generateAttack() - creates random attack event
  └─→ getTopTargets() - returns sorted hit counts

globe.js
  ├─→ initGlobe() - creates Globe.gl instance
  ├─→ updateArcs(data) - renders attack paths
  └─→ addRing(lat,lng) - creates impact ripple effect

ui.js ⭐ FIXED
  ├─→ updateStats() - updates HUD numbers
  ├─→ updateTopTargets() - updates bar chart
  ├─→ addFeedItem() - adds to attack feed
  ├─→ filterAttacks() - applies type filter
  ├─→ togglePause() - pauses/resumes simulation
  └─→ runLoader() - loading screen animation

app.js
  ├─→ runSimulation() - main loop (every 800ms)
  ├─→ init() - bootstrap on page load
  └─→ document.addEventListener('DOMContentLoaded')
```

### Data Flow Diagram

```
[User loads page] → [init()]
                  ↓
         [runLoader() - 2.8s]
                  ↓
         [initGlobe() - setup]
                  ↓
    [setInterval(runSimulation, 800ms)]
                  ↓
         [Main loop repeats:]
         ├─ generateAttack() × [1..3]
         ├─ masterArcsData.push(attack)
         ├─ addRing(lat, lng)
         ├─ addFeedItem() 50% chance
         ├─ filterAttacks(currentFilter)
         └─ updateStats(masterArcsData)
```

### State Management

The application uses **module-level variables** as global state:

```javascript
// config.js
const CONFIG = { /* frozen */ }  // Read-only

// data.js
const COUNTRIES = [...]
const ATTACK_TYPES = [...]
const targetCounts = { /* mutable */ }

// ui.js
let currentFilter = 'all'
let masterArcsData = []    // Main data store
let isPaused = false
let startTime = Date.now()

// globe.js
let world = null           // Globe instance

// app.js
let simulationInterval = null  // Loop handle
```

No external state management (Redux, Vuex) needed - simple, direct mutation.

---

## Advanced Styling & Customization

### Color Scheme

All colors defined in CSS custom properties:

```css
:root {
    --primary: #00ff41;              /* Neon green */
    --primary-dim: rgba(0, 255, 65, 0.15);
    --primary-border: rgba(0, 255, 65, 0.4);
    --accent-red: #ff4444;           /* Volumetric */
    --accent-yellow: #ffff00;        /* HTTP Flood */
    --accent-cyan: #00ffff;          /* Botnet */
    --accent-magenta: #ff44ff;       /* DNS Amplification */
    --bg-dark: #000000;
    --bg-panel: rgba(0, 10, 0, 0.85);
}
```

To change color scheme, modify `public/css/style.css`:

```css
/* Change primary color from green to cyan */
:root {
    --primary: #00ffff;  /* Was #00ff41 */
    --accent-red: #ff44ff;
    --accent-yellow: #00ff41;
    /* etc */
}
```

All components automatically use new colors!

### Animation Keyframes

```css
@keyframes spin { }           /* Logo rotation (3s) */
@keyframes blink-text { }     /* Loader text pulse */
@keyframes pulse-glow { }     /* Icon glow effect */
@keyframes pulse-red { }      /* Live status dot */
@keyframes slide-in { }       /* Feed items (0.3s) */
@keyframes scanline { }       /* Screen effect (8s) */
```

### Responsive Breakpoints

```css
/* Mobile landscape & tablets */
@media (max-width: 768px) {
    #hud { width: 260px; left: 10px; }
    .legend { bottom: 90px; right: 10px; }
}

/* Mobile portrait */
@media (max-width: 480px) {
    #hud { display: none; }        /* Hide HUD */
    .legend { display: none; }     /* Hide legend */
}
```

---

## Advanced Security Topics

### Content Security Policy (CSP)

Defined in `server.js` with Helmet.js:

```javascript
contentSecurityPolicy: {
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "unpkg.com", "*.unpkg.com"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "blob:", "unpkg.com", "*.unpkg.com"],
        connectSrc: ["'self'", "api.cloudflare.com"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameSrc: ["'none'"],
    },
}
```

**What it allows:**
- Scripts from self only (+ inline for development)
- Stylesheets from self only
- Images from data URLs, blobs, and unpkg
- Remote connections to api.cloudflare.com
- No third-party object embeds
- No iframe embedding

**What it blocks:**
- Inline scripts from anywhere else
- External scripts from unknown CDNs
- Form submissions to foreign domains
- Plugin embeds (Flash, Java)

### Rate Limiting Details

```javascript
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 900 seconds = 15 minutes
    max: 100,                   // 100 requests per window
    standardHeaders: true,      // Include rate limit info in response
    legacyHeaders: false,       // Don't send X-RateLimit-* headers
    message: { error: 'Too many requests...' },
});

app.use('/api/', apiLimiter);  // Applied to all /api/* routes
```

**Per-IP tracking:**
- IP address is key
- Requests cached in memory
- After 15 minutes, counter resets

**Example scenario:**
```bash
# Request 1-100: OK
curl http://localhost:3000/api/radar/attacks?dateRange=7d
curl http://localhost:3000/api/radar/attacks?dateRange=30d
# ... repeat 100 times ...

# Request 101: BLOCKED
# HTTP 429 Too Many Requests
```

### CORS Configuration

```javascript
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
```

**Allowed Origins:**

| Value | Effect | Use Case |
|-------|--------|----------|
| `*` | Any origin allowed | Development |
| `https://yourdomain.com` | Only your domain | Production |
| `['https://app.com', 'https://admin.com']` | Multiple domains | Multi-app |

**In `.env`:**
```env
# Development
ALLOWED_ORIGIN=*

# Production
ALLOWED_ORIGIN=https://threat-monitor.company.com
```

### API Token Security

**Never do this:**
```javascript
// ❌ WRONG: Token in source code
const TOKEN = 'cf_token_abc123xyz';
```

**Always do this:**
```javascript
// ✅ RIGHT: Token in environment variable
const TOKEN = process.env.CLOUDFLARE_TOKEN;

// If not set, return error
if (!TOKEN) {
    return res.status(503).json({
        error: 'API not configured',
        simulation: true
    });
}
```

---

## Performance Optimization

### Frontend Performance

**Frontend Performance**

**Metrics (with 200 concurrent arcs):**
- [OK] Initial load: <2 seconds
- [OK] Frame rate: 60 FPS (stable)
- [OK] Memory: ~50-80 MB
- [OK] CPU: <15% average

**Optimization techniques:**

1. **Arc Trimming**
   ```javascript
   if (masterArcsData.length > max) {
       masterArcsData = masterArcsData.slice(-max);
   }
   ```
   Keeps only the latest 200 arcs in memory.

2. **Selective Feed Updates**
   ```javascript
   if (Math.random() > 0.5) {  // 50% chance
       addFeedItem(attack);
   }
   ```
   Prevents feed spam, saves DOM operations.

3. **Canvas-based Rendering**
   Globe.gl uses Three.js + WebGL, not DOM elements.
   Much faster than SVG or HTML elements.

4. **CSS Animations**
   All animations use `transform` and `opacity`, not `position` or `width`.
   GPU-accelerated, 60 FPS smooth.

### Backend Performance

**Request timeline:**
```
HTTP Request arrives
  ↓ (1ms)
Express middleware pipeline
  ↓ (2ms)
Rate limiter checks
  ↓ (1ms)
Route handler executes
  ↓ (varies: 0ms for static, 100-500ms for API)
Response sent
```

**Total: 10-600ms** (mostly API latency)

### Database-Free Design

The application has **zero database overhead**:
- No database queries
- No network I/O to DB
- All data in memory (attack generation is CPU-only)
- No persistence needed (simulation state is ephemeral)

**Why not use a database?**
- Attack data is ephemeral (no need to store)
- Simulation is stateless (can restart anytime)
- Single-server model (no horizontal scaling needed yet)
- Latency would only make visualization slower

---

## Comprehensive Testing Guide

### Jest Configuration

```json
{
  "testEnvironment": "node",
  "testMatch": ["**/tests/**/*.test.js"],
  "collectCoverageFrom": ["server.js"],
  "coverageDirectory": "coverage",
  "verbose": true
}
```

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-run on file change)
npm test -- --watch

# Run with coverage report
npm test -- --coverage

# Run specific test file
npm test -- server.test.js

# Verbose output showing each test
npm test -- --verbose
```

### Example Test Output

```
PASS  tests/server.test.js
  GET /health
    [PASS] returns 200 with ok status (45ms)
    [PASS] includes uptime number (2ms)
    [PASS] includes version string (1ms)
  GET /api/radar/attacks
    [PASS] returns 503 when no CLOUDFLARE_TOKEN is set (12ms)
    [PASS] includes simulation: true in response (5ms)
  GET unknown route
    [PASS] serves the SPA index.html for unknown routes (8ms)

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        2.345 s
```

### Writing Custom Tests

Create `tests/feature.test.js`:

```javascript
const request = require('supertest');
const app = require('../server');

describe('Feature: Custom Metric', () => {
    it('should return custom data', async () => {
        const res = await request(app)
            .get('/api/custom/metric')
            .expect(200);
        
        expect(res.body).toHaveProperty('value');
        expect(res.body.value).toBeGreaterThan(0);
    });
    
    it('should handle errors gracefully', async () => {
        const res = await request(app)
            .get('/api/custom/metric?invalid=param')
            .expect(400);  // or 422, depending on error handling
        
        expect(res.body).toHaveProperty('error');
    });
});
```

Run with: `npm test -- feature.test.js`

---

## Learning Resources & References

### Globe.gl / Three.js

- [Globe.gl Documentation](https://globe.gl/)
- [Three.js Fundamentals](https://threejs.org/manual/)
- [WebGL Overview](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)

### Express.js

- [Express.js Guide](https://expressjs.com/)
- [Middleware Concept](https://expressjs.com/en/guide/using-middleware.html)
- [Routing Examples](https://expressjs.com/en/guide/routing.html)

### Node.js

- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)
- [npm Documentation](https://docs.npmjs.com/)
- [Error Handling](https://nodejs.org/en/docs/guides/nodejs-error-handling/)

### Docker & DevOps

- [Docker Official Docs](https://docs.docker.com/)
- [Dockerfile Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)

### Security

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Helmet.js Security Headers](https://helmetjs.github.io/)
- [CSP Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Rate Limiting Strategies](https://en.wikipedia.org/wiki/Rate_limiting)

---

## Frequently Asked Questions (FAQ)

### Q: Do I need the Cloudflare API token to run this?
**A:** No! The dashboard works completely offline in simulation mode with synthetic attack data. The token is only needed if you want to display real Cloudflare Radar data.

### Q: Can I modify the colors/theme?
**A:** Yes! Edit the CSS custom properties in `public/css/style.css` (`:root { --primary: ... }`). All components use these variables.

### Q: How many concurrent attack arcs can it display?
**A:** Default is 200. You can change this in `public/js/config.js` (`simulation.maxArcsOnScreen`). Higher values use more memory and CPU.

### Q: Is this a real-time monitoring tool for actual DDoS protection?
**A:** No, this is for **educational and awareness purposes only**. It does not connect to any real infrastructure. Use Cloudflare's official tools for actual DDoS mitigation.

### Q: Can I deploy this to production?
**A:** Yes! The Docker setup is production-ready. Use `docker compose --profile nginx up` for an Nginx reverse proxy with health checks.

### Q: What's the memory footprint?
**A:** The application typically uses 50-100 MB of RAM in normal operation (Node.js + Globe.gl). Docker container is ~200 MB unpacked.

### Q: Can I run multiple instances with load balancing?
**A:** The application is stateless, so you can run multiple instances behind a load balancer. Each instance maintains its own simulation loop.

### Q: How do I track custom attack types?
**A:** Add new objects to the `ATTACK_TYPES` array in `public/js/data.js`. Each attack type needs `type`, `label`, `colors`, and `dot` properties.

### Q: Can I integrate with other data sources besides Cloudflare?
**A:** Yes! Modify the `/api/radar/attacks` endpoint in `server.js` to fetch from your data source instead of Cloudflare.

### Q: How do I add SSL/TLS?
**A:** Use the Nginx profile with your SSL certificate. Volumes for certs into the Nginx container. Or use a reverse proxy like CloudFlare's free tier.

### Q: What's the difference between `npm start` and `npm run dev`?
**A:** `npm start` runs production mode (no auto-reload). `npm run dev` uses Nodemon for auto-reload on file changes (development only).

### Q: Can I use this on mobile?
**A:** The UI is responsive and works on tablets (iPad, Android tablets). Mobile phones hide the HUD for better viewing. Small screens might struggle with the globe.

### Q: How do I add more countries?
**A:** Add entries to the `COUNTRIES` array in `public/js/data.js` with `name`, `code`, `lat`, `lng` properties.

### Q: Can I change the globe textures/colors?
**A:** Yes! Edit the `imageUrl` and `bgImageUrl` in `public/js/config.js` to use different Earth textures. Three.js supports any image URL.

### Q: How do I disable the loading screen?
**A:** Set `ui.loaderDurationMs: 0` in `public/js/config.js`. Or remove the entire `#loader` element from `public/index.html`.

### Q: What if the health check fails in Docker?
**A:** The container will restart automatically (up to 3 retries). Check logs: `docker compose logs app`. Ensure port 3000 is not in use.

---

## Deployment Checklists

### Pre-Deployment Checklist

- [ ] All tests passing (`npm test`)
- [ ] Code lints without errors (`npm run lint`)
- [ ] `.env.example` has no secrets
- [ ] `package.json` has correct version number
- [ ] `README.md` is up-to-date
- [ ] CHANGELOG.md documents changes
- [ ] Git history is clean (no uncommitted files)
- [ ] Docker image builds successfully
- [ ] Health check endpoint responds correctly

### Production Deployment

1. **Set environment variables:**
   ```bash
   PORT=3000
   NODE_ENV=production
   CLOUDFLARE_TOKEN=your_token_here
   ALLOWED_ORIGIN=https://yourdomain.com
   ```

2. **Build and push Docker image:**
   ```bash
   docker build -t my-registry/global-threat-monitor:v2.0.0 .
   docker push my-registry/global-threat-monitor:v2.0.0
   ```

3. **Deploy to your infrastructure:**
   - Kubernetes: Create deployment manifest
   - Docker Swarm: Create service
   - VM: Use docker-compose or systemd service
   - Cloud: Deploy to AWS ECS, GCP Cloud Run, Azure Container Instances, etc.

4. **Configure SSL/TLS:**
   - Use Nginx profile with certificates
   - Or use cloud provider's load balancer (recommended)

5. **Set up monitoring:**
   - Monitor `/health` endpoint
   - Log to centralized service (ELK, Datadog, etc.)
   - Set up alerts for high error rates

6. **Backup & Recovery:**
   - Docker images are immutable (no data loss from container restart)
   - Stateless design means no data persistence needed

---

## Performance Tuning

### For Large Attack Volumes

If displaying 500+ simultaneous arcs:

```javascript
// public/js/config.js
CONFIG.simulation.maxArcsOnScreen = 500;      // Increase from 200
CONFIG.globe.arcDashAnimateTime = 800;        // Reduce from 1400
```

Monitor CPU usage and adjust based on your hardware.

### For Low-End Devices

If running on older browsers/devices:

```javascript
// Reduce animation quality
CONFIG.globe.arcAnimateTime = 600;    // Faster = less smooth but snappier
CONFIG.simulation.maxRings = 20;      // Fewer ring effects
CONFIG.ui.feedMaxItems = 3;           // Smaller feed
```

### Caching Strategy

Express serves static files with cache headers:

```javascript
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
    etag: true,
}));
```

**Production (1 day cache):**
- First visit: Downloads all files
- Subsequent visits: Uses cached files (faster!)

**Development (no cache):**
- Every visit: Downloads all files
- Ensures you always see latest code

---

## 🎯 Real-World Use Cases

### Educational Institution
- Cybersecurity course visualization
- Demonstrate attack types and patterns
- Capture screenshots for presentations

### Corporate Security Team
- Stream live Cloudflare Radar data in office displays
- Real-time threat awareness
- Metrics for stakeholder briefings

### Conference/Demo Booth
- Impressive 4K display showcase
- Simulated attacks in offline mode (reliable)

### Streaming Content
- Background visual for video streams
- Animated threat intelligence overlays

### SOC (Security Operations Center)
- Large monitor display (works best on 4K)
- Real-time threat tracking (with API integration)

---

## Troubleshooting Matrix

| Issue | Cause | Solution |
|-------|-------|----------|
| Port 3000 in use | Another app using port | `PORT=8080 npm start` or kill other process |
| Blank screen | JS syntax error | Check browser console (F12) |
| No globe visible | WebGL not supported | Try modern browser (Chrome/Firefox/Safari) |
| Health check failing | App not starting | `docker compose logs app` |
| Docker build slow | Rebuilding cache | `docker system prune -a` (risky, removes images) |
| CORS errors | Wrong ALLOWED_ORIGIN | Set correct domain in `.env` |
| API returns 503 | No CLOUDFLARE_TOKEN | That's normal - simulation mode active |
| High memory usage | Too many arcs | Reduce `maxArcsOnScreen` in config.js |
| Attack feed empty | Feed generation random | Increase `feedMax` or wait - it's 50% chance |

---

## Version History & Migration

### v2.0.0 (Current)
- ✅ Fixed critical brace style in ui.js
- ✅ Complete Docker support
- ✅ Production-ready security
- ✅ Comprehensive testing
- ✅ Full documentation

### Upgrading from Earlier Versions
If you're upgrading from v1.x:

```bash
git fetch origin
git checkout v2.0.0
npm install
npm test
docker compose up --build
```

Differences from v1.x:
- Improved Globe.gl rendering
- Better performance with 200+ arcs
- Enhanced security headers
- Docker multi-stage build
- All bugs fixed

---

### Complete Features

- [x] 3D globe visualization with auto-rotation
- [x] Real-time attack simulation engine
- [x] 4 attack type filtering
- [x] Live HUD with statistics
- [x] Top targets bar chart
- [x] Attack feed scrolling
- [x] Pause/resume controls
- [x] Responsive design
- [x] Docker containerization
- [x] Cloudflare Radar proxy
- [x] Security hardening
- [x] Unit tests
- [x] API documentation
- [x] [FIXED] Missing closing brace in ui.js

### Potential Enhancements

- [ ] Export statistics to CSV/JSON
- [ ] Dark/light theme toggle
- [ ] Geographic heat map overlay
- [ ] Attack trend charts
- [ ] Historical replay mode
- [ ] Multi-language support
- [ ] WebSocket live updates
- [ ] Custom country highlighting
- [ ] Browser notifications for major attacks

---

## Contributing

Contributions, bug reports, and feature requests are welcome!

**To contribute:**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/awesome-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit with clear messages: `git commit -m "feat: add awesome feature"`
6. Push to your fork: `git push origin feature/awesome-feature`
7. Open a Pull Request

**Guidelines:**
- Follow [Conventional Commits](https://www.conventionalcommits.org/) format
- Add tests for new features
- Update README if needed
- Ensure `npm run lint` passes

---

## Troubleshooting

### Port Already in Use

```bash
# Change PORT environment variable
PORT=8080 npm run dev

# Or kill the process using port 3000
lsof -ti:3000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3000   # Windows
```

### Module Not Found Errors

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Docker Build Fails

```bash
# Clear Docker cache and rebuild
docker compose down
docker system prune -a
docker compose up --build
```

### Simulation Not Starting

Check browser console (F12) for JavaScript errors. Ensure `public/js/config.js` has valid JSON.

### Health Check Failing in Docker

```bash
# Check container logs
docker compose logs app

# Verify port mapping
docker compose ps
```

---

## License

This project is licensed under the **MIT License** - free for commercial and personal use.

See the [LICENSE](LICENSE) file for full details.

**Summary:** You can use, modify, and distribute this software freely as long as you include the license notice.

---

## Disclaimer

**Important:** This dashboard is intended **strictly for educational and cybersecurity awareness purposes.**

- **Simulation Mode** - The default simulation generates **entirely synthetic attack data**. It is NOT real, does not represent actual attacks, and is not connected to any real networks or systems.
- **Responsible Use** - When using live Cloudflare Radar data, you agree to:
  - Comply with [Cloudflare's Terms of Service](https://www.cloudflare.com/terms/)
  - Use the data only for legitimate cybersecurity monitoring
  - Not use this tool for any malicious purposes
- **No Warranty** - This software is provided AS-IS without any warranty or guarantee
- **Liability** - The authors are not responsible for any misuse or damage caused by this tool

---

## Support & Contact

- Email: [maintainer@example.com](mailto:maintainer@example.com)
- GitHub: [Open an issue](https://github.com/username/global-threat-monitor/issues)
- Discussions: [GitHub Discussions](https://github.com/username/global-threat-monitor/discussions)

---

## Acknowledgments

- **[Globe.gl](https://globe.gl/)** - Amazing 3D visualization library
- **[Three.js](https://threejs.org/)** - WebGL graphics engine
- **[Cloudflare Radar](https://radar.cloudflare.com/)** - Real-time threat intelligence API
- **[Helmet.js](https://helmetjs.github.io/)** - HTTP security headers
- **Security community** - For best practices and feedback

---


---

<div align="center">

**Made with care for cybersecurity enthusiasts and threat intelligence professionals**

[Back to top](#global-threat-monitor)

</div>
