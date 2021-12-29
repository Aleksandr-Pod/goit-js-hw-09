import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

// console.log(Date.now()) // 1640601086754
// console.log(new Date) // Date Mon Dec 27 2021 12:31:45 GMT+0200 (Восточная Европа, стандартное время)
// console.log((new Date).getTime()) // 1640601086914

const refs = {
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
    startBtn: document.querySelector("[data-start]")
}
refs.startBtn.disabled = true;

let selectedDate = 0;
let timerId = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {

        selectedDate = selectedDates[0].getTime();
        if (selectedDate <= Date.now()) {
            alert("Please choose a date in the future");
            return
        }
        refs.startBtn.disabled = false;
  },
};

flatpickr("#datetime-picker", options);
refs.startBtn.addEventListener('click', startTimer);

function startTimer() {
    refs.startBtn.disabled = true;
    timerId = setInterval(changeTimer, 1000)
}

function changeTimer() {
    const rangeTime = selectedDate - Date.now();
    if (rangeTime < 1000) {
        finishTimer()
        return;
    }
    const timer = convertMs(rangeTime);
    showTimer(timer);
}

function finishTimer() {
    clearInterval(timerId);
    console.log('timer had finished !')
}
function showTimer(timer) {
    refs.days.textContent = String(timer.days).padStart(2, 0);
    refs.hours.textContent = String(timer.hours).padStart(2, 0);
    refs.minutes.textContent = String(timer.minutes).padStart(2, 0);
    refs.seconds.textContent = String(timer.seconds).padStart(2, 0);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}