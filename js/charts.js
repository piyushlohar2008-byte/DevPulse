"use strict";

/* ==========================================
   DevPulse Charts
========================================== */

Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

Chart.defaults.color = "#64748b";

Chart.defaults.plugins.legend.display = false;

/* ==========================================
   Performance Trend
========================================== */

const performanceCtx = document
    .getElementById("performanceChart")
    ?.getContext("2d");

if (performanceCtx) {

    new Chart(performanceCtx, {

        type: "line",

        data: {

            labels: [

                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"

            ],

            datasets: [

                {

                    label: "Performance",

                    data: [

                        82,
                        85,
                        89,
                        92,
                        94,
                        97,
                        99

                    ],

                    borderColor: "#2563eb",

                    backgroundColor: "rgba(37,99,235,.15)",

                    fill: true,

                    borderWidth: 4,

                    tension: .45,

                    pointRadius: 5,

                    pointHoverRadius: 8,

                    pointBackgroundColor: "#2563eb"

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            interaction: {

                intersect: false,

                mode: "index"

            },

            plugins: {

                tooltip: {

                    backgroundColor: "#0f172a",

                    padding: 14,

                    displayColors: false

                }

            },

            scales: {

                y: {

                    beginAtZero: false,

                    min: 70,

                    max: 100,

                    ticks: {

                        stepSize: 5

                    },

                    grid: {

                        color: "#edf2f7"

                    }

                },

                x: {

                    grid: {

                        display: false

                    }

                }

            }

        }

    });

}

/* ==========================================
   Core Web Vitals
========================================== */

const vitalsCtx = document
    .getElementById("vitalsChart")
    ?.getContext("2d");

if (vitalsCtx) {

    new Chart(vitalsCtx, {

        type: "bar",

        data: {

            labels: [

                "LCP",

                "INP",

                "CLS"

            ],

            datasets: [

                {

                    data: [

                        92,

                        98,

                        96

                    ],

                    backgroundColor: [

                        "#2563eb",

                        "#22c55e",

                        "#f59e0b"

                    ],

                    borderRadius: 14

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                tooltip: {

                    backgroundColor: "#0f172a"

                }

            },

            scales: {

                y: {

                    min: 0,

                    max: 100,

                    ticks: {

                        stepSize: 20

                    },

                    grid: {

                        color: "#edf2f7"

                    }

                },

                x: {

                    grid: {

                        display: false

                    }

                }

            }

        }

    });

}

/* ==========================================
   Random Live Update
========================================== */

setInterval(() => {

    if (!performanceCtx) return;

    const chart = Chart.getChart("performanceChart");

    if (!chart) return;

    chart.data.datasets[0].data.shift();

    chart.data.datasets[0].data.push(

        Math.floor(Math.random() * 8) + 92

    );

    chart.update();

}, 4000);