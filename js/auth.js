"use strict";

const authOverlay=document.getElementById("authOverlay");
const registerOverlay=document.getElementById("registerOverlay");

document.getElementById("showRegister")?.addEventListener("click",(e)=>{

e.preventDefault();

authOverlay.classList.remove("active");

registerOverlay.classList.add("active");

});

document.querySelector(".close-auth")?.addEventListener("click",()=>{

authOverlay.classList.remove("active");

});

document.querySelector(".close-register")?.addEventListener("click",()=>{

registerOverlay.classList.remove("active");

});

document.getElementById("loginForm")?.addEventListener("submit",(e)=>{

e.preventDefault();

showToast("Login Successful");

authOverlay.classList.remove("active");

});

document.getElementById("registerForm")?.addEventListener("submit",(e)=>{

e.preventDefault();

showToast("Account Created Successfully");

registerOverlay.classList.remove("active");

});

window.addEventListener("load",()=>{

setTimeout(()=>{

authOverlay.classList.add("active");

},800);

});
"use strict";

/* ==========================================
   Settings Drawer
========================================== */

const settingsOverlay =
document.getElementById("settingsOverlay");

const closeSettings =
document.getElementById("closeSettings");

/* Open Settings */

document.querySelectorAll(".open-settings")
.forEach(btn=>{

btn.addEventListener("click",()=>{

settingsOverlay.classList.add("active");

});

});

/* Close */

closeSettings?.addEventListener("click",()=>{

settingsOverlay.classList.remove("active");

});

/* Font Size */

document.getElementById("fontSize")
?.addEventListener("change",(e)=>{

document.documentElement.style.fontSize=
e.target.value;

});

/* Theme */

document.querySelectorAll(".theme-color")
.forEach(btn=>{

btn.addEventListener("click",()=>{

const theme=btn.dataset.theme;

document.body.dataset.theme=theme;

});

});

/* Save */

document.getElementById("saveSettings")
?.addEventListener("click",()=>{

const data={

theme:document.body.dataset.theme,

font:document.documentElement.style.fontSize

};

localStorage.setItem(

"DevPulseSettings",

JSON.stringify(data)

);

showToast("Settings Saved");

});

/* Restore */

const saved=
JSON.parse(

localStorage.getItem(

"DevPulseSettings"

)

);

if(saved){

document.body.dataset.theme=saved.theme;

document.documentElement.style.fontSize=saved.font;

}

/* Sidebar */

document.getElementById("collapseSidebar")
?.addEventListener("click",()=>{

document.querySelector(".sidebar")
?.classList.toggle("collapsed");

});
"use strict";

/* ==========================================
   Notification Panel
========================================== */

const panel =
document.getElementById("notificationPanel");

const openBtn =
document.getElementById("notificationBtn");

const closeBtn =
document.getElementById("closeNotification");

openBtn?.addEventListener("click",()=>{

panel.classList.add("active");

});

closeBtn?.addEventListener("click",()=>{

panel.classList.remove("active");

});

/* Search */

const search =
document.getElementById("notificationSearch");

search?.addEventListener("keyup",()=>{

const value=
search.value.toLowerCase();

document

.querySelectorAll(".notification-item")

.forEach(item=>{

item.style.display=

item.innerText

.toLowerCase()

.includes(value)

? ""

: "none";

});

});

/* Mark All Read */

document

.getElementById("markAllRead")

?.addEventListener("click",()=>{

document

.querySelectorAll(".notification-item")

.forEach(item=>{

item.classList.remove("unread");

});

showToast("All notifications marked as read");

});

/* Clear All */

document

.getElementById("clearNotifications")

?.addEventListener("click",()=>{

document

.getElementById("notificationList")

.innerHTML=

`<p style="text-align:center;padding:40px;">
No Notifications
</p>`;

showToast("Notifications cleared");

});

/* Close on Outside Click */

window.addEventListener("click",(e)=>{

if(

panel.classList.contains("active") &&

!panel.contains(e.target) &&

!openBtn.contains(e.target)

){

panel.classList.remove("active");

}

});
/* ==========================================
   DEVPULSE - AUTHENTICATION & PANELS JS
========================================== */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // Auth Overlays
    const authOverlay = document.getElementById("authOverlay");
    const registerOverlay = document.getElementById("registerOverlay");
    const showRegisterBtn = document.getElementById("showRegister");
    const closeAuthBtn = document.getElementById("closeAuth");
    const closeRegisterBtn = document.querySelector(".close-register");

    // Show Register Modal
    showRegisterBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        authOverlay?.classList.remove("active");
        registerOverlay?.classList.add("active");
    });

    // Close Modals
    closeAuthBtn?.addEventListener("click", () => {
        authOverlay?.classList.remove("active");
    });

    closeRegisterBtn?.addEventListener("click", () => {
        registerOverlay?.classList.remove("active");
    });

    // Login Form Submit
    document.getElementById("loginForm")?.addEventListener("submit", (e) => {
        e.preventDefault();
        if (typeof showToast === "function") showToast("Logged in successfully! 🎉");
        authOverlay?.classList.remove("active");
    });

    // Register Form Submit
    document.getElementById("registerForm")?.addEventListener("submit", (e) => {
        e.preventDefault();
        if (typeof showToast === "function") showToast("Account Created Successfully! 🚀");
        registerOverlay?.classList.remove("active");
    });

    /* ==========================================
       Notification Panel Logic
    ========================================== */
    const panel = document.getElementById("notificationPanel");
    const openBtn = document.getElementById("notificationBtn");
    const closeBtn = document.getElementById("closeNotification");

    openBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        panel?.classList.add("active");
    });

    closeBtn?.addEventListener("click", () => {
        panel?.classList.remove("active");
    });

    // Close panel on outside click
    window.addEventListener("click", (e) => {
        if (panel?.classList.contains("active") && !panel.contains(e.target) && !openBtn?.contains(e.target)) {
            panel.classList.remove("active");
        }
    });

    /* ==========================================
       Command Palette (Shortcuts)
    ========================================== */
    const cmdPalette = document.getElementById("commandPalette");
    document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "k") {
            e.preventDefault();
            if (cmdPalette) {
                cmdPalette.style.display = cmdPalette.style.display === "flex" ? "none" : "flex";
            }
        }
    });

    cmdPalette?.addEventListener("click", (e) => {
        if (e.target === cmdPalette) cmdPalette.style.display = "none";
    });
});
