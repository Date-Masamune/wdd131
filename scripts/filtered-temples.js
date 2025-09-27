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
    }
];

(() => {
    if (temples.length) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = temples[0].imageUrl;
        document.head.appendChild(link);
    }
})();

(() => {
    const yearEl = document.getElementById("year");
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
                minute: "2-digit",
            })}`
            : `Last modified: ${raw}`;
    }
})();

const gallery = document.querySelector(".gallery");
const navLinks = [...document.querySelectorAll(".navigation a")];

function getYear(d) {
    const y = parseInt(String(d).trim().split(",")[0], 10);
    return Number.isFinite(y) ? y : NaN;
}

const filters = {
    home: () => true,
    old: (t) => getYear(t.dedicated) < 1900,
    new: (t) => getYear(t.dedicated) > 2000,
    large: (t) => Number(t.area) > 90000,
    small: (t) => Number(t.area) < 10000
};

const textToKey = { home: "home", old: "old", new: "new", large: "large", small: "small" };
function inferDims(url) {
    const m = url.match(/\/(\d{2,4})x(\d{2,4})\//);
    return m ? { w: +m[1], h: +m[2] } : { w: 400, h: 250 };
}

function makeCard(t, { isLCP = false } = {}) {
    const fig = document.createElement("figure");

    const cap = document.createElement("figcaption");
    cap.innerHTML = `
    <div class="name">${t.templeName}</div>
    <p><span class="label">Location:</span> ${t.location}</p>
    <p><span class="label">Dedicated:</span> ${t.dedicated}</p>
    <p><span class="label">Size:</span> ${Number(t.area).toLocaleString()} sq ft</p>
  `;

    const wrap = document.createElement("div");
    wrap.className = "img-wrap";

    const img = new Image();
    const { w, h } = inferDims(t.imageUrl);


    img.width = w;
    img.height = h;

    img.alt = t.templeName;
    img.decoding = "async";
    img.sizes = "(max-width: 600px) 100vw, 400px";

    if (isLCP) {
        img.setAttribute("fetchpriority", "high");
        img.loading = "eager";
    } else {
        img.loading = "lazy";
    }

    img.onerror = () => {
        img.src = "https://placehold.co/800x600?text=Image+Unavailable";
    };


    img.src = t.imageUrl;

    wrap.appendChild(img);
    fig.append(cap, wrap);
    return fig;
}



function render(list) {
    gallery.innerHTML = "";
    if (!list || list.length === 0) return;

    gallery.appendChild(makeCard(list[0], { isLCP: true }));

    const rest = list.slice(1);
    let i = 0;
    const BATCH = 4;

    function pump() {
        const frag = document.createDocumentFragment();
        for (let n = 0; n < BATCH && i < rest.length; n++, i++) {
            frag.appendChild(makeCard(rest[i]));
        }
        gallery.appendChild(frag);
        if (i < rest.length) requestAnimationFrame(pump);
    }
    requestAnimationFrame(pump);
}


navLinks.forEach((a) => {
    a.addEventListener("click", (e) => {
        e.preventDefault();
        navLinks.forEach((x) => x.classList.remove("active"));
        a.classList.add("active");
        const key = textToKey[a.textContent.trim().toLowerCase()] || "home";
        render(temples.filter(filters[key] || filters.home));
        const nav = document.getElementById("primary-nav");
        if (nav && nav.classList.contains("open")) {
            nav.classList.remove("open");
            const btn = document.querySelector(".menu-icon");
            if (btn) btn.setAttribute("aria-expanded", "false");
        }
    });
});

document.querySelector(".navigation a")?.classList.add("active");
render(temples);

const menuBtn = document.querySelector(".menu-icon");
const primaryNav = document.getElementById("primary-nav");
const mq900 = window.matchMedia("(min-width: 900px)");

if (menuBtn && primaryNav) {
    function setBtnState(open) {
        menuBtn.textContent = open ? "✖" : "☰";
        menuBtn.setAttribute("aria-expanded", String(open));
        menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    function closeMenu() {
        primaryNav.classList.remove("open");
        setBtnState(false);
    }
    setBtnState(primaryNav.classList.contains("open"));
    menuBtn.addEventListener("click", () => {
        const open = !primaryNav.classList.contains("open");
        primaryNav.classList.toggle("open", open);
        setBtnState(open);
    });
    primaryNav.addEventListener("click", (e) => {
        if (e.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });
    mq900.addEventListener("change", (e) => {
        if (e.matches) closeMenu();
    });
}
