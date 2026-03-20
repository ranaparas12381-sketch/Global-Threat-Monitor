# ============================================================
# Global Threat Monitor — Dockerfile
# Multi-stage build for lean production image
# ============================================================

# ── Stage 1: Builder ──────────────────────────────────────────
FROM node:20-alpine AS builder

LABEL maintainer="your-email@example.com"
LABEL description="Global Threat Monitor — DDoS Intelligence Dashboard"

# Install only production dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

# ── Stage 2: Production Image ─────────────────────────────────
FROM node:20-alpine AS production

# Security: run as non-root user
RUN addgroup -g 1001 -S appgroup && \
    adduser  -u 1001 -S appuser -G appgroup

WORKDIR /app

# Copy dependencies from builder
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules

# Copy application source
COPY --chown=appuser:appgroup package*.json ./
COPY --chown=appuser:appgroup server.js      ./
COPY --chown=appuser:appgroup public/        ./public/

# Switch to non-root user
USER appuser

# Expose application port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:3000/health || exit 1

# Environment defaults
ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0

# Start the server
CMD ["node", "server.js"]
