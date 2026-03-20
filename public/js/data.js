/**
 * Global Threat Monitor — Data Module
 * Country coordinates and attack type definitions.
 */

const COUNTRIES = [
    { name: "United States", code: "US", lat: 37.0902, lng: -95.7129 },
    { name: "China",         code: "CN", lat: 35.8617, lng: 104.1954 },
    { name: "Russia",        code: "RU", lat: 61.5240, lng: 105.3188 },
    { name: "Brazil",        code: "BR", lat: -14.235, lng: -51.9253 },
    { name: "India",         code: "IN", lat: 20.5937, lng: 78.9629  },
    { name: "Germany",       code: "DE", lat: 51.1657, lng: 10.4515  },
    { name: "United Kingdom",code: "GB", lat: 55.3781, lng: -3.4360  },
    { name: "Australia",     code: "AU", lat: -25.274, lng: 133.7751 },
    { name: "Japan",         code: "JP", lat: 36.2048, lng: 138.2529 },
    { name: "Canada",        code: "CA", lat: 56.1304, lng: -106.347 },
    { name: "France",        code: "FR", lat: 46.2276, lng: 2.2137   },
    { name: "South Korea",   code: "KR", lat: 35.9078, lng: 127.7669 },
    { name: "Netherlands",   code: "NL", lat: 52.1326, lng: 5.2913   },
    { name: "Singapore",     code: "SG", lat: 1.3521,  lng: 103.8198 },
    { name: "Ukraine",       code: "UA", lat: 48.3794, lng: 31.1656  },
    { name: "Nigeria",       code: "NG", lat: 9.0820,  lng: 8.6753   },
    { name: "South Africa",  code: "ZA", lat: -30.559, lng: 22.9375  },
    { name: "Mexico",        code: "MX", lat: 23.6345, lng: -102.553 },
    { name: "Indonesia",     code: "ID", lat: -0.7893, lng: 113.9213 },
    { name: "Turkey",        code: "TR", lat: 38.9637, lng: 35.2433  },
    { name: "Sweden",        code: "SE", lat: 60.1282, lng: 18.6435  },
    { name: "Poland",        code: "PL", lat: 51.9194, lng: 19.1451  },
    { name: "Vietnam",       code: "VN", lat: 14.0583, lng: 108.2772 },
    { name: "Argentina",     code: "AR", lat: -38.416, lng: -63.6167 },
];

const ATTACK_TYPES = [
    {
        type: 'Volumetric',
        label: 'Volumetric DDoS (UDP/TCP)',
        colors: ['#ff4444', '#aa0000'],
        dot: '#ff4444',
    },
    {
        type: 'HTTP Flood',
        label: 'Application Layer (HTTP Flood)',
        colors: ['#ffff00', '#aaaa00'],
        dot: '#ffff00',
    },
    {
        type: 'Botnet',
        label: 'Botnet Activity',
        colors: ['#00ffff', '#00aaaa'],
        dot: '#00ffff',
    },
    {
        type: 'DNS Amplification',
        label: 'DNS Amplification',
        colors: ['#ff44ff', '#aa00aa'],
        dot: '#ff44ff',
    },
];

/**
 * Target hit counters (simulated)
 */
const targetCounts = {};
COUNTRIES.forEach(c => { targetCounts[c.name] = 0; });

/**
 * Returns a random element from an array.
 */
function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generates a single attack event.
 */
function generateAttack() {
    const srcIdx = Math.floor(Math.random() * COUNTRIES.length);
    let dstIdx = Math.floor(Math.random() * COUNTRIES.length);
    while (dstIdx === srcIdx) dstIdx = Math.floor(Math.random() * COUNTRIES.length);

    const src = COUNTRIES[srcIdx];
    const dst = COUNTRIES[dstIdx];
    const jitter = CONFIG.simulation.coordJitter;
    const attackType = randomFrom(ATTACK_TYPES);

    targetCounts[dst.name] = (targetCounts[dst.name] || 0) + 1;

    return {
        startLat: src.lat + (Math.random() * jitter - jitter / 2),
        startLng: src.lng + (Math.random() * jitter - jitter / 2),
        endLat:   dst.lat + (Math.random() * jitter - jitter / 2),
        endLng:   dst.lng + (Math.random() * jitter - jitter / 2),
        color:    attackType.colors,
        type:     attackType.type,
        dot:      attackType.dot,
        src:      src.name,
        dst:      dst.name,
        timestamp: new Date(),
    };
}

/**
 * Returns top N targeted countries sorted by hit count.
 */
function getTopTargets(n = 4) {
    return Object.entries(targetCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n);
}
