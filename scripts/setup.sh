#!/usr/bin/env bash
# ============================================================
# Global Threat Monitor — Setup Script
# Usage: bash scripts/setup.sh
# ============================================================

set -euo pipefail

GREEN='\033[0;32m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m'

info()  { echo -e "${CYAN}[INFO]${NC}  $*"; }
ok()    { echo -e "${GREEN}[OK]${NC}    $*"; }
err()   { echo -e "${RED}[ERROR]${NC} $*" >&2; exit 1; }

echo ""
echo -e "${GREEN}╔══════════════════════════════════════╗"
echo -e "║   GLOBAL THREAT MONITOR — SETUP      ║"
echo -e "╚══════════════════════════════════════╝${NC}"
echo ""

# ── Check Node.js ─────────────────────────────────────────────
info "Checking Node.js..."
if ! command -v node &>/dev/null; then
    err "Node.js is not installed. Please install Node.js >= 18 from https://nodejs.org"
fi

NODE_VERSION=$(node -e "process.stdout.write(process.version.replace('v','').split('.')[0])")
if [ "$NODE_VERSION" -lt 18 ]; then
    err "Node.js $NODE_VERSION detected. Please upgrade to Node.js >= 18."
fi
ok "Node.js $(node --version) found"

# ── Check npm ─────────────────────────────────────────────────
info "Checking npm..."
if ! command -v npm &>/dev/null; then
    err "npm is not installed."
fi
ok "npm $(npm --version) found"

# ── Install dependencies ───────────────────────────────────────
info "Installing Node.js dependencies..."
npm install
ok "Dependencies installed"

# ── Create .env ────────────────────────────────────────────────
if [ ! -f ".env" ]; then
    info "Creating .env from .env.example..."
    cp .env.example .env
    ok ".env created — edit it to add your CLOUDFLARE_TOKEN (optional)"
else
    ok ".env already exists, skipping"
fi

# ── Done ───────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}✔ Setup complete!${NC}"
echo ""
echo "  Start development server:  npm run dev"
echo "  Start production server:   npm start"
echo "  Run with Docker:           docker compose up --build"
echo "  Open in browser:           http://localhost:3000"
echo ""
