import './style/index.css';
import logo from '../assets/Pictures/logoRS.svg';
import startImage from '../assets/Pictures/bird-2.jpeg';

let logoImg = document.querySelectorAll('.link-rs__img')[0];
logoImg.src = logo;
let StartImg = document.querySelectorAll('.start__img')[0];
StartImg.src = startImage;
let StartBtn = document.querySelectorAll('.start__btn')[0];
StartBtn.addEventListener('click', () => {
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
  }
  else {
    changeLngList.innerHTML = localStorage.getItem('LanguageAppList');
    languageAppEn();
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
  let startH3 = document.querySelectorAll('.start__h3')[0];
  startH3.innerHTML = 'Хочешь знать';
  let startH2 = document.querySelectorAll('.start__h2')[0];
  startH2.innerHTML = 'Кто чирикает?';
  let startBtn = document.querySelectorAll('.start__btn')[0];
  startBtn.innerHTML = 'Начать игру';
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
  let startH3 = document.querySelectorAll('.start__h3')[0];
  startH3.innerHTML = 'Want to know';
  let startH2 = document.querySelectorAll('.start__h2')[0];
  startH2.innerHTML = `Who's chirping?`;
  let startBtn = document.querySelectorAll('.start__btn')[0];
  startBtn.innerHTML = 'Start Game';
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