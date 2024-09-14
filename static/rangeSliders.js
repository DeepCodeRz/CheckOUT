const minTemp = document.getElementById('minTemp');
const maxTemp = document.getElementById('maxTemp');
const minPrecipitation = document.getElementById('minPrecipitation');
const maxPrecipitation = document.getElementById('maxPrecipitation');
const minWind = document.getElementById('minWind');
const maxWind = document.getElementById('maxWind');

minTemp.addEventListener('input', function () {
    if (minTemp.value < 0){
        minTemp.nextElementSibling.value = minTemp.nextElementSibling.value + '🥶❄️';
    } else if (minTemp.value >= 0 && minTemp.value < 11) {
        minTemp.nextElementSibling.value = minTemp.nextElementSibling.value + '🧣🧥';
    } else if (minTemp.value >= 11 && minTemp.value < 21) {
        minTemp.nextElementSibling.value = minTemp.nextElementSibling.value + '🌤️🧥';
    } else if (minTemp.value >= 21 && minTemp.value < 31) {
        minTemp.nextElementSibling.value = minTemp.nextElementSibling.value + '☀️👕';
    } else if (minTemp.value >= 31) {
        minTemp.nextElementSibling.value = minTemp.nextElementSibling.value + '🥵🌞';
    }
})

maxTemp.addEventListener('input', function () {
    if (maxTemp.value < 0){
        maxTemp.nextElementSibling.value = maxTemp.nextElementSibling.value + '🥶❄️';
    } else if (maxTemp.value >= 0 && maxTemp.value < 11) {
        maxTemp.nextElementSibling.value = maxTemp.nextElementSibling.value + '🧣🧥';
    } else if (maxTemp.value >= 11 && maxTemp.value < 21) {
        maxTemp.nextElementSibling.value = maxTemp.nextElementSibling.value + '🌤️🧥';
    } else if (maxTemp.value >= 21 && maxTemp.value < 31) {
        maxTemp.nextElementSibling.value = maxTemp.nextElementSibling.value + '☀️👕';
    } else if (maxTemp.value >= 31) {
        maxTemp.nextElementSibling.value = maxTemp.nextElementSibling.value + '🥵🌞';
    }
})

minPrecipitation.addEventListener('input', function () {
    if (minPrecipitation.value <= 1) {
        minPrecipitation.nextElementSibling.value = minPrecipitation.nextElementSibling.value + '☀️🌈️';
    } else if (minPrecipitation.value >= 1 && minPrecipitation.value < 3) {
        minPrecipitation.nextElementSibling.value = minPrecipitation.nextElementSibling.value + '🌦️☂️';
    } else if (minPrecipitation.value >= 3 && minPrecipitation.value < 8) {
        minPrecipitation.nextElementSibling.value = minPrecipitation.nextElementSibling.value + '🌧️🌂';
    } else if (minPrecipitation.value >= 8) {
        minPrecipitation.nextElementSibling.value = minPrecipitation.nextElementSibling.value + '⛈️🌧️';
    }
})

maxPrecipitation.addEventListener('input', function () {
    if (maxPrecipitation.value <= 1) {
        maxPrecipitation.nextElementSibling.value = maxPrecipitation.nextElementSibling.value + '☀️🌈️';
    } else if (maxPrecipitation.value >= 1 && maxPrecipitation.value < 3) {
        maxPrecipitation.nextElementSibling.value = maxPrecipitation.nextElementSibling.value + '🌦️☂️';
    } else if (maxPrecipitation.value >= 3 && maxPrecipitation.value < 8) {
        maxPrecipitation.nextElementSibling.value = maxPrecipitation.nextElementSibling.value + '🌧️🌂';
    } else if (maxPrecipitation.value >= 8) {
        maxPrecipitation.nextElementSibling.value = maxPrecipitation.nextElementSibling.value + '⛈️🌧️';
    }
})

minWind.addEventListener('input', function () {
    if (minWind.value >= 0 && minWind.value < 4) {
        minWind.nextElementSibling.value = minWind.value + ' 🌬️🍃';
    } else if (minWind.value >= 4 && minWind.value < 7) {
        minWind.nextElementSibling.value = minWind.value + ' 💨🌲';
    } else if (minWind.value >= 7 && minWind.value < 11) {
        minWind.nextElementSibling.value = minWind.value + ' 🌪️🌀';
    } else if (minWind.value > 10) {
        minWind.nextElementSibling.value = minWind.value + ' 🌪️⚠️';
    }
});

maxWind.addEventListener('input', function () {
    if (maxWind.value >= 0 && maxWind.value < 4) {
        maxWind.nextElementSibling.value = maxWind.value + ' 🌬️🍃';
    } else if (maxWind.value >= 4 && maxWind.value < 7) {
        maxWind.nextElementSibling.value = maxWind.value + ' 💨🌲';
    } else if (maxWind.value >= 7 && maxWind.value < 11) {
        maxWind.nextElementSibling.value = maxWind.value + ' 🌪️🌀';
    } else if (maxWind.value > 10) {
        maxWind.nextElementSibling.value = maxWind.value + ' 🌪️⚠️';
    }
});