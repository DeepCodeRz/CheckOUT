function updateRange(sliderMin, sliderMax, sliderRange, output) {
    const min = parseInt(sliderMin.value);
    const max = parseInt(sliderMax.value);

    // Çakışmayı önlemek için minimum ve maksimum aralığı kontrol ediyoruz
    if (min > max) {
        sliderMin.value = max - 1; // min değeri max'tan küçük olmalı
    }

    const percentMin = (sliderMin.value - sliderMin.min) / (sliderMin.max - sliderMin.min) * 100;
    const percentMax = (sliderMax.value - sliderMax.min) / (sliderMax.max - sliderMax.min) * 100;

    sliderRange.style.left = percentMin + "%";
    sliderRange.style.width = (percentMax - percentMin) + "%";

    output.textContent = `${sliderMin.value} - ${sliderMax.value}`;
}

document.querySelectorAll(".range-slider").forEach(sliderContainer => {
    const sliderMin = sliderContainer.querySelector("input:first-of-type");
    const sliderMax = sliderContainer.querySelector("input:last-of-type");
    const sliderRange = sliderContainer.querySelector(".range");
    const output = sliderContainer.querySelector("output");

    sliderMin.addEventListener("input", () => updateRange(sliderMin, sliderMax, sliderRange, output));
    sliderMax.addEventListener("input", () => updateRange(sliderMin, sliderMax, sliderRange, output));

    updateRange(sliderMin, sliderMax, sliderRange, output); // Başlangıçta aralık değerini güncelle
});