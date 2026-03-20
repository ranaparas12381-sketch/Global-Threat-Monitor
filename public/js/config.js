/**
 * Global Threat Monitor — Configuration
 * Modify these settings to customize the dashboard behavior.
 */
const CONFIG = {
    // Globe settings
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
        imageUrl: '//unpkg.com/three-globe/example/img/earth-night.jpg',
        bgImageUrl: '//unpkg.com/three-globe/example/img/night-sky.png',
    },

    // Simulation settings
    simulation: {
        intervalMs: 800,          // How often new attacks spawn
        maxArcsOnScreen: 200,     // Max simultaneous arcs
        maxRings: 60,             // Max simultaneous rings
        attacksPerCycle: [1, 3],  // [min, max] attacks per interval
        coordJitter: 10,          // Random offset from country center (degrees)
    },

    // API settings (for real Cloudflare Radar integration)
    api: {
        enabled: false,           // Set true to use live Cloudflare Radar API
        endpoint: 'https://api.cloudflare.com/client/v4/radar/attacks/layer3/summary',
        // Token is loaded from environment variable — never hardcode here
        // Set CLOUDFLARE_TOKEN in your .env file
        pollIntervalMs: 30000,    // How often to fetch real data (30s)
    },

    // UI settings
    ui: {
        loaderDurationMs: 2800,
        feedMaxItems: 6,
        statsUpdateMs: 900,
    },
};

// Freeze to prevent accidental mutation
Object.freeze(CONFIG);
Object.freeze(CONFIG.globe);
Object.freeze(CONFIG.simulation);
Object.freeze(CONFIG.api);
Object.freeze(CONFIG.ui);
