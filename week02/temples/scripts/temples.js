(() => {
    const yearEl = document.getElementById('currentyear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const modEl = document.getElementById('lastModified');
    if (modEl) {
        const raw = document.lastModified;
        const dt = new Date(raw);
        modEl.textContent = !Number.isNaN(dt.valueOf())
            ? `Last modified: ${dt.toLocaleString(undefined, {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit'
            })}`
            : `Last modified: ${raw}`;
    }
})();

document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-icon");
    const nav = document.querySelector(".site-header nav");
    const mq = window.matchMedia("(min-width: 900px)");

    if (menuButton && nav) {
        function setButton(open) {
            menuButton.textContent = open ? "✖" : "☰";
            menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
            menuButton.setAttribute("aria-expanded", String(open));
        }

        function closeMenu() {
            nav.classList.remove("open");
            setButton(false);
        }

        setButton(nav.classList.contains("open"));

        menuButton.addEventListener("click", () => {
            const open = !nav.classList.contains("open");
            nav.classList.toggle("open", open);
            setButton(open);
        });

        nav.addEventListener("click", (e) => {
            if (e.target.closest("a")) closeMenu();
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeMenu();
        });

        mq.addEventListener("change", (e) => {
            if (e.matches) closeMenu();
        });
    }

    const countSpan = document.getElementById("gallery-count");
    if (countSpan) {
        const n = document.querySelectorAll(".gallery > figure").length;
        countSpan.textContent = `(${n})`;
    }
});
