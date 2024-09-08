const attribution = document.getElementById("attribution");
const attributionCard = document.getElementsByClassName("attributionCard")[0];
const card = document.getElementsByClassName("card")[0];
const InfoBtn = document.getElementById('Info')
const InfoImg = document.getElementById('infoImg');
const checkBtn = document.getElementById('checkBtn')

checkBtn.addEventListener('click', function () {
    const date = document.getElementById('date').value;
    const minTemp = document.getElementById('minTemp').value;
    const maxTemp = document.getElementById('maxTemp').value;
    const minRain = document.getElementById('minRain').value;
    const maxRain = document.getElementById('maxRain').value;
    const minWind = document.getElementById('minWind').value;
    const maxWind = document.getElementById('maxWind').value;

    fetch("/options", {

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                date: date,
                minTemp: minTemp,
                maxTemp: maxTemp,
                minRain: minRain,
                 maxRain: maxRain,
                minWind: minWind,
                maxWind: maxWind
            })
        }
    ).then(res => res.json()).then((res) => {console.log(res)})
})

let attributionDisplay =  false
attribution.addEventListener("click", function() {
    if (attributionDisplay === false) {
        card.style.display = "none";
        InfoImg.style.display = "none";
        attributionCard.style.display = "block";
        attributionDisplay = true
    } else if (attributionDisplay === true) {
        attributionCard.style.display = "none";
        InfoImg.style.display = "none";
        card.style.display = "block";
        attributionDisplay = false
    }
})
let infoDisplay = false
InfoBtn.addEventListener("click", function() {
    if (infoDisplay === false) {
        card.style.display = "none";
        attributionCard.style.display = "none";
        InfoImg.style.display = "block";
        infoDisplay = true
    } else if (infoDisplay === true) {
        InfoImg.style.display = "none";
        attributionCard.style.display = "none";
        card.style.display = "block";
        infoDisplay = false
    }
})