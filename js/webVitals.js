"use strict";

/* ==========================================
   DevPulse
   Core Web Vitals
========================================== */

const metrics = {
    lcp: 0,
    cls: 0,
    inp: 0
};

/* ==========================================
   LCP
========================================== */

if ("PerformanceObserver" in window) {

    try {

        new PerformanceObserver((entryList) => {

            const entries = entryList.getEntries();

            const lastEntry = entries[entries.length - 1];

            metrics.lcp = (lastEntry.startTime / 1000).toFixed(2);

            const element = document.getElementById("lcp");

            if (element) {

                element.textContent = metrics.lcp + " s";

            }

        }).observe({

            type: "largest-contentful-paint",

            buffered: true

        });

    } catch (error) {

        console.log(error);

    }

}

/* ==========================================
   CLS
========================================== */

let clsValue = 0;

let clsEntries = [];

try {

    new PerformanceObserver((list) => {

        for (const entry of list.getEntries()) {

            if (!entry.hadRecentInput) {

                clsValue += entry.value;

                clsEntries.push(entry);

            }

        }

        metrics.cls = clsValue.toFixed(3);

        const cls = document.getElementById("cls");

        if (cls) {

            cls.textContent = metrics.cls;

        }

    }).observe({

        type: "layout-shift",

        buffered: true

    });

} catch (error) {

    console.log(error);

}

/* ==========================================
   INP (Demo)
========================================== */

document.addEventListener("click", () => {

    const start = performance.now();

    requestAnimationFrame(() => {

        const end = performance.now();

        metrics.inp = Math.round(end - start);

        const inp = document.getElementById("inp");

        if (inp) {

            inp.textContent = metrics.inp + " ms";

        }

    });

});

/* ==========================================
   Performance Score
========================================== */

function calculateScore() {

    let score = 100;

    if (metrics.lcp > 2.5) score -= 20;

    if (metrics.cls > 0.1) score -= 20;

    if (metrics.inp > 200) score -= 20;

    if (score < 0) score = 0;

    const scoreElement = document.getElementById("score");

    if (scoreElement) {

        scoreElement.textContent = score;

    }

}

setInterval(calculateScore, 2000);

/* ==========================================
   Navigation Timing
========================================== */

window.addEventListener("load", () => {

    const timing = performance.getEntriesByType("navigation")[0];

    if (!timing) return;

    console.table({

        DNS: timing.domainLookupEnd - timing.domainLookupStart,

        TCP: timing.connectEnd - timing.connectStart,

        Request: timing.responseStart - timing.requestStart,

        Response: timing.responseEnd - timing.responseStart,

        DOM: timing.domComplete - timing.domInteractive,

        Total: timing.loadEventEnd - timing.startTime

    });

});

/* ==========================================
   Export Metrics
========================================== */

window.devPulseMetrics = metrics;

console.log("Core Web Vitals Loaded");