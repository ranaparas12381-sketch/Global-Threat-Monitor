/**
 * Global Threat Monitor — Globe Module
 * Handles globe initialization and rendering.
 */

let world = null;

/**
 * Initialize the Globe.gl instance.
 */
function initGlobe() {
    const cfg = CONFIG.globe;

    world = Globe()
        (document.getElementById('globeViz'))
        .width(window.innerWidth)
        .height(window.innerHeight)
        .globeImageUrl(cfg.imageUrl)
        .backgroundImageUrl(cfg.bgImageUrl)
        // Arc (attack path) settings
        .arcsData([])
        .arcColor('color')
        .arcDashLength(cfg.arcDashLength)
        .arcDashGap(cfg.arcDashGap)
        .arcDashAnimateTime(cfg.arcAnimateTime)
        .arcStroke(cfg.arcStroke)
        .arcAltitudeAutoScale(0.3)
        // Ring (impact) settings
        .ringsData([])
        .ringColor(() => t => `rgba(255, 80, 30, ${1 - t})`)
        .ringMaxRadius(cfg.ringMaxRadius)
        .ringPropagationSpeed(cfg.ringPropagationSpeed)
        .ringRepeatPeriod(cfg.ringRepeatPeriod)
        // Point (node) settings
        .pointsData(COUNTRIES)
        .pointLat('lat')
        .pointLng('lng')
        .pointColor(() => 'rgba(0, 255, 65, 0.6)')
        .pointAltitude(0.002)
        .pointRadius(0.25)
        .pointLabel(d => `<div style="
            background: rgba(0,10,0,0.9);
            border: 1px solid rgba(0,255,65,0.4);
            padding: 6px 10px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 11px;
            color: #00ff41;
        ">${d.name} (${d.code})</div>`);

    // Auto-rotate
    world.controls().autoRotate = cfg.autoRotate;
    world.controls().autoRotateSpeed = cfg.autoRotateSpeed;
    world.controls().enableDamping = true;

    // Resize handler
    window.addEventListener('resize', () => {
        world.width(window.innerWidth);
        world.height(window.innerHeight);
    });

    return world;
}

/**
 * Add a new set of arcs to the globe.
 */
function updateArcs(arcsData) {
    if (!world) return;
    const max = CONFIG.simulation.maxArcsOnScreen;
    const trimmed = arcsData.length > max
        ? arcsData.slice(arcsData.length - max)
        : arcsData;
    world.arcsData(trimmed);
}

/**
 * Add ring impact effects at destination coordinates.
 */
function addRing(lat, lng) {
    if (!world) return;
    const current = world.ringsData();
    const next = [...current, { lat, lng }];
    const max = CONFIG.simulation.maxRings;
    world.ringsData(next.length > max ? next.slice(next.length - max) : next);
}
