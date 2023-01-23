import './style/result.css';
import logo from '../assets/Pictures/logoRS.svg';

let logoImg = document.querySelectorAll('.link-rs__img')[0];
logoImg.src = logo;
let againBtn = document.querySelectorAll('.result__block__btn')[0];
againBtn.classList.add('btn-none');
let resultBlock2 = document.querySelectorAll('.result__block__div')[1];
let resultBlockPoint = localStorage.getItem('resultBlockPoint');
if(+resultBlockPoint !== 30) againBtn.classList.remove('btn-none');
if(+resultBlockPoint == 30) resultBlock2.classList.remove('block__div-none');
let resultBlock = document.querySelectorAll('.result__block__div')[0];
resultBlock.innerHTML = `Вы набрали ${resultBlockPoint} из 30 очков!`; 
// let againBtn = document.querySelectorAll('.result__block__btn')[0];

againBtn.addEventListener('click', () => {
  window.location.href = '../quiz/quiz.html';
})
languageApp();

function languageApp() {
  let changeLngList = document.querySelectorAll('.header__lng__list')[0];
  if (localStorage.getItem('CheakLanguageApp') == null 
   || localStorage.getItem('CheakLanguageApp') == 'RU') {
    if(localStorage.getItem('LanguageAppList') !== null){
      changeLngList.innerHTML = localStorage.getItem('LanguageAppList');
    }
    languageAppRu();
    resultBlock.innerHTML = `Вы набрали ${resultBlockPoint} из 30 очков!`; 
  }
  else {
    changeLngList.innerHTML = localStorage.getItem('LanguageAppList');
    languageAppEn();
    resultBlock.innerHTML = `You have scored ${resultBlockPoint} of 30 points!`; 
  };
}

function languageAppRu() {
  let navList = document.querySelectorAll('.nav__list')[0];
  navList.innerHTML = `<li class="nav__list__item">
  <a href="../index/index.html" class="nav__list__item__link">Главная</a>
  </li>
  <li class="nav__list__item">
  <a href="../quiz/quiz.html" class="nav__list__item__link">Викторина</a>
  </li>
  <li class="nav__list__item">
  <a href="../gallery/gallery.html" class="nav__list__item__link">Галерея</a>
  </li>`;
  
  let resultBlockH2 = document.querySelectorAll('.result__block__h2')[0];
  resultBlockH2.innerHTML = 'Поздравляю!';
  let resultBlock = document.querySelectorAll('.result__block__div')[0];
  let resultBlock2 = document.querySelectorAll('.result__block__div')[1];
  resultBlock2.innerHTML = 'Вы прошли игру!'
  let resultBlockBtn = document.querySelectorAll('.result__block__btn')[0];
  resultBlockBtn.innerHTML = 'Начать заново';
  resultBlock.innerHTML = `Вы набрали ${resultBlockPoint} из 30 очков!`; 
}

function languageAppEn() {
  let navList = document.querySelectorAll('.nav__list')[0];
  navList.innerHTML = `<li class="nav__list__item">
  <a href="../index/index.html" class="nav__list__item__link">Main</a>
  </li>
  <li class="nav__list__item">
  <a href="../quiz/quiz.html" class="nav__list__item__link">Quiz</a>
  </li>
  <li class="nav__list__item">
  <a href="../gallery/gallery.html" class="nav__list__item__link">Gallery</a>
  </li>`;
  let resultBlockH2 = document.querySelectorAll('.result__block__h2')[0];
  resultBlockH2.innerHTML = 'Congratulations!';
  let resultBlockBtn = document.querySelectorAll('.result__block__btn')[0];
  resultBlockBtn.innerHTML = 'Start over';
  resultBlock.innerHTML = `You have scored ${resultBlockPoint} of 30 points!`;
  let resultBlock2 = document.querySelectorAll('.result__block__div')[1];
  resultBlock2.innerHTML = 'You have passed the game!' 
}

let changeLng = document.querySelectorAll('.lng__item');
let changeLngList = document.querySelectorAll('.header__lng__list')[0];
changeLngList.addEventListener('click', (e) => {
  if (!e.target.classList.contains('lng__item')) return false;
  if(e.target.classList.contains('lng-active')) return false;
  else if (e.target.innerHTML == 'RU') {
    for (let i = 0; i < changeLng.length; i++) {
      changeLng[i].classList.remove('lng-active');      
    }
    e.target.classList.add('lng-active');
    localStorage.setItem('CheakLanguageApp', 'RU');
    localStorage.setItem('LanguageAppList', changeLngList.innerHTML);
    languageAppRu()
  }
  else if (e.target.innerHTML == 'EN') {
    for (let i = 0; i < changeLng.length; i++) {
      changeLng[i].classList.remove('lng-active');      
    }
    e.target.classList.add('lng-active');
    localStorage.setItem('CheakLanguageApp', 'EN');
    localStorage.setItem('LanguageAppList', changeLngList.innerHTML);;
    languageAppEn();
  }
})
