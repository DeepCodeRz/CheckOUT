let lat;
let lng;
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
const error0 = document.getElementById('error0');
const error1 = document.getElementById('error1');
const error2 = document.getElementById('error2');
const error3 = document.getElementById('error3');
const greenResult = document.getElementById('greenResult');
const redResult = document.getElementById('redResult');

checkBtn.addEventListener('click', function () {
    if (lat === undefined || lng === undefined) {
        error1.style.display = 'block';
    } else {
        error1.style.display = 'none';
    }

    if (error0.style.display === 'none' && error1.style.display === 'none' && error2.style.display === 'none') {
        let time = document.getElementsByName("segment")
        for (i in time) {
            if (time[i].checked) {
                time = time[i].id;
                break
            }
        }
        const date = document.getElementById('date').value;
        const minTemp = document.getElementById('minTemp').value;
        const maxTemp = document.getElementById('maxTemp').value;
        const minPrecipitation = document.getElementById('minPrecipitation').value;
        const maxPrecipitation = document.getElementById('maxPrecipitation').value;
        const minWind = document.getElementById('minWind').value;
        const maxWind = document.getElementById('maxWind').value;

        if (date === "") {
            error2.style.display = 'block';
        } else {
            error2.style.display = 'none';
        }
        console.log(date)

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
                } else if (data.error3) {
                    error3.style.display = 'block';
                } else if (data.true) {
                    redResult.style.display = 'none';
                    greenResult.style.display = 'block';
                } else if (data.false) {
                    greenResult.style.display = 'none';
                    redResult.style.display = 'block';
                }
            })
            .catch(error => console.error('Error:', error));
    }
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