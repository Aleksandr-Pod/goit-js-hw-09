import Notiflix from 'notiflix';
// Дополнительный импорт стилей
import 'notiflix/dist/notiflix-3.2.2.min.css';


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
      setTimeout(() => {
    if (shouldResolve) {
      resolve ({position, delay})
    } else {
      reject ({position, delay})
    }
  }, delay)
  })
}

const refs = {
  submit: document.querySelector('button')
}
refs.submit.addEventListener('click', onSubmit);

// let position = 0;

function onSubmit(evt) {
  evt.preventDefault();
  let promises = [];
  let delay = Number(evt.currentTarget.form[0].value);
  const step = Number(evt.currentTarget.form[1].value);
  const amount = Number(evt.currentTarget.form[2].value);
 
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay).then(({ position, delay }) => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in : ${delay}`)
    }).catch(({ position, delay }) => {
      Notiflix.Notify.failure(`Rejected promise ${position} in: ${delay}`)
    });
    delay += step;
  }
}