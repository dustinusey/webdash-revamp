// THEME OVERRIDES 

let root = document.documentElement;
// root.style.setProperty('--current-theme', 'red');


const themes = [
    '#e7e5c7',
    '#CBE7C7',
    '#bce5e5',
    '#C7D5E7'
]


const yellow = '#e7e5c7';
const green = '#CBE7C7';
const teal = '#bce5e5';
const stealth = '#C7D5E7';

const darkSlate = '#dfe5f8';
const darkSlate2 = ' #e8eaf3';

let currentTheme = yellow;

// 

const themeContainer = document.querySelector('.theme-container');
themeContainer.addEventListener('click', e => {
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach((theme, index) => {
        if (e.target === theme) {
            root.style.setProperty('--current-theme', themes[index]);
            trafficChart.data.datasets[0].backgroundColor = themes[index];
            dailyTraffic.data.datasets[0].backgroundColor = themes[index];
            mobileTraffic.data.datasets[0].backgroundColor = themes[index];
            trafficChart.update();
            dailyTraffic.update();
            mobileTraffic.update();
        }
    })
})



// Chart functionality & Data





// Chart sliders

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



// 









// messaging functionality

const sendBtn = document.querySelector('.send-btn');
sendBtn.addEventListener('click', () => {
    const userField = document.querySelector('form input');
    const textField = document.querySelector('form textarea');
    if (userField.value === '' && (textField.value === '')) {
        showOverlay();
        createAlert('Your message is empty!', 'Please make sure to choose a user to send a massage to as well as write a message.')
    } else if
        (userField.value === '') {
            showOverlay();
            createAlert('No user selected!', 'Make sure to include a user to send your message to.')
        }
    else if
        (textField.value == '') {
            showOverlay();
            createAlert('No message!', 'Make sure you provide a message to the user.')
        }
    else {
        setTimeout(() => {
            showOverlay();
            createAlert('Message sent successfully!', `Your message has been sent to <span class="bolder">${userField.value}</span>`)
            userField.value = '';
            textField.value = '';
        }, 1200);
    }
    
})

// 

const overlay = document.querySelector('.overlay');
const dashContainer = document.querySelector('.dashboard-container');
function showOverlay() {
    overlay.style.pointerEvents = 'auto';
    overlay.style.opacity = '1';
    dashContainer.style.filter = 'blur(3px) grayscale(1)'
}
function hideOverlay() {
    overlay.style.pointerEvents = 'none';
    overlay.style.opacity = '0';
    dashContainer.style.filter = 'blur(0px)'
}

function createAlert(alertText, bodyText) {
    overlay.innerHTML =
    `
    <div class="alert-card">
        <h2>${alertText}</h2>
        <p>${bodyText}</p>
        <button class="close-overlay">Close</button>
    </div>
    `
}

overlay.addEventListener('click', e => {
    if (e.target === overlay || e.target.classList.contains('close-overlay')) {
        hideOverlay();
    }
});



const nav = document.querySelector('nav');
const navItems = document.querySelectorAll('nav a');
nav.addEventListener('click', e => {
    iterateClass(navItems, 'active-nav-item', e);
});




function iterateClass(collection, className, e) {
    collection.forEach((item) => {
        if (e.target === item) {
            for (let i = 0; i < collection.length; i ++) {
                collection[i].parentNode.classList.remove(className);
            }
            e.target.parentNode.classList.add(className);
        }
    });
}