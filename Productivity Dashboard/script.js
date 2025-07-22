function openFeatures() {
    var allElems = document.querySelectorAll('.elem')
    var fullElemPage = document.querySelectorAll('.fullElem')
    var fullElemPageBackBtn = document.querySelectorAll('.fullElem .back')

    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            fullElemPage[elem.id].style.display = 'block'
        })
    })

    fullElemPageBackBtn.forEach(function (back) {
        back.addEventListener('click', function () {
            fullElemPage[back.id].style.display = 'none'
        })
    })
}

openFeatures()

function todoList() {
    var currentTask = []

    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    } else {
        console.log('Task list is Empty')
    }

    function renderTask() {
        var allTask = document.querySelector('.allTask')
        var sum = ''

        currentTask.forEach(function (elem, idx) {
            sum += `<div class="task">
        <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
        <button id=${idx}>Mark as Completed</button>
        </div>`
        })

        allTask.innerHTML = sum
        localStorage.setItem('currentTask', JSON.stringify(currentTask))

        document.querySelectorAll('.task button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1)
                renderTask()
            })
        })
    }

    renderTask()

    let form = document.querySelector('.addTask form')
    let taskInput = document.querySelector('.addTask form #task-input')
    let taskDetailsInput = document.querySelector('.addTask form textarea')
    let taskCheckbox = document.querySelector('.addTask form #check')

    form.addEventListener('submit', function (e) {
        e.preventDefault()
        currentTask.push({
            task: taskInput.value,
            details: taskDetailsInput.value,
            imp: taskCheckbox.checked
        })
        renderTask()

        taskCheckbox.checked = false
        taskInput.value = ''
        taskDetailsInput.value = ''
    })
}

todoList()

function dailyPlanner() {
    var dayPlanner = document.querySelector('.day-planner')
    var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}
    var hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)

    var wholeDaySum = ''
    hours.forEach(function (elem, idx) {
        var savedData = dayPlanData[idx] || ''
        wholeDaySum += `<div class="day-planner-time">
    <p>${elem}</p>
    <input id=${idx} type="text" placeholder="..." value="${savedData}">
</div>`
    })

    dayPlanner.innerHTML = wholeDaySum

    var dayPlannerInput = document.querySelectorAll('.day-planner input')

    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            dayPlanData[elem.id] = elem.value
            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
    })
}

dailyPlanner()

function motivationalQuote() {
    var motivationQuoteContent = document.querySelector('.motivation-2 h1')
    var motivationAuthor = document.querySelector('.motivation-3 h2')

    async function fetchQuote() {
        try {
            let response = await fetch('https://api.quotable.io/random')
            let data = await response.json()

            motivationQuoteContent.innerHTML = data.content
            motivationAuthor.innerHTML = `– ${data.author}`
        } catch (err) {
            motivationQuoteContent.innerHTML = "Keep going!"
            motivationAuthor.innerHTML = "– Unknown"
            console.error("Quote fetch failed:", err)
        }
    }

    fetchQuote()
}

motivationalQuote()

function pomodoroTimer() {
    let timer = document.querySelector('.pomo-timer h1')
    var startBtn = document.querySelector('.pomo-timer .start-timer')
    var pauseBtn = document.querySelector('.pomo-timer .pause-timer')
    var resetBtn = document.querySelector('.pomo-timer .reset-timer')
    var session = document.querySelector('.pomodoro-fullpage .session')
    var isWorkSession = true

    let totalSeconds = 25 * 60
    let timerInterval = null

    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = totalSeconds % 60
        timer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    function startTimer() {
        clearInterval(timerInterval)

        timerInterval = setInterval(function () {
            if (totalSeconds > 0) {
                totalSeconds--
                updateTimer()
            } else {
                clearInterval(timerInterval)
                isWorkSession = !isWorkSession
                totalSeconds = isWorkSession ? 25 * 60 : 5 * 60
                timer.innerHTML = isWorkSession ? '25:00' : '05:00'
                session.innerHTML = isWorkSession ? 'Work Session' : 'Take a Break'
                session.style.backgroundColor = isWorkSession ? 'var(--green)' : 'var(--blue)'
            }
        }, 1000)
    }

    function pauseTimer() {
        clearInterval(timerInterval)
    }

    function resetTimer() {
        totalSeconds = 25 * 60
        clearInterval(timerInterval)
        updateTimer()
    }

    startBtn.addEventListener('click', startTimer)
    pauseBtn.addEventListener('click', pauseTimer)
    resetBtn.addEventListener('click', resetTimer)
}

pomodoroTimer()

// ✅ Complete Weather App with Features + Interactions

function weatherFunctionality() {
    const apiKey = "7e4a83caed4c41cb97354501252207";
    let city = 'Bhopal';

    const header1Time = document.querySelector('.header1 h1');
    const header1Date = document.querySelector('.header1 h2');
    const header2Temp = document.querySelector('.header2 h2');
    const header2Condition = document.querySelector('.header2 h4');
    const precipitation = document.querySelector('.header2 .precipitation');
    const humidity = document.querySelector('.header2 .humidity');
    const wind = document.querySelector('.header2 .wind');
    const weatherIcon = document.querySelector('.header2 .weather-icon');
    const searchBtn = document.querySelector('#search-btn');
    const cityInput = document.querySelector('#city-input');

    async function weatherAPICall() {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
            const data = await response.json();

            if (data && data.current) {
                header2Temp.innerHTML = `${data.current.temp_c}°C`;
                header2Condition.innerHTML = `${data.current.condition.text}`;
                wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
                humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
                precipitation.innerHTML = `Heat Index: ${data.current.heatindex_c}°C`;

                if (weatherIcon) {
                    weatherIcon.src = `https:${data.current.condition.icon}`;
                    weatherIcon.alt = data.current.condition.text;
                }
            } else {
                alert("Weather data not found. Check city name.");
            }
        } catch (err) {
            console.error("Weather API error:", err);
            alert("Failed to fetch weather data. Try again later.");
        }
    }

    function updateTimeDate() {
        const totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const date = new Date();
        const dayOfWeek = totalDaysOfWeek[date.getDay()];
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;

        header1Date.innerHTML = `${day} ${month}, ${year}`;
        header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}`;
    }

    setInterval(updateTimeDate, 1000);
    weatherAPICall();

    if (searchBtn && cityInput) {
        searchBtn.addEventListener('click', () => {
            if (cityInput.value.trim() !== "") {
                city = cityInput.value.trim();
                weatherAPICall();
            } else {
                alert("Please enter a city name.");
            }
        });
    }
}





function changeTheme() {
    var theme = document.querySelector('.theme')
    var rootElement = document.documentElement
    var flag = 0

    theme.addEventListener('click', function () {
        if (flag == 0) {
            rootElement.style.setProperty('--pri', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#222831')
            rootElement.style.setProperty('--tri1', '#948979')
            rootElement.style.setProperty('--tri2', '#393E46')
            flag = 1
        } else if (flag == 1) {
            rootElement.style.setProperty('--pri', '#F1EFEC')
            rootElement.style.setProperty('--sec', '#030303')
            rootElement.style.setProperty('--tri1', '#D4C9BE')
            rootElement.style.setProperty('--tri2', '#123458')
            flag = 2
        } else if (flag == 2) {
            rootElement.style.setProperty('--pri', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#381c0a')
            rootElement.style.setProperty('--tri1', '#FEBA17')
            rootElement.style.setProperty('--tri2', '#74512D')
            flag = 0
        }
    })
}

changeTheme()
