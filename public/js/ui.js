/**
 * Global Threat Monitor — UI Module
 * Manages HUD updates, feed, and tooltips.
 */

let startTime = Date.now();
let totalAttacksDisplayed = 0;

/**
 * Updates the stats panel every tick.
 */
function updateStats(arcsData) {
    totalAttacksDisplayed = arcsData.length;

    // Attacks per second (simulated realistic range)
    const aps = (Math.floor(Math.random() * 600) + 2200).toLocaleString();
    document.getElementById('attack-rate').textContent = aps;

    // Bandwidth (simulated Tbps)
    const bw = (Math.random() * 3 + 0.8).toFixed(2);
    document.getElementById('bandwidth').textContent = bw;

    // Active arcs
    document.getElementById('total-attacks').textContent = totalAttacksDisplayed;

    // Uptime
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const secs = String(elapsed % 60).padStart(2, '0');
    document.getElementById('uptime').textContent = `${mins}:${secs}`;

    // Top targets
    updateTopTargets();
}

/**
 * Updates the top targets panel.
 */
function updateTopTargets() {
    const targets = getTopTargets(4);
    if (!targets.length) return;

    const maxCount = targets[0][1] || 1;
    const ids = ['tc-usa', 'tc-de', 'tc-jp', 'tc-br'];
    const names = ['United States', 'Germany', 'Japan', 'Brazil'];

    // Update counts for the fixed display countries
    targets.forEach(([name, count]) => {
        const idx = names.indexOf(name);
        if (idx !== -1) {
            const el = document.getElementById(ids[idx]);
            if (el) el.textContent = count;
        }
    });

    // Update bar widths dynamically
    const items = document.querySelectorAll('.target-bar');
    targets.slice(0, 4).forEach(([, count], i) => {
        if (items[i]) {
            const pct = Math.round((count / maxCount) * 100);
            items[i].style.width = `${pct}%`;
        }
    });
}

/**
 * Adds a new entry to the live attack feed.
 */
function addFeedItem(attack) {
    const feed = document.getElementById('attack-feed');
    const item = document.createElement('div');
    item.className = 'feed-item';

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;

    item.innerHTML = `
        <span class="feed-type" style="background: ${attack.dot};"></span>
        <span class="feed-text">${attack.src} → ${attack.dst}</span>
        <span class="feed-time">${timeStr}</span>
    `;

    feed.insertBefore(item, feed.firstChild);

    // Keep max items
    const items = feed.querySelectorAll('.feed-item');
    if (items.length > CONFIG.ui.feedMaxItems) {
        feed.removeChild(feed.lastChild);
    }
}

/**
 * Applies a filter to the arcs data and updates the globe.
 */
let currentFilter = 'all';
let masterArcsData = [];

function filterAttacks(type) {
    currentFilter = type;

    // Update button states
    document.querySelectorAll('.ctrl-btn').forEach(btn => btn.classList.remove('active'));
    const idMap = {
        'all': 'btn-all',
        'Volumetric': 'btn-vol',
        'HTTP Flood': 'btn-http',
        'Botnet': 'btn-bot',
    };
    const target = document.getElementById(idMap[type]);
    if (target) target.classList.add('active');

    // Apply filter
    const filtered = type === 'all'
        ? masterArcsData
        : masterArcsData.filter(a => a.type === type);

    updateArcs(filtered);
}

/**
 * Pause/resume the simulation.
 */
let isPaused = false;

function togglePause() {
    isPaused = !isPaused;
    const btn = document.getElementById('btn-pause');
    if (btn) {
        btn.textContent = isPaused ? '▶ RESUME' : '⏸ PAUSE';
        btn.classList.toggle('active', isPaused);
    }
}

/**
 * Shows the loading screen and fills the progress bar.
 */
function runLoader(onComplete) {
    const fill = document.getElementById('loaderFill');
    let pct = 0;
    const steps = [
        [300,  20, 'LOADING GLOBE ENGINE...'],
        [600,  45, 'INITIALIZING THREAT FEED...'],
        [900,  70, 'CONNECTING TO RADAR...'],
        [1400, 90, 'CALIBRATING SENSORS...'],
        [CONFIG.ui.loaderDurationMs, 100, 'READY'],
    ];

    steps.forEach(([delay, val]) => {
        setTimeout(() => {
            if (fill) fill.style.width = `${val}%`;
        }, delay);
    });

    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
        setTimeout(onComplete, 600);
    }, CONFIG.ui.loaderDurationMs);
}

