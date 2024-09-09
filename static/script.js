let lat;
let lag;
let map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let marker;
map.on('click', function(e) {
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker(e.latlng).addTo(map);

    lat = Math.round(e.latlng.lat);
    lng = Math.round(e.latlng.lng);

    document.getElementById("coordinates").textContent = lat + ", " + lng;
});

const attribution = document.getElementById("attribution");
const attributionCard = document.getElementsByClassName("attributionCard")[0];
const card = document.getElementsByClassName("card")[0];
const InfoBtn = document.getElementById('Info');
const InfoImg = document.getElementById('infoImg');
const checkBtn = document.getElementById('checkBtn');

checkBtn.addEventListener('click', function () {
    const date = document.getElementById('date').value;
    const minTemp = document.getElementById('minTemp').value;
    const maxTemp = document.getElementById('maxTemp').value;
    const minPrecipitation = document.getElementById('minPrecipitation').value;
    const maxPrecipitation = document.getElementById('maxPrecipitation').value;
    const minWind = document.getElementById('minWind').value;
    const maxWind = document.getElementById('maxWind').value;


    fetch("/options", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            lat: toString(lat),
            lng: toString(lng),
            date: date,
            minTemp: minTemp,
            maxTemp: maxTemp,
            minPrecipitation: minPrecipitation,
            maxPrecipitation: maxPrecipitation,
            minWind: minWind,
            maxWind: maxWind
        })
    }).then(res => res.json()).then((res) => {
        console.log(res);
    });
});

let attributionDisplay = false;
attribution.addEventListener("click", function() {
    if (attributionDisplay === false) {
        card.style.display = "none";
        InfoImg.style.display = "none";
        attributionCard.style.display = "block";
        attributionDisplay = true;
    } else {
        attributionCard.style.display = "none";
        InfoImg.style.display = "none";
        card.style.display = "block";
        attributionDisplay = false;
    }
});

let infoDisplay = false;
InfoBtn.addEventListener("click", function() {
    if (infoDisplay === false) {
        card.style.display = "none";
        attributionCard.style.display = "none";
        InfoImg.style.display = "block";
        infoDisplay = true;
    } else {
        InfoImg.style.display = "none";
        attributionCard.style.display = "none";
        card.style.display = "block";
        infoDisplay = false;
    }
});