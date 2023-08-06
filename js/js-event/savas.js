const remainingDiv = document.getElementById("remainingDiv");
const remainingForm = document.getElementById("remainingForm");
const timeDiv = document.getElementById("timeDiv");
const datePicker = document.getElementById("datePicker");
const timeSpans = document.querySelectorAll("span");
const resetButton = document.getElementById("resetButton");
const timeNow = document.getElementById("timeNow");
const completeButton = document.getElementById('completeButton');

const today = new Date().toISOString().split("T")[0];

let chosenDate = "";
let currentDateValue = new Date().getTime();
let currentTimeInterval;
let localStorageTime;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

datePicker.setAttribute("min", today);

function UpdateDom() {
  currentTimeInterval = setInterval(() => {
    const now = new Date().getTime();
    const betweenDatte = currentDateValue - now;

    const days = Math.floor(betweenDatte / day);
    const hours = Math.floor((betweenDatte % day) / hour);
    const minutes = Math.floor((betweenDatte % hour) / minute);
    const seconds = Math.floor((betweenDatte % minute) / second);

    remainingDiv.hidden = true;

    if (betweenDatte < 0) {
      timeDiv.hidden = true;
      clearInterval(currentTimeInterval);
      timeNow.hidden = false;
    } else {
      
      timeDiv.hidden = false;

      timeSpans[0].textContent = `${days}`;
      timeSpans[1].textContent = `${hours}`;
      timeSpans[2].textContent = `${minutes}`;
      timeSpans[3].textContent = `${seconds}`;
    }
  }, 1000);
}

function ResetTime() {
  clearInterval(currentTimeInterval);
  timeDiv.hidden = true;
  remainingDiv.hidden = false;
  localStorage.removeItem('time');

}

function CalculateAgain(){
    timeNow.hidden = true;
    remainingDiv.hidden = false;
}

remainingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  chosenDate = remainingForm.date.value;

  localStorageTime = {
    date: chosenDate,
  };
  localStorage.setItem('time', JSON.stringify(localStorageTime));

  if (chosenDate == "") {
    alert("Please choose a valid date");
  } else {
    currentDateValue = new Date(chosenDate).getTime();
    UpdateDom();
  }
});

function RefreshTime(){
    if(localStorage.getItem('time')){
        remainingDiv.hidden = true;
        localStorageTime = JSON.parse(localStorage.getItem('time'));
        chosenDate = localStorageTime.date;
        currentDateValue = new Date(chosenDate).getTime();
        
        UpdateDom();
    }
}

resetButton.addEventListener("click", ResetTime);

completeButton.addEventListener('click', CalculateAgain);

RefreshTime();