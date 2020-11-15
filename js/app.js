let root = document.documentElement;

// root.style.setProperty('--current-theme', 'red');



const yellow = '#DCE7C7';
const green = '#CBE7C7';
const teal = '#bce5e5';
const stealth = '#C7D5E7';

const darkSlate = '#dfe5f8';
const darkSlate2 = ' #e8eaf3';

let currentTheme = teal;



let lineChart = document.getElementById('trafficChart').getContext('2d');
let trafficChart = new Chart(lineChart, {
    type: 'line',
    data: {
        labels: ['12am', '4am', '8am', '12pm', '4pm', '8pm'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                currentTheme
            ],
            borderWidth: 2
        }]
    },
    options: {
        title: { 
            display: false,
        },
        legend: {
            display: false,
        },
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});




let barChart = document.getElementById('barChart').getContext('2d');
let dailyTraffic = new Chart(barChart, {
    type: 'bar',
    data: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
            label: '# of Votes',
            data: [12, 7, 3, 5, 2, 18, 10],
            backgroundColor: [
                currentTheme,
                currentTheme,
                currentTheme,
                currentTheme,
                currentTheme,
                currentTheme,
                currentTheme,
            ],
            borderWidth: 2
        }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});



let doughnutChart = document.getElementById('doughnutChart').getContext('2d');
let mobileTraffic = new Chart(doughnutChart, {
    type: 'doughnut',
    data: {
        labels: ['Mobile', 'Tablet', 'Desktop'],
        datasets: [{
            label: '# of Votes',
            data: [120, 190, 30],
            backgroundColor: [
                darkSlate,
                currentTheme,
                darkSlate2,
            ],
            borderWidth: 2
        }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});