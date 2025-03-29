let workTime = 25;  
let breakTime = 5;  
let isTimerActive = false;
let timeLeft = workTime * 60;  
let timerInterval;

let ringer = new Audio('ringer.mp3'); 

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("workTime").addEventListener("change", updateWorkTime);
document.getElementById("breakTime").addEventListener("change", updateBreakTime);

function startTimer() {
    if (isTimerActive) {
        clearInterval(timerInterval);
        isTimerActive = false;
        document.getElementById("status").textContent = "Timer Stopped";
        document.getElementById("startBtn").textContent = "Start Timer";
    } else {
        isTimerActive = true;
        document.getElementById("status").textContent = "Work Time Started!";
        document.getElementById("startBtn").textContent = "Stop Timer";
        startCountdown();
    }
}

function startCountdown() {
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (document.getElementById("status").textContent.includes("Work Time")) {
                document.getElementById("status").textContent = "Break Time!";
                timeLeft = breakTime * 60;
            } else {
                document.getElementById("status").textContent = "Work Time Started!";
                timeLeft = workTime * 60; 
            }

            playRinger();  

            startCountdown();  
        } else {
            document.getElementById("timerDisplay").textContent = formatTime(timeLeft);
            timeLeft--;
        }
    }, 1000);
}

function playRinger() {
    ringer.currentTime = 0;  
    ringer.play();  

    
    setTimeout(() => {
        ringer.pause();  
        ringer.currentTime = 0;  
    }, 10000);  
}

function updateWorkTime() {
    workTime = parseInt(document.getElementById("workTime").value);
    timeLeft = workTime * 60;
}

function updateBreakTime() {
    breakTime = parseInt(document.getElementById("breakTime").value);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${padZero(minutes)}:${padZero(remainingSeconds)}`;
}

function padZero(num) {
    return num < 10 ? "0" + num : num;
}
