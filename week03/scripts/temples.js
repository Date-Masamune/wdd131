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
    const nav = document.querySelector(".nav");
    const mq = window.matchMedia("(min-width: 900px)");

    if (!menuButton || !nav) return;

    function setButton(isOpen) {
        menuButton.textContent = isOpen ? "✖" : "☰";
        menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
        menuButton.setAttribute("aria-expanded", String(isOpen));
    }

    function closeMenu() {
        nav.classList.remove("open");
        setButton(false);
    }

    menuButton.addEventListener("click", () => {
        const isOpen = !nav.classList.contains("open");
        nav.classList.toggle("open", isOpen);
        setButton(isOpen);
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
});
