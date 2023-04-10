let hours = 0;
let minutes = 0;
let seconds = 0;
let miliseconds = 0;

let displayMilisec = miliseconds;
let displaySec = seconds;
let displayMins = minutes;
let displayHours = hours; 

let interval = null;

let status = "stopped";

let lapNow = null;

function start() {
      miliseconds += 1;

      if (miliseconds / 100 === 1) {
            seconds +=1;
            miliseconds = 0;
            if (seconds / 60 === 1) {
                  minutes +=1;
                  seconds = 0;
                  if (minutes / 60 === 1) {
                        hours +=1;
                        minutes = 0;
                  }
            }
      }
     if (miliseconds < 10){
            displayMilisec = "0" + miliseconds;
      }
      else {
            displayMilisec = miliseconds;
      }
      
      if(seconds < 10) {
            displaySec = "0" + seconds;
      }
      else {
            displaySec = seconds;
      }
      
      if(minutes < 10) {
            displayMins = "0" + minutes;
      }
      else {
            displayMins = minutes;
      }
      
      if(hours < 10) {
            displayHours = "0" + hours;
      }
      else {
            displayHours = hours;
      }


      document.getElementById("timerMilisec").innerHTML = displayMilisec;
      document.getElementById("timerSec").innerHTML = displaySec;
      document.getElementById("timerMins").innerHTML = displayMins;
      document.getElementById("timerHrs").innerHTML = displayHours;

}

function startStop() {
      if (startBtn.textContent === "Start") {
    startBtn.textContent = "Stop";
    lapBtn.style.display = "inline-block";
    lapRecord.style.display = "block";
    interval = setInterval(start, 7.1);
  } else {
    startBtn.textContent = "Start";
    lapBtn.style.display = "none";
    clearInterval(interval);
  }
}

function reset() {
      window.clearInterval(interval);
      miliseconds = 0;
      seconds = 0;
      minutes = 0;
      hours = 0;
      displayMilisec = "00";
      displaySec = "00";
      displayMins = "00";
      displayHours = "00";
      document.getElementById("timerMilisec").innerHTML = "00";
      document.getElementById("timerSec").innerHTML = "00";
      document.getElementById("timerMins").innerHTML = "00";
      document.getElementById("timerHrs").innerHTML = "00";
      document.getElementById('startBtn').innerHTML = "Start";
      status = "stopped";
      document.getElementById('lapRecord').innerHTML = "";
      lapBtn.style.display = "none";
}

let previousLapTime = null;

function lap() {
  let currentLapTime = displayHours + " : " + displayMins + " : " + displaySec + " : " + displayMilisec;
  let lapRecord = document.getElementById('lapRecord');

  if (previousLapTime === null) { // if this is the first lap
    previousLapTime = currentLapTime;
    lapRecord.innerHTML += currentLapTime + "</p>";
  } else {
    let lapTimeDiff = calculateTimeDifference(previousLapTime, currentLapTime);
    previousLapTime = currentLapTime;

    
    lapRecord.innerHTML +=  lapTimeDiff + "</p>" ;
  }
}

function calculateTimeDifference(previousTime, currentTime) {
  let previousTimeArr = previousTime.split(" : ");
  let currentTimeArr = currentTime.split(" : ");

  let hoursDiff = parseInt(currentTimeArr[0]) - parseInt(previousTimeArr[0]);
  let minsDiff = parseInt(currentTimeArr[1]) - parseInt(previousTimeArr[1]);
  let secsDiff = parseInt(currentTimeArr[2]) - parseInt(previousTimeArr[2]);
  let milisecsDiff = parseInt(currentTimeArr[3]) - parseInt(previousTimeArr[3]);

  if (milisecsDiff < 0) {
    milisecsDiff += 100;
    secsDiff -= 1;
  }

  if (secsDiff < 0) {
    secsDiff += 60;
    minsDiff -= 1;
  }

  if (minsDiff < 0) {
    minsDiff += 60;
    hoursDiff -= 1;
  }

  let lapTimeDiff = formatTimeDiff(hoursDiff, minsDiff, secsDiff, milisecsDiff);
  return lapTimeDiff;
}

function formatTimeDiff(hours, mins, secs, milisecs) {
  let formattedTimeDiff = "";

  if (hours < 10) {
    formattedTimeDiff += "0";
  }
  formattedTimeDiff += hours + " : ";

  if (mins < 10) {
    formattedTimeDiff += "0";
  }
  formattedTimeDiff += mins + " : ";

  if (secs < 10) {
    formattedTimeDiff += "0";
  }
  formattedTimeDiff += secs + " : ";

  if (milisecs < 10) {
    formattedTimeDiff += "0";
  }
  formattedTimeDiff += milisecs;

  return formattedTimeDiff;
}

let lapBtn = document.getElementById("lapBtn");

function stop() {
  clearInterval(interval);
  lapBtn.style.display = "none"; // hide the lap button
}