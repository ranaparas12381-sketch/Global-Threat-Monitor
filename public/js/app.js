/**
 * Global Threat Monitor — Main Application
 * Entry point that wires together all modules.
 */

let simulationInterval = null;

/**
 * Main simulation loop — generates attacks and updates all systems.
 */
function runSimulation() {
    if (isPaused) return;

    const [minAtk, maxAtk] = CONFIG.simulation.attacksPerCycle;
    const numNewAttacks = Math.floor(Math.random() * (maxAtk - minAtk + 1)) + minAtk;

    for (let i = 0; i < numNewAttacks; i++) {
        const attack = generateAttack();
        masterArcsData.push(attack);

        // Add ring ripple at destination
        addRing(attack.endLat, attack.endLng);

        // Add to live feed (not every attack, to avoid spam)
        if (Math.random() > 0.5) {
            addFeedItem(attack);
        }
    }

    // Trim master data
    const max = CONFIG.simulation.maxArcsOnScreen;
    if (masterArcsData.length > max) {
        masterArcsData = masterArcsData.slice(masterArcsData.length - max);
    }

    // Apply current filter and render
    filterAttacks(currentFilter);
    updateStats(masterArcsData);
}

/**
 * Bootstraps the application.
 */
function init() {
    // Start loader animation, then init globe
    runLoader(() => {
        // Initialize globe
        initGlobe();

        // Auto-rotate slowly for effect
        if (world) {
            world.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 2000);
        }

        // Start the main simulation loop
        simulationInterval = setInterval(runSimulation, CONFIG.simulation.intervalMs);
    });
}

// Boot on DOM ready
document.addEventListener('DOMContentLoaded', init);
