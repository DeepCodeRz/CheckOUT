// Chart.js ile basit bir grafik oluşturma
const ctx = document.getElementById('workoutChart').getContext('2d');
const workoutChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [{
            label: 'Monthly Workouts',
            data: [5, 7, 3, 6, 8, 10, 12, 9, 11],
            backgroundColor: 'rgba(41, 128, 185, 0.2)',
            borderColor: '#2980b9',
            borderWidth: 2,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});