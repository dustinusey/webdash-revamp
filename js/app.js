


const dashContainer = document.querySelector('.dashboard-container');
const notificationPanel = document.querySelector('.notification-panel');
dashContainer.addEventListener('click', e => {
    if (e.target.classList.contains('fa-times')) {
        //do nothing
    } else
    if (e.target !== notificationBell) {
        notificationPanel.classList.remove('show-notifications');
    }
});


const closeNotifications = document.querySelectorAll('.item i');
notificationPanel.addEventListener('click', e => {
    const itemContainer = document.querySelector('.notification-items');
    
    closeNotifications.forEach((close) => {
        if (e.target === close) {
            e.target.parentNode.remove();
        }
    });
    if (itemContainer.childElementCount === 0) {
        const notifAlert = document.querySelector('.alert');
        notifAlert.style.display = 'none';
    }
})

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


// local storage

const checkedEmail = JSON.parse(localStorage.getItem("email-checkbox"));
document.getElementById("email-checkbox").checked = checkedEmail;

const checkedPrivacy = JSON.parse(localStorage.getItem("privacy-checkbox"));
document.getElementById("privacy-checkbox").checked = checkedPrivacy;

const timezoneSelect = document.getElementById('timezone-select');
timezoneSelect.value = localStorage.getItem('timezone');

function saveEmailSettings() {
    const emailCheckbox = document.getElementById("email-checkbox");
    localStorage.setItem("email-checkbox", emailCheckbox.checked);
  }
function savePrivacySettings() {
    const privacyCheckbox = document.getElementById("privacy-checkbox");
    localStorage.setItem("privacy-checkbox", privacyCheckbox.checked);
}
function saveTimezone() {
    let timezoneSelection = document.getElementById('timezone-select').value;
    localStorage.setItem('timezone', timezoneSelection);
    return true;
}




  const saveBtn = document.querySelector('.save');
  const cancelBtn = document.querySelector('.cancel');

  saveBtn.addEventListener('click', () => {
      saveEmailSettings();
      savePrivacySettings();
      saveTimezone();
      showOverlay();
    createAlert('Settings Saved', 'Your settings have been updated.')
  });

  cancelBtn.addEventListener('click', () => {
      localStorage.setItem('email-checkbox', false);
      localStorage.setItem('privacy-checkbox', false);
      localStorage.removeItem('timezone', 'Please Choose a Timezone');

      document.getElementById("email-checkbox").checked = false;
      document.getElementById("privacy-checkbox").checked = false;
      timezoneSelect.value = localStorage.getItem('timezone');
      localStorage.removeItem('theme');

  });



  const themeSelection = document.querySelector('.theme-container');
  const themeItem = document.querySelectorAll('.theme-container .theme-option')
  themeSelection.addEventListener('click', e => {
      themeItem.forEach((item, index) => {
          if (e.target === item) {
              localStorage.setItem('theme', themes[index]);
          }
      });
  });
let activeTheme = localStorage.getItem('theme');
  root.style.setProperty('--current-theme', activeTheme);

  if (!localStorage.theme) {
    activeTheme = yellow;
}


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



const notificationBell = document.querySelector('.utility-container i');
notificationBell.addEventListener('click', () => {
    const notificationPanel = document.querySelector('.notification-panel');
    notificationPanel.classList.add('show-notifications');
});











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
                activeTheme
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
                activeTheme,
                activeTheme,
                activeTheme,
                activeTheme,
                activeTheme,
                activeTheme,
                activeTheme,
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
                activeTheme,
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





const alertToggle = document.querySelector('.close-alert');
alertToggle.addEventListener('click', e => {
        e.target.parentNode.style.opacity = '0';
        e.target.parentNode.style.pointerEvents = 'none';
        setTimeout(() => {
            e.target.parentNode.style.display = 'none';
        }, 800)
})





// messaging functionality


const userField = document.querySelector('form input');
const users = document.querySelector('.users');
const userNames = document.querySelectorAll('.users li');
const textarea = document.querySelector('form textarea');
textarea.addEventListener('click', e => {
    if (e.target === textarea) {
        users.style.height = '0px';
        users.style.opacity = '0';
    }
})

const userData = [];

userNames.forEach((name) => {
    userData.push(name.textContent)
})

users.addEventListener('click', e => {
    users.style.height = '0px';
    users.style.opacity = '0';
    userField.value = e.target.textContent;
})

userField.addEventListener('keyup', e => {
    users.style.height = '100px';
    users.style.opacity = '1';

    let value = userField.value.toLowerCase();
    userData.forEach((user, index) => {
        if (user.toLowerCase().includes(value)) {
            userNames[index].style.display = 'block';
        } else {
            userNames[index].style.display = 'none';
        }
    })
});

const sendBtn = document.querySelector('.send-btn');
sendBtn.addEventListener('click', () => {
    const userField = document.querySelector('form input');
    const textField = document.querySelector('form textarea');
    if (userField.value === '' && (textField.value === '')) {
        showOverlay();
        createAlert('Your message is empty!', 'Please make sure to choose a user to send a message to as well as write a message.')
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








