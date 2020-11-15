let root = document.documentElement;

// root.style.setProperty('--current-theme', 'red');



const yellow = '#e7e5c7';
const green = '#CBE7C7';
const teal = '#bce5e5';
const stealth = '#C7D5E7';

const darkSlate = '#dfe5f8';
const darkSlate2 = ' #e8eaf3';

let currentTheme = yellow;



//slider pos
const sliderPos = [
    // hourly
    '310',
    // daily
    '225',
    // weekly
    '142',
    // monthly
    '46'
];

const trafficToggle_data = [
    [12, 19, 3, 5, 2, 3],
    [33, 29, 14, 34, 33],
    [20, 11, 17, 25, 28],
    [12, 27, 13, 15, 12, 13]
];

const trafficToggle_labels = [
    ['12am', '4am', '8am', '12pm', '4pm', '8pm'],
    ['5th', '10th', '15th', '20th', '25th'],
    ['week 1', 'week 2', 'week 3', 'week 4'],
    ['January', 'April', 'July', 'October', 'December']
];


const sliderContainer = document.querySelector('.chart-slider-container');
const sliderItem = document.querySelectorAll('.chart-slider-container li');
const slider = document.querySelector('.slider');

sliderContainer.addEventListener('click', e => {
    sliderItem.forEach((item, index) => {
        if (e.target === item) {
            trafficChart.data.datasets[0].data = trafficToggle_data[index];
            trafficChart.data.labels = trafficToggle_labels[index];
            trafficChart.update();
            slider.style.right = `${sliderPos[index]}px`
            slider.style.animation = 'rubberBand 1s ease forwards';
        }
    });
});

slider.addEventListener('animationend', () => {
    slider.style.animation = 'none';
})



let lineChart = document.getElementById('trafficChart').getContext('2d');
let trafficChart = new Chart(lineChart, {
    type: 'line',
    data: {
        labels: ['12am', '4am', '8am', '12pm', '4pm', '8pm'],
        datasets: [{
            label: '# of visits',
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
        legend: {
            display: false
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
        title: {
            display: false,
        },
        legend: {
            position: 'right',
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