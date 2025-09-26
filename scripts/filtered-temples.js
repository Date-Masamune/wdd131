
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },

    {
        templeName: "Winter Quarters Nebraska",
        location: "Omaha, Nebraska, United States",
        dedicated: "2001, April, 22",
        area: 16000,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/winter-quarters-nebraska-temple/winter-quarters-nebraska-temple-57696.jpg"
    },
    {
        templeName: "Sapporo Japan",
        location: "Sapporo, Hokkaido, Japan",
        dedicated: "2016, August, 21",
        area: 48480,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/sapporo-japan-temple/sapporo-japan-temple-33518.jpg"
    },
    {
        templeName: "Laie Hawaii",
        location: "Laie, Oahu, Hawaii, United States",
        dedicated: "1919, November, 27",
        area: 42320,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/laie-hawaii-temple/laie-hawaii-temple-37900.jpg"

    },
    {
        templeName: "Tokyo Japan",
        location: "Tokyo, Japan",
        dedicated: "1980, October, 27",
        area: 53997,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/tokyo-japan-temple/tokyo-japan-temple-26340.jpg"
    },

    {
        templeName: "Bountiful Utah",
        location: "Bountiful, Utah, United States",
        dedicated: "1995, January, 8",
        area: 104000,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/bountiful-utah-temple/bountiful-utah-temple-58567.jpg"

    },

];

temples.forEach(t => {
    const probe = new Image();
    probe.referrerPolicy = "no-referrer";
    probe.onload = () => console.log("OK:", t.templeName);
    probe.onerror = () => console.warn("BROKEN:", t.templeName, "->", t.imageUrl);
    probe.src = t.imageUrl;
});


(() => {
    const yearEl = document.getElementById("currentyear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const modEl = document.getElementById("lastModified");
    if (modEl) {
        const raw = document.lastModified;
        const dt = new Date(raw);
        modEl.textContent = !Number.isNaN(dt.valueOf())
            ? `Last modified: ${dt.toLocaleString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
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

    const gallery = document.querySelector(".gallery");
    if (gallery) {
        temples.forEach((temple) => {
            const figure = document.createElement("figure");

            const img = document.createElement("img");
            img.src = temple.imageUrl;
            img.alt = temple.templeName;
            img.loading = "lazy";
            img.width = 400;
            img.height = 250;
            img.onerror = () => {
                img.src = "images/placeholder-400x250.jpg";
                img.alt = `${temple.templeName} (image not available)`;
            };

            const caption = document.createElement("figcaption");
            caption.textContent = `${temple.templeName} — ${temple.location}`;

            figure.appendChild(img);
            figure.appendChild(caption);
            gallery.appendChild(figure);
        });

        const countSpan = document.getElementById("gallery-count");
        if (countSpan) {
            countSpan.textContent = `(${temples.length})`;
        }
    }
});
