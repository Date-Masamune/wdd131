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


const temperatureC = 10;     
const windSpeedKmh = 5;      


function calculateWindChill(tempC, speedKmh) {
    return (
        13.12 +
        0.6215 * tempC -
        11.37 * Math.pow(speedKmh, 0.16) +
        0.3965 * tempC * Math.pow(speedKmh, 0.16)
    );
}


let windChillDisplay;
if (temperatureC <= 10 && windSpeedKmh > 4.8) {
    const chill = calculateWindChill(temperatureC, windSpeedKmh);
    windChillDisplay = `${chill.toFixed(1)} °C`;
} else {
    windChillDisplay = "N/A";
}


document.getElementById("wx-temp").textContent = `${temperatureC} °C`;
document.getElementById("wx-wind").textContent = `${windSpeedKmh} km/h`;
document.getElementById("wx-chill").textContent = windChillDisplay;