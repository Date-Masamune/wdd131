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
