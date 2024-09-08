const info = document.getElementById("info");
const attribution = document.getElementById("attribution");
const card = document.getElementsByClassName("card")[0];
const attributionCard = document.getElementsByClassName("attributionCard")[0];
const InfoBtn = document.getElementById('Info')
const InfoImg = document.getElementById('infoImg');
const date = document.getElementById('date').value;

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