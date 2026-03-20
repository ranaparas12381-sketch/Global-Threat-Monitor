# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] — 2026-03-20

### Added
- Complete project restructure into organized module layout
- Node.js / Express backend server with secure Cloudflare Radar proxy
- Multi-stage Dockerfile with non-root user for security
- Docker Compose with optional Nginx reverse proxy profile
- 4th attack type: DNS Amplification (magenta arcs)
- Live attack feed panel in HUD showing real-time events
- Top Targets panel with animated progress bars
- Uptime counter and active arc count in stats grid
- Filter controls: filter by attack type or pause/resume
- Loading screen with animated progress bar
- Globe node markers for all 24 countries
- Responsive CSS with mobile breakpoints
- Scanline CRT overlay effect
- Helmet.js security headers + Content-Security-Policy
- Express rate limiting on API routes (100 req / 15 min)
- Environment variable configuration via `.env`
- `.env.example` template
- `.gitignore` with explicit SSH key exclusions
- MIT License
- Comprehensive README with badges, quick-start, and Docker reference
- API documentation (`docs/api.md`)
- Jest + Supertest test suite
- ESLint configuration
- `scripts/setup.sh` one-command setup
- `CHANGELOG.md`
- Expanded country list from 8 to 24 nations

### Changed
- Split monolithic HTML into separate JS modules (config, data, globe, ui, app)
- CSS extracted to external stylesheet with CSS custom properties
- Globe.gl pinned to version 2.27.2 for reproducibility
- Simulation interval refined to 800ms with cleaner memory management

### Fixed
- Memory leak in rings array (now properly bounded to `maxRings`)
- Arc array not trimming correctly on rapid spawns
- Globe not resizing on window resize events

### Removed
- Hardcoded API token references from source code
- Accidental SSH private/public key files from repository
- Inline styles scattered throughout HTML

---

## [1.0.0] — 2025-12-27

### Added
- Initial proof-of-concept: single HTML file with embedded JS
- Globe.gl 3D globe with auto-rotate
- Simulated DDoS attack arcs (Volumetric, HTTP Flood, Botnet)
- Basic HUD with attack rate, bandwidth, top target
- 8 country coordinates
