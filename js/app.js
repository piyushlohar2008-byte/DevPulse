/* ==========================================
   DEVPULSE
   PART 3A
   app.js
========================================== */

"use strict";

/* ===========================
   Selectors
=========================== */

const sidebar = document.querySelector(".sidebar");
const menuBtn = document.querySelector(".menu-toggle");
const searchInput = document.querySelector(".search-box input");
const themeBtn = document.querySelector(".theme-toggle");
const toast = document.querySelector(".toast");

const dashboardCards = document.querySelectorAll(
    ".stat-card,.diag-card,.chart-card,.analytics-card"
);

/* ===========================
   Sidebar
=========================== */

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        sidebar.classList.toggle("active");

    });

}

/* ===========================
   Theme
=========================== */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

}

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        localStorage.setItem(

            "theme",

            document.body.classList.contains("dark-mode")

                ? "dark"

                : "light"

        );

    });

}

/* ===========================
   Search Filter
=========================== */

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        dashboardCards.forEach(card => {

            const text = card.innerText.toLowerCase();

            card.style.display = text.includes(value)

                ? ""

                : "none";

        });

    });

}

/* ===========================
   Toast
=========================== */

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}

/* ===========================
   Counter Animation
=========================== */

function animateCounter(element, target, suffix = "") {

    let start = 0;

    const duration = 1200;

    const step = target / (duration / 16);

    function update() {

        start += step;

        if (start >= target) {

            element.textContent = target + suffix;

            return;

        }

        element.textContent = Math.floor(start) + suffix;

        requestAnimationFrame(update);

    }

    update();

}

/* ===========================
   Load Demo Values
=========================== */

window.addEventListener("load", () => {

    animateCounter(document.getElementById("score"), 98);

    animateCounter(document.getElementById("lcp"), 2, " s");

    animateCounter(document.getElementById("inp"), 98, " ms");

    document.getElementById("cls").textContent = "0.03";

});

/* ===========================
   Welcome Toast
=========================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        showToast("Welcome back to DevPulse 🚀");

    }, 700);

});

/* ===========================
   Ripple Effect
=========================== */

dashboardCards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        card.style.setProperty(

            "--x",

            `${e.clientX - rect.left}px`

        );

        card.style.setProperty(

            "--y",

            `${e.clientY - rect.top}px`

        );

    });

});

/* ===========================
   Current Time
=========================== */

const clock = document.querySelector("#clock");

function updateClock() {

    if (!clock) return;

    const now = new Date();

    clock.textContent = now.toLocaleTimeString();

}

setInterval(updateClock, 1000);

updateClock();

/* ===========================
   Greeting
=========================== */

const greeting = document.querySelector("#greeting");

if (greeting) {

    const hour = new Date().getHours();

    let text = "Welcome";

    if (hour < 12) {

        text = "Good Morning";

    } else if (hour < 18) {

        text = "Good Afternoon";

    } else {

        text = "Good Evening";

    }

    greeting.textContent = text;

}

/* ===========================
   Card Hover Tilt
=========================== */

dashboardCards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY = (x / rect.width - 0.5) * 10;

        const rotateX = (0.5 - y / rect.height) * 10;

        card.style.transform =

            `perspective(700px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-6px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});

/* ===========================
   Keyboard Shortcut
=========================== */

document.addEventListener("keydown", e => {

    if (e.key === "/") {

        e.preventDefault();

        searchInput.focus();

    }

});

/* ===========================
   Initialize
=========================== */

console.log("DevPulse Dashboard Initialized");
/* ==========================================
   DEVPULSE - MAIN APP JS
========================================== */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    /* ===========================
       Selectors
    =========================== */
    const sidebar = document.querySelector(".sidebar");
    const menuBtn = document.querySelector(".menu-toggle");
    const searchInput = document.querySelector(".search-box input");
    const themeBtn = document.querySelector(".theme-toggle");
    const toast = document.querySelector(".toast");
    const profileBtn = document.querySelector(".profile-btn");
    const profileDropdown = document.querySelector(".profile-dropdown");
    const dashboardCards = document.querySelectorAll(
        ".stat-card, .diag-card, .chart-card, .analytics-card"
    );

    /* ===========================
       Sidebar Toggle (Responsive)
    =========================== */
    if (menuBtn && sidebar) {
        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle("active");
            } else {
                sidebar.classList.toggle("collapsed");
            }
        });
    }

    // Mobile वर बाहेर क्लिक केल्यावर Sidebar बंद करणे
    document.addEventListener("click", (e) => {
        if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains("active")) {
            if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
                sidebar.classList.remove("active");
            }
        }
    });

    /* ===========================
       Profile Dropdown Toggle
    =========================== */
    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle("active");
        });

        document.addEventListener("click", () => {
            profileDropdown.classList.remove("active");
        });
    }

    /* ===========================
       Theme Toggle (Dark / Light)
    =========================== */
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            localStorage.setItem("theme", isDark ? "dark" : "light");
            showToast(`Switched to ${isDark ? "Dark" : "Light"} Mode`);
        });
    }

    /* ===========================
       Search Filter (Live Search)
    =========================== */
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const value = this.value.toLowerCase().trim();
            dashboardCards.forEach(card => {
                const text = card.innerText.toLowerCase();
                card.style.display = text.includes(value) ? "" : "none";
            });
        });
    }

    /* ===========================
       Clock Update
    =========================== */
    const clock = document.querySelector("#clock");
    function updateClock() {
        if (!clock) return;
        const now = new Date();
        clock.textContent = now.toLocaleTimeString();
    }
    setInterval(updateClock, 1000);
    updateClock();

    /* ===========================
       Card Tilt & Hover Effect
    =========================== */
    dashboardCards.forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const rotateY = (x / rect.width - 0.5) * 8;
            const rotateX = (0.5 - y / rect.height) * 8;

            card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });

    /* ===========================
       Global Toast System
    =========================== */
    window.showToast = function(message) {
        let toastEl = document.querySelector(".toast");
        if (!toastEl) {
            toastEl = document.createElement("div");
            toastEl.className = "toast";
            document.body.appendChild(toastEl);
        }
        toastEl.textContent = message;
        toastEl.classList.add("show");

        setTimeout(() => {
            toastEl.classList.remove("show");
        }, 3000);
    };

    // Welcome Toast
    setTimeout(() => {
        showToast("Welcome back to DevPulse 🚀");
    }, 800);
});
/* ==========================================
   DEVPULSE - THEME & FULLSCREEN FIX
========================================== */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    /* ==========================================
       1. Theme Toggle System (Dark / Light)
    ========================================== */
    const themeBtn = document.querySelector(".theme-toggle");
    const themeIcon = themeBtn ? themeBtn.querySelector("i") : null;

    // LocalStorage वरून सेव्ह थीम लोड करणे
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeIcon) {
            themeIcon.classList.replace("bi-moon-stars", "bi-sun");
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");

            // Icon toggle करणे (Moon <-> Sun)
            if (themeIcon) {
                if (isDark) {
                    themeIcon.classList.replace("bi-moon-stars", "bi-sun");
                } else {
                    themeIcon.classList.replace("bi-sun", "bi-moon-stars");
                }
            }

            // Preference save करणे
            localStorage.setItem("theme", isDark ? "dark" : "light");

            if (typeof showToast === "function") {
                showToast(`Switched to ${isDark ? "Dark" : "Light"} Mode 🌙`);
            }
        });
    }

    /* ==========================================
       2. Fullscreen Toggle System
    ========================================== */
    // दोन्ही buttons Select करा (Topbar & Floating Action Menu)
    const fullscreenBtns = document.querySelectorAll("#fullscreenBtn, #fullscreenBtn2");

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            // Fullscreen ऑन करणे
            document.documentElement.requestFullscreen().catch(err => {
                if (typeof showToast === "function") {
                    showToast(`Error enabling full-screen: ${err.message}`);
                }
            });
        } else {
            // Fullscreen बंद करणे
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    // सर्व बटन्सना Event Listener जोडणे
    fullscreenBtns.forEach(btn => {
        btn.addEventListener("click", toggleFullscreen);
    });

    // Fullscreen बदलल्यावर Icon आणि Toast दाखवणे
    document.addEventListener("fullscreenchange", () => {
        const isFullscreen = !!document.fullscreenElement;
        
        fullscreenBtns.forEach(btn => {
            const icon = btn.querySelector("i");
            if (icon) {
                if (isFullscreen) {
                    icon.classList.replace("bi-arrows-fullscreen", "bi-fullscreen-exit");
                } else {
                    icon.classList.replace("bi-fullscreen-exit", "bi-arrows-fullscreen");
                }
            }
        });

        if (typeof showToast === "function") {
            showToast(isFullscreen ? "Entered Fullscreen Mode ⛶" : "Exited Fullscreen Mode");
        }
    });
});
/* ==========================================
   DEVPULSE - NAVBAR 3-LINES MENU FIX
========================================== */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const menuBtn = document.getElementById("menuToggle") || document.querySelector(".menu-toggle");
    const overlay = document.getElementById("sidebarOverlay");
    const mainContent = document.querySelector(".main-content");

    if (menuBtn && sidebar) {
        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();

            if (window.innerWidth <= 768) {
                // Mobile View: Active class toggle
                sidebar.classList.toggle("active");
                if (overlay) overlay.classList.toggle("active");
            } else {
                // Desktop View: Collapsed class toggle
                sidebar.classList.toggle("collapsed");
                if (mainContent) mainContent.classList.toggle("expanded");
            }
        });
    }

    // Mobile वर Overlay वर क्लिक केल्यावर Sidebar बंद करणे
    if (overlay) {
        overlay.addEventListener("click", () => {
            sidebar?.classList.remove("active");
            overlay.classList.remove("active");
        });
    }

    // Window Resize झाल्यावर ऑटोमॅटिकली योग्य CSS क्लास लावणे
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            sidebar?.classList.remove("active");
            overlay?.classList.remove("active");
        }
    });
});
/* ==========================================
   SIDEBAR SLIDE TOGGLE FIX
========================================== */
document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const menuBtn = document.getElementById("menuToggle") || document.querySelector(".menu-toggle");
    const overlay = document.getElementById("sidebarOverlay");

    if (menuBtn && sidebar) {
        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();

            if (window.innerWidth <= 768) {
                // Mobile View: Slide in/out via 'active' class
                sidebar.classList.toggle("active");
                if (overlay) overlay.classList.toggle("active");
            } else {
                // Desktop View: Toggle 'collapsed' state
                sidebar.classList.toggle("collapsed");
            }
        });
    }

    // Mobile वर Screen वर बाहेर क्लिक केल्यास Sidebar सहज Slide Out होईल
    if (overlay) {
        overlay.addEventListener("click", () => {
            sidebar?.classList.remove("active");
            overlay.classList.remove("active");
        });
    }

    // Resize Event Fix
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            sidebar?.classList.remove("active");
            overlay?.classList.remove("active");
        }
    });
});
/* ==========================================
   SIDEBAR MENU NAVIGATION & ACTIONS
========================================== */
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".sidebar nav a");
    const notifPanel = document.getElementById("notificationPanel");
    const notifOverlay = document.getElementById("sidebarOverlay");

    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            const linkText = this.querySelector("span")?.textContent.trim().toLowerCase();

            // १. Active Highlight बदलणे
            navLinks.forEach((l) => l.classList.remove("active"));
            this.classList.add("active");

            // मोबाईलवर क्लिक केल्यावर Sidebar स्वयंचलितपणे क्लोज करणे
            if (window.innerWidth <= 768) {
                document.querySelector(".sidebar")?.classList.remove("active");
                notifOverlay?.classList.remove("active");
            }

            // २. मेनूनुसार Action Trigger करणे
            switch (linkText) {
                case "dashboard":
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    if (typeof showToast === "function") showToast("Switched to Dashboard 📊");
                    break;

                case "analytics":
                    e.preventDefault();
                    const chartSection = document.querySelector(".charts") || document.querySelector(".analytics-card");
                    if (chartSection) {
                        chartSection.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                    if (typeof showToast === "function") showToast("Viewing Analytics Section 📈");
                    break;

                case "performance":
                    e.preventDefault();
                    const diagSection = document.querySelector(".diagnostics") || document.querySelector(".stat-card");
                    if (diagSection) {
                        diagSection.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                    if (typeof showToast === "function") showToast("Performance Diagnostics Active ⚡");
                    break;

                case "notifications":
                    e.preventDefault();
                    if (notifPanel) {
                        notifPanel.classList.add("active");
                    } else if (typeof showToast === "function") {
                        showToast("You have 5 Unread Notifications 🔔");
                    }
                    break;

                case "settings":
                    e.preventDefault();
                    openSettingsModal();
                    break;

                default:
                    break;
            }
        });
    });

    /* ==========================================
       SETTINGS MODAL SYSTEM
    ========================================== */
    function openSettingsModal() {
        let settingsModal = document.getElementById("settingsModal");

        // जर Modal आधीपासून नसेल तर Dynamic तयार करणे
        if (!settingsModal) {
            settingsModal = document.createElement("div");
            settingsModal.id = "settingsModal";
            settingsModal.className = "auth-overlay active";
            settingsModal.innerHTML = `
                <div class="auth-modal glass">
                    <button class="close-auth" id="closeSettings">&times;</button>
                    <div class="auth-header">
                        <h2>System Settings ⚙️</h2>
                        <p>Customize your DevPulse preferences</p>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 16px;">
                        <label style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                            <span>Real-time Data Sync</span>
                            <input type="checkbox" checked style="width: 18px; height: 18px; accent-color: var(--primary);">
                        </label>
                        <label style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                            <span>Desktop Notifications</span>
                            <input type="checkbox" checked style="width: 18px; height: 18px; accent-color: var(--primary);">
                        </label>
                        <label style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                            <span>Compact Sidebar Mode</span>
                            <input type="checkbox" id="compactSetting" style="width: 18px; height: 18px; accent-color: var(--primary);">
                        </label>
                        <button class="auth-btn" id="saveSettingsBtn" style="margin-top: 10px;">Save Changes</button>
                    </div>
                </div>
            `;
            document.body.appendChild(settingsModal);

            // Modal Events
            document.getElementById("closeSettings").onclick = () => settingsModal.classList.remove("active");
            document.getElementById("saveSettingsBtn").onclick = () => {
                settingsModal.classList.remove("active");
                if (typeof showToast === "function") showToast("Settings Saved Successfully! 💾");
            };

            // Overlay Click पर बंद
            settingsModal.onclick = (e) => {
                if (e.target === settingsModal) settingsModal.classList.remove("active");
            };
        } else {
            settingsModal.classList.add("active");
        }
    }
});
/* ==========================================
   DEVPULSE - NOTIFICATION PANEL LOGIC
========================================== */
document.addEventListener("DOMContentLoaded", () => {
    const notifPanel = document.getElementById("notificationPanel");
    const notifBtns = document.querySelectorAll("#notificationBtn, .sidebar nav a[href='#']");
    const closeNotifBtn = document.getElementById("closeNotification");
    const clearNotifBtn = document.getElementById("clearNotificationsBtn");
    const notifBadge = document.querySelector(".notification-count");

    // Notification Panel Open करण्याची फंक्शनॅलिटी
    function openNotificationPanel() {
        if (notifPanel) {
            notifPanel.classList.add("active");
            
            // Badge मधील काउंट Read दाखवण्यासाठी रिमूव्ह/मायनस करणे
            if (notifBadge) {
                notifBadge.style.display = "none";
            }
            if (typeof showToast === "function") {
                showToast("Opened Notifications 🔔");
            }
        }
    }

    // Topbar आणि Sidebar मधील Notification क्लिक फिक्स
    document.addEventListener("click", (e) => {
        // Topbar मधील Notification Button
        if (e.target.closest("#notificationBtn")) {
            e.stopPropagation();
            openNotificationPanel();
        }

        // Sidebar मधील Notification Link
        const sidebarLink = e.target.closest(".sidebar nav a");
        if (sidebarLink && sidebarLink.querySelector("span")?.textContent.trim().toLowerCase() === "notifications") {
            e.preventDefault();
            e.stopPropagation();
            openNotificationPanel();
        }
    });

    // Close Button वर क्लिक केल्यावर पॅनेल बंद होणे
    closeNotifBtn?.addEventListener("click", () => {
        notifPanel?.classList.remove("active");
    });

    // Outside Click (पॅनेलच्या बाहेर क्लिक केल्यास ऑटोमॅटिक क्लोज)
    document.addEventListener("click", (e) => {
        if (notifPanel && notifPanel.classList.contains("active")) {
            if (!notifPanel.contains(e.target) && !e.target.closest("#notificationBtn")) {
                notifPanel.classList.remove("active");
            }
        }
    });

    // Clear All Notifications Logic
    clearNotifBtn?.addEventListener("click", () => {
        const list = document.querySelector(".notification-list");
        if (list) {
            list.innerHTML = `<div style="text-align:center; padding: 20px; color: var(--text-muted);">No new notifications</div>`;
            if (typeof showToast === "function") showToast("All Notifications Cleared 🧹");
        }
    });
});
/* ==========================================
   PROFILE DROPDOWN ACTIONS LOGIC
========================================== */
document.addEventListener("DOMContentLoaded", () => {
    const profileDropdown = document.querySelector(".profile-dropdown");
    const menuProfile = document.getElementById("menuProfile");
    const menuSettings = document.getElementById("menuSettings");
    const menuAnalytics = document.getElementById("menuAnalytics");

    // १. My Profile Modal Trigger
    menuProfile?.addEventListener("click", (e) => {
        e.preventDefault();
        profileDropdown?.classList.remove("active"); // ड्रॉपडाउन बंद करा
        
        openProfileModal(); // प्रोफाइल मॉडेल उघडा
    });

    // २. Settings Modal Trigger
    menuSettings?.addEventListener("click", (e) => {
        e.preventDefault();
        profileDropdown?.classList.remove("active");
        
        // आधी तयार केलेल्या Settings Modal ला कॉल करणे
        const settingsBtn = document.querySelector(".sidebar nav a[href='#']:nth-child(5)");
        if (settingsBtn) {
            settingsBtn.click();
        } else if (typeof openSettingsModal === "function") {
            openSettingsModal();
        } else {
            showToast("Opening Settings ⚙️");
        }
    });

    // ३. Analytics Scroll Trigger
    menuAnalytics?.addEventListener("click", (e) => {
        e.preventDefault();
        profileDropdown?.classList.remove("active");
        
        const chartSection = document.querySelector(".charts") || document.querySelector("canvas")?.parentElement;
        if (chartSection) {
            chartSection.scrollIntoView({ behavior: "smooth", block: "center" });
            if (typeof showToast === "function") showToast("Scrolled to Analytics 📈");
        }
    });

    /* ==========================================
       MY PROFILE MODAL FUNCTION
    ========================================== */
    function openProfileModal() {
        let profileModal = document.getElementById("profileModal");

        if (!profileModal) {
            profileModal = document.createElement("div");
            profileModal.id = "profileModal";
            profileModal.className = "auth-overlay active";
            profileModal.innerHTML = `
                <div class="auth-modal glass" style="max-width: 400px; text-align: center;">
                    <button class="close-auth" id="closeProfileModal" style="position: absolute; right: 16px; top: 16px; font-size: 20px;">&times;</button>
                    
                    <img src="https://ui-avatars.com/api/?name=Piyush+Lohar&background=2563eb&color=fff&size=100" 
                         style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 12px; border: 3px solid var(--primary);">
                    
                    <h2 style="font-size: 20px; font-weight: 800; margin-bottom: 4px;">Piyush Lohar</h2>
                    <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 16px;">Frontend Engineer • DevPulse Admin</p>

                    <div style="text-align: left; background: var(--bg-main); padding: 14px; border-radius: var(--radius-md); font-size: 13px; display: flex; flex-direction: column; gap: 8px;">
                        <div><strong>Email:</strong> piyushlohar2008@gmail.com</div>
                        <div><strong>Role:</strong> Administrator</div>
                        <div><strong>Status:</strong> <span style="color: var(--success); font-weight: 700;">● Active</span></div>
                    </div>
                </div>
            `;
            document.body.appendChild(profileModal);

            document.getElementById("closeProfileModal").onclick = () => profileModal.classList.remove("active");
            document.getElementById("editProfileBtn").onclick = () => {
                profileModal.classList.remove("active");
                if (typeof showToast === "function") showToast("Profile Edit Feature Coming Soon! 🛠️");
            };

            profileModal.onclick = (e) => {
                if (e.target === profileModal) profileModal.classList.remove("active");
            };
        } else {
            profileModal.classList.add("active");
        }
    }
});
/* ==========================================
   FLOATING ACTION BUTTONS (FAB) CLICK LOGIC
========================================== */
document.addEventListener("DOMContentLoaded", () => {
    const fabContainer = document.getElementById("fabContainer");
    const fabMainBtn = document.getElementById("fabMainBtn");
    const exportJsonBtn = document.getElementById("exportJsonBtn");
    const exportCsvBtn = document.getElementById("exportCsvBtn");
    const floatingSettingsBtn = document.getElementById("floatingSettingsBtn");
    const fullscreenBtn2 = document.getElementById("fullscreenBtn2");

    // १. '+' Main Button Click (Toggle Speed Dial Menu)
    fabMainBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        fabContainer?.classList.toggle("active");
    });

    // स्क्रीनवर कुठेही बाहेर क्लिक केल्यास Floating Menu बंद होणे
    document.addEventListener("click", (e) => {
        if (fabContainer && !fabContainer.contains(e.target)) {
            fabContainer.classList.remove("active");
        }
    });

    // २. Settings Button Click Trigger
    floatingSettingsBtn?.addEventListener("click", () => {
        fabContainer?.classList.remove("active");
        
        // Sidebar किंवा प्रोफाइलमधील Settings Modal ला कॉल करणे
        const openSettingsFn = window.openSettingsModal;
        if (typeof openSettingsFn === "function") {
            openSettingsFn();
        } else {
            // जर Modal तयार नसेल तर Dynamic Settings Modal Trigger
            let modal = document.getElementById("settingsModal");
            if (modal) modal.classList.add("active");
            else if (typeof showToast === "function") showToast("Opening Settings Panel ⚙️");
        }
    });

    // ३. Export JSON Button Action
    exportJsonBtn?.addEventListener("click", () => {
        fabContainer?.classList.remove("active");
        
        const dummyData = {
            project: "DevPulse Dashboard",
            timestamp: new Date().toISOString(),
            status: "Active",
            metrics: { cpu: "14%", memory: "78.4 MB", fps: "60 FPS" }
        };

        const blob = new Blob([JSON.stringify(dummyData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "devpulse-metrics.json";
        a.click();
        URL.revokeObjectURL(url);

        if (typeof showToast === "function") showToast("JSON Metrics Exported 📄");
    });

    // ४. Export CSV Button Action
    exportCsvBtn?.addEventListener("click", () => {
        fabContainer?.classList.remove("active");

        const csvContent = "data:text/csv;charset=utf-8,Metric,Value\nCPU Usage,14%\nMemory,78.4 MB\nFPS,60";
        const encodedUri = encodeURI(csvContent);
        const a = document.createElement("a");
        a.href = encodedUri;
        a.download = "devpulse-metrics.csv";
        a.click();

        if (typeof showToast === "function") showToast("CSV Metrics Exported 📊");
    });

    // ५. Fullscreen Toggle Action
    fullscreenBtn2?.addEventListener("click", () => {
        fabContainer?.classList.remove("active");
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
        }
    });
});
/* ==========================================
   SETTINGS MODAL & CLICK FIX
========================================== */

// १. Settings Modal उघडण्याचे फंक्शन
window.openSettingsModal = function () {
    let settingsModal = document.getElementById("settingsModal");

    // जर Modal आधीपासून DOM मध्ये नसेल तर नवीन तयार करा
    if (!settingsModal) {
        settingsModal = document.createElement("div");
        settingsModal.id = "settingsModal";
        settingsModal.className = "auth-overlay active";
        settingsModal.style.zIndex = "999999"; // सर्वांच्या वर दिसेल
        
        settingsModal.innerHTML = `
            <div class="auth-modal glass" style="max-width: 440px; background: var(--surface); padding: 28px; border-radius: var(--radius-lg); border: 1px solid var(--border); box-shadow: var(--shadow-lg);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="font-size: 20px; font-weight: 800; margin: 0; color: var(--text-main);">System Settings ⚙️</h2>
                    <button id="closeSettingsBtn" style="font-size: 24px; border: none; background: transparent; cursor: pointer; color: var(--text-muted);">&times;</button>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
                    <label style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-weight: 600; font-size: 14px;">
                        <span>Real-time Data Sync</span>
                        <input type="checkbox" checked style="width: 18px; height: 18px; accent-color: var(--primary);">
                    </label>
                    <label style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-weight: 600; font-size: 14px;">
                        <span>Desktop Notifications</span>
                        <input type="checkbox" checked style="width: 18px; height: 18px; accent-color: var(--primary);">
                    </label>
                    <label style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-weight: 600; font-size: 14px;">
                        <span>Auto Refresh Diagnostics</span>
                        <input type="checkbox" checked style="width: 18px; height: 18px; accent-color: var(--primary);">
                    </label>
                </div>

                <button id="saveSettingsBtn" class="auth-btn" style="width: 100%; padding: 12px; background: var(--primary); color: white; border: none; border-radius: var(--radius-md); font-weight: 700; cursor: pointer;">Save Changes</button>
            </div>
        `;
        document.body.appendChild(settingsModal);

        // क्लोज बटण इव्हेंट
        document.getElementById("closeSettingsBtn").onclick = function () {
            settingsModal.classList.remove("active");
        };

        // सेव्ह बटण इव्हेंट
        document.getElementById("saveSettingsBtn").onclick = function () {
            settingsModal.classList.remove("active");
            if (typeof showToast === "function") {
                showToast("Settings Saved Successfully! 💾");
            }
        };

        // बाहेर क्लिक केल्यावर बंद होणे
        settingsModal.onclick = function (e) {
            if (e.target === settingsModal) {
                settingsModal.classList.remove("active");
            }
        };
    } else {
        settingsModal.classList.add("active");
    }
};

// २. FAB मधील Settings Button Click Event Fix
const floatingSettingsBtn = document.getElementById("floatingSettingsBtn");
if (floatingSettingsBtn) {
    floatingSettingsBtn.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        // FAB Speed Dial Menu बंद करणे
        const fabContainer = document.getElementById("fabContainer");
        if (fabContainer) fabContainer.classList.remove("active");

        // Settings Modal उघडणे
        window.openSettingsModal();
    };
}