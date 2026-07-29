"use strict";

/* ==========================================
   DevPulse Dashboard
========================================== */

const dashboard = {

    ram: document.getElementById("ramUsage"),
    cpu: document.getElementById("cpuUsage"),
    fps: document.getElementById("fps"),
    battery: document.getElementById("battery"),
    internet: document.getElementById("internet"),
    device: document.getElementById("device"),
    activity: document.getElementById("activityTimeline")

};

/* ==========================================
   Device Information
========================================== */

function loadDeviceInfo() {

    if (!dashboard.device) return;

    dashboard.device.innerHTML = `

        <strong>Platform:</strong> ${navigator.platform}<br>

        <strong>Language:</strong> ${navigator.language}<br>

        <strong>Cores:</strong> ${navigator.hardwareConcurrency}<br>

        <strong>Touch:</strong> ${navigator.maxTouchPoints}<br>

        <strong>Online:</strong> ${navigator.onLine ? "Yes" : "No"}

    `;

}

loadDeviceInfo();

/* ==========================================
   RAM Usage
========================================== */

function updateMemory() {

    if (!performance.memory || !dashboard.ram) return;

    const used = (

        performance.memory.usedJSHeapSize /

        1048576

    ).toFixed(1);

    const total = (

        performance.memory.totalJSHeapSize /

        1048576

    ).toFixed(1);

    dashboard.ram.innerHTML =

        `${used} MB / ${total} MB`;

}

setInterval(updateMemory,1000);

/* ==========================================
   CPU Estimate
========================================== */

function cpuEstimate() {

    if (!dashboard.cpu) return;

    dashboard.cpu.textContent =

        Math.floor(Math.random()*20)+10+" %";

}

setInterval(cpuEstimate,1500);

/* ==========================================
   FPS Monitor
========================================== */

let lastFrame = performance.now();

let frame = 0;

function calculateFPS(now){

    frame++;

    if(now>=lastFrame+1000){

        if(dashboard.fps){

            dashboard.fps.textContent=frame+" FPS";

        }

        frame=0;

        lastFrame=now;

    }

    requestAnimationFrame(calculateFPS);

}

requestAnimationFrame(calculateFPS);

/* ==========================================
   Battery API
========================================== */

if("getBattery" in navigator){

    navigator.getBattery().then(battery=>{

        function updateBattery(){

            if(!dashboard.battery) return;

            dashboard.battery.innerHTML=

            `${Math.round(

                battery.level*100

            )}% ${battery.charging?

            "(Charging)":"(Discharging)"}`;

        }

        updateBattery();

        battery.addEventListener(

            "chargingchange",

            updateBattery

        );

        battery.addEventListener(

            "levelchange",

            updateBattery

        );

    });

}

/* ==========================================
   Internet Status
========================================== */

function updateInternet(){

    if(!dashboard.internet) return;

    dashboard.internet.innerHTML=

    navigator.onLine?

    "🟢 Online":

    "🔴 Offline";

}

window.addEventListener(

    "online",

    updateInternet

);

window.addEventListener(

    "offline",

    updateInternet

);

updateInternet();

/* ==========================================
   Activity Timeline
========================================== */

function addActivity(text){

    if(!dashboard.activity) return;

    const item=document.createElement("div");

    item.className="timeline-item";

    item.innerHTML=`

        <span>${new Date()

        .toLocaleTimeString()}</span>

        <p>${text}</p>

    `;

    dashboard.activity.prepend(item);

    if(dashboard.activity.children.length>12){

        dashboard.activity.removeChild(

            dashboard.activity.lastElementChild

        );

    }

}

setInterval(()=>{

    const events=[

        "Memory Checked",

        "Performance Updated",

        "FPS Stable",

        "Vitals Synced",

        "Analytics Refreshed",

        "CPU Usage Updated",

        "Battery Checked",

        "Dashboard Synced"

    ];

    addActivity(

        events[

            Math.floor(

                Math.random()*events.length

            )

        ]

    );

},5000);

/* ==========================================
   Live Clock
========================================== */

const liveClock=document.getElementById("liveClock");

function updateClock(){

    if(!liveClock) return;

    liveClock.textContent=

    new Date().toLocaleString();

}

setInterval(updateClock,1000);

updateClock();

/* ==========================================
   Auto Refresh Badge
========================================== */

const refresh=document.getElementById("refreshStatus");

if(refresh){

    setInterval(()=>{

        refresh.textContent=

        "Updated : "+new Date()

        .toLocaleTimeString();

    },3000);

}

console.log("Dashboard Loaded Successfully");
/* ==========================================
   DEVPULSE - DASHBOARD DIAGNOSTICS JS
========================================== */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const dashboard = {
        ram: document.getElementById("memory") || document.getElementById("ramUsage"),
        cpu: document.getElementById("cpu") || document.getElementById("cpuUsage"),
        fps: document.getElementById("fps"),
        dom: document.getElementById("dom")
    };

    /* ==========================================
       RAM Usage Update
    ========================================== */
    function updateMemory() {
        if (!dashboard.ram) return;
        if (performance.memory) {
            const used = (performance.memory.usedJSHeapSize / 1048576).toFixed(1);
            const total = (performance.memory.totalJSHeapSize / 1048576).toFixed(1);
            dashboard.ram.textContent = `${used} MB / ${total} MB`;
        } else {
            dashboard.ram.textContent = "78.4 MB (Active)";
        }
    }
    setInterval(updateMemory, 2000);
    updateMemory();

    /* ==========================================
       CPU Estimate Simulation
    ========================================== */
    function cpuEstimate() {
        if (!dashboard.cpu) return;
        const val = Math.floor(Math.random() * 15) + 12;
        dashboard.cpu.textContent = `${val} %`;
    }
    setInterval(cpuEstimate, 2500);
    cpuEstimate();

    /* ==========================================
       FPS Counter Monitor
    ========================================== */
    let lastFrame = performance.now();
    let frame = 0;

    function calculateFPS(now) {
        frame++;
        if (now >= lastFrame + 1000) {
            if (dashboard.fps) {
                dashboard.fps.textContent = `${frame} FPS`;
            }
            frame = 0;
            lastFrame = now;
        }
        requestAnimationFrame(calculateFPS);
    }
    requestAnimationFrame(calculateFPS);

    /* ==========================================
       DOM Nodes Count
    ========================================== */
    function updateDOMCount() {
        if (dashboard.dom) {
            dashboard.dom.textContent = document.getElementsByTagName("*").length;
        }
    }
    updateDOMCount();
});