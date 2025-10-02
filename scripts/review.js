document.addEventListener("DOMContentLoaded", () => {

    const KEY = "reviewCount";
    const current = Number(localStorage.getItem(KEY) || 0) + 1;
    localStorage.setItem(KEY, String(current));
    document.getElementById("reviewCount").textContent = current;

    // footer
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const modEl = document.getElementById("lastModified");
    if (modEl) {
        const dt = new Date(document.lastModified);
        modEl.textContent = `Last Modification: ${dt.toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
            }`;
    }
});
