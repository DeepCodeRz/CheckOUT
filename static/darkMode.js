const darkModeBtn = document.getElementById("darkModeBtn");
const body = document.body

darkModeBtn.addEventListener("click", function() {
    body.classList.toggle("dark-mode");
})