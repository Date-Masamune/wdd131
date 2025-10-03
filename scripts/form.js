
const products = [
    { id: "fc-1888", name: "Flux Capacitor" },
    { id: "pl-2050", name: "Power Laces" },
    { id: "hm-0001", name: "Hoverboard" },
    { id: "st-1010", name: "Sonic Toothbrush" },
    { id: "vr-9000", name: "VR Goggles" },
    { id: "dr-0042", name: "Drone Racer" },
    { id: "sm-0777", name: "Smart Mug" },
    { id: "kb-0088", name: "Compact Keyboard" }
];

document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("product");
    if (select) {
        products.forEach(p => {
            const opt = document.createElement("option");
            opt.value = p.id;         
            opt.textContent = p.name; 
            select.appendChild(opt);
        });
    }

    // Footer year + modified
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const modEl = document.getElementById("lastModified");
    if (modEl) {
        const dt = new Date(document.lastModified);
        modEl.textContent = `Last Modification: ${dt.toLocaleString(undefined, {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        })
            }`;
    }
});
