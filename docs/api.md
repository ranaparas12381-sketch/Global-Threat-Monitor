# API Documentation

## Base URL

```
http://localhost:3000
```

---

## Endpoints

### Health Check

```
GET /health
```

Returns server status and uptime.

**Response 200:**
```json
{
  "status": "ok",
  "timestamp": "2026-03-20T10:00:00.000Z",
  "uptime": 120.5,
  "version": "2.0.0"
}
```

---

### Cloudflare Radar Proxy

```
GET /api/radar/attacks
```

Securely proxies requests to the Cloudflare Radar Layer 3 Attack Summary API. The server-side API token is never exposed to the browser.

**Query Parameters:**

All query parameters are forwarded directly to the Cloudflare Radar API. Common parameters include:

| Parameter   | Type   | Description                         | Example              |
|-------------|--------|-------------------------------------|----------------------|
| `dateRange` | string | Time range for data                 | `1d`, `7d`, `30d`    |
| `location`  | string | Filter by country code (ISO 3166-1) | `US`, `DE`, `CN`     |

**Response (token configured) 200:**
```json
{
  "result": {
    "udp": "45.2",
    "tcp": "30.1",
    "icmp": "12.4",
    "gre": "8.9",
    "other": "3.4"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

**Response (no token) 503:**
```json
{
  "error": "Cloudflare API token not configured. Running in simulation mode.",
  "simulation": true
}
```

**Response (upstream error) 4xx/5xx:**
```json
{
  "error": "Upstream API error"
}
```

**Rate Limit:** 100 requests per 15 minutes per IP.

---

## Error Codes

| Code | Meaning                             |
|------|-------------------------------------|
| 200  | Success                             |
| 429  | Rate limit exceeded                 |
| 500  | Internal server error               |
| 503  | Upstream service unavailable        |
