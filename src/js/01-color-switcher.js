import Throttle from 'lodash.throttle'

const refs = {
  start: document.querySelector("[data-start]"),
  stop: document.querySelector('[data-stop]'),
  body: document.querySelector("body")
}
refs.stop.disabled = true;
let intID;

refs.start.addEventListener('click', onStart);
refs.stop.addEventListener('click', onStop);

function onStart() {
    refs.start.disabled = true;
    refs.stop.disabled = false;
    intID = setInterval(backgrChangeOn, 1000);
}
function onStop() {
    refs.start.disabled = false;
    refs.stop.disabled = true;
    backgrChangeOff();
}
function backgrChangeOn() {
  refs.body.style.backgroundColor = getRandomHexColor();
}
function backgrChangeOff() {
  clearInterval(intID);
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}