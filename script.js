let timer;
let seconds = 0, minutes = 0, hours = 0;
let running = false;
let lapCounter = 1;

function updateDisplay() {
    let formattedTime = 
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds;
    document.getElementById("display").textContent = formattedTime;
}

function startStopwatch() {
    if (!running) {
        running = true;
        timer = setInterval(() => {
            seconds++;
            if (seconds == 60) { seconds = 0; minutes++; }
            if (minutes == 60) { minutes = 0; hours++; }
            updateDisplay();
        }, 1000);
        document.getElementById("startStop").textContent = "Pause";
    } else {
        running = false;
        clearInterval(timer);
        document.getElementById("startStop").textContent = "Start";
    }
}
function resetStopwatch() {
    running = false;
    clearInterval(timer);
    seconds = minutes = hours = 0;
    lapCounter = 1;
    document.getElementById("lapTimes").innerHTML = "";
    updateDisplay();
    document.getElementById("startStop").textContent = "Start";
}
function recordLap() {
    if (running) {
        const lapList = document.getElementById("lapTimes");
        const lapTime = document.getElementById("display").textContent;
        let newLap = document.createElement("li");
        newLap.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapList.appendChild(newLap);
        lapCounter++;
    }
}

document.getElementById("startStop").addEventListener("click", startStopwatch);
document.getElementById("reset").addEventListener("click", resetStopwatch);
document.getElementById("lap").addEventListener("click", recordLap);