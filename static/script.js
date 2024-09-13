let today = new Date();
const year = today.getFullYear();
let month = today.getMonth() + 1;
const day = today.getDate();
let date = document.getElementById("date")

if (month.length !== 2) {
    month = "0" + month;
}

today = `${year}-${month}-${day}`;

date.value = today

let lat;
let lng;
let map = L.map('map').setView([40.999, 29], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let marker;
map.on('click', function(e) {
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker(e.latlng).addTo(map);
    if (marker && error1.style.display === "block") {
        error1.style.display = "none"
    }

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
const error0 = document.getElementById('error0');
const error1 = document.getElementById('error1');
const error2 = document.getElementById('error2');
const greenResult = document.getElementById('greenResult');
const redResult = document.getElementById('redResult');
const greenCloseBtn = document.getElementById('greenCloseBtn');
const redCloseBtn = document.getElementById('redCloseBtn');

checkBtn.addEventListener('click', function () {
    const date = document.getElementById('date').value;
    const minTemp = document.getElementById('minTemp').value;
    const maxTemp = document.getElementById('maxTemp').value;
    const minPrecipitation = document.getElementById('minPrecipitation').value;
    const maxPrecipitation = document.getElementById('maxPrecipitation').value;
    const minWind = document.getElementById('minWind').value;
    const maxWind = document.getElementById('maxWind').value;

    if (minTemp <= maxTemp && minPrecipitation <= maxPrecipitation && minWind <= maxWind) {
        error0.style.display = "none";
    } else {
        error0.style.display = "block";
    }

    if (lat === undefined || lng === undefined) {
        error1.style.display = 'block';
    } else {
        error1.style.display = 'none';
    }

    if (error0.style.display === 'none' && error1.style.display === 'none') {
        let time = document.getElementsByName("segment")
        for (i in time) {
            if (time[i].checked) {
                time = time[i].id;
                break
            }
        }

        fetch("/options", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                lat: lat,
                lng: lng,
                time: time,
                date: date,
                minTemp: minTemp,
                maxTemp: maxTemp,
                minPrecipitation: minPrecipitation,
                maxPrecipitation: maxPrecipitation,
                minWind: minWind,
                maxWind: maxWind
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.error0) {
                    error0.style.display = 'block';
                } else if (data.error2) {
                    error2.style.display = 'block';
                } else if (data.error3) {
                    error3.style.display = 'block';
                } else if (data.true) {
                    redResult.style.display = 'none';
                    greenResult.style.opacity = "100%"
                    card.style.opacity = "10%"
                    greenResult.style.display = 'block';
                } else if (data.false) {
                    greenResult.style.display = 'none';
                    redResult.style.opacity = "100%"
                    card.style.opacity = "10%"
                    redResult.style.display = 'block';
                }
            })
            .catch(error => console.error('Error:', error));
    }

    greenCloseBtn.addEventListener('click', function () {
        greenResult.style.display = 'none';
        card.style.opacity = "100%"
    })

    redCloseBtn.addEventListener('click', function () {
        redResult.style.display = 'none';
        card.style.opacity = "100%"

    })
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