"use strict";

/* ==========================================
   DevPulse Enterprise Export Module
========================================== */

/* ==========================
   Metrics
========================== */

function getMetrics() {

    return {

        generatedAt: new Date().toLocaleString(),

        score: document.getElementById("score")?.textContent || "",

        lcp: document.getElementById("lcp")?.textContent || "",

        inp: document.getElementById("inp")?.textContent || "",

        cls: document.getElementById("cls")?.textContent || "",

        ram: document.getElementById("ramUsage")?.textContent || "",

        cpu: document.getElementById("cpuUsage")?.textContent || "",

        fps: document.getElementById("fps")?.textContent || "",

        battery: document.getElementById("battery")?.textContent || "",

        internet: document.getElementById("internet")?.textContent || ""

    };

}

/* ==========================
   JSON Export
========================== */

function exportJSON() {

    const report = getMetrics();

    const blob = new Blob(

        [

            JSON.stringify(report, null, 4)

        ],

        {

            type: "application/json"

        }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "DevPulse_Report.json";

    a.click();

    URL.revokeObjectURL(url);

}

/* ==========================
   CSV Export
========================== */

function exportCSV() {

    const data = getMetrics();

    let csv = "Property,Value\n";

    Object.keys(data).forEach(key => {

        csv += `${key},"${data[key]}"\n`;

    });

    const blob = new Blob(

        [

            csv

        ],

        {

            type: "text/csv"

        }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "DevPulse_Report.csv";

    a.click();

    URL.revokeObjectURL(url);

}

/* ==========================
   Notification
========================== */

function notify(message) {

    if ("Notification" in window) {

        if (Notification.permission === "granted") {

            new Notification(

                "DevPulse",

                {

                    body: message,

                    icon: "images/logo.png"

                }

            );

        }

    }

}

if ("Notification" in window) {

    Notification.requestPermission();

}

/* ==========================
   Save Settings
========================== */

function saveSettings() {

    const settings = {

        theme:

        document.body.classList.contains("dark-mode")

    };

    localStorage.setItem(

        "devpulseSettings",

        JSON.stringify(settings)

    );

}

/* ==========================
   Restore Settings
========================== */

function restoreSettings() {

    const settings = JSON.parse(

        localStorage.getItem(

            "devpulseSettings"

        )

    );

    if (!settings) return;

    if (settings.theme) {

        document.body.classList.add(

            "dark-mode"

        );

    }

}

restoreSettings();

/* ==========================
   Auto Backup
========================== */

setInterval(() => {

    localStorage.setItem(

        "DevPulseBackup",

        JSON.stringify(getMetrics())

    );

},10000);

/* ==========================
   Reset Dashboard
========================== */

function resetDashboard() {

    localStorage.removeItem(

        "DevPulseBackup"

    );

    localStorage.removeItem(

        "devpulseSettings"

    );

    location.reload();

}

/* ==========================
   Event Binding
========================== */

document

.getElementById("exportJson")

?.addEventListener(

    "click",

    exportJSON

);

document

.getElementById("exportCsv")

?.addEventListener(

    "click",

    exportCSV

);

document

.getElementById("resetDashboard")

?.addEventListener(

    "click",

    resetDashboard

);

/* ==========================
   Welcome Notification
========================== */

window.addEventListener(

    "load",

    () => {

        setTimeout(() => {

            notify(

                "Dashboard Ready"

            );

        },2000);

    }

);

console.log(

    "Export Module Loaded"

);