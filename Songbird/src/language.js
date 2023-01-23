import birdsDataRu from './birds';
import birdsDataEn from './birds-en';

function languageApp() {
  let birdsData;
  let changeLngList = document.querySelectorAll('.header__lng__list')[0];
  if (localStorage.getItem('CheakLanguageApp') == null 
   || localStorage.getItem('CheakLanguageApp') == 'RU') {
    birdsData = birdsDataRu;
    if(localStorage.getItem('LanguageAppList') !== null){
      changeLngList.innerHTML = localStorage.getItem('LanguageAppList');
    }
    languageAppRu();
  }
  else {
    birdsData = birdsDataEn;
    changeLngList.innerHTML = localStorage.getItem('LanguageAppList');
    languageAppEn();
  };
  return birdsData;
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
  let infoList = document.querySelectorAll('.info__list')[0];
  infoList.innerHTML = `<li class="info__list__item">Разминка</li>
  <li class="info__list__item">Воробьиные</li>
  <li class="info__list__item">Лесные птицы</li>
  <li class="info__list__item">Певчие птицы</li>
  <li class="info__list__item">Хищные птицы</li>
  <li class="info__list__item">Морские птицы</li>`
  let infoName = document.querySelectorAll('.info-name')[0];
  infoName.innerHTML = `Счет:`;
  let quizAbout = document.querySelectorAll('.quiz__about__p')[0];
  quizAbout.innerHTML = 'Выберите вариант ответа';
  let nextBtn = document.querySelectorAll('.next-btn')[0];
  nextBtn.innerHTML = 'Следующий';
  let quizAboutDiv = document.querySelectorAll('.quiz__about__div')[0];
  quizAboutDiv.classList.add('active-about__div')
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
  let infoList = document.querySelectorAll('.info__list')[0];
  infoList.innerHTML = `<li class="info__list__item">Warm up</li>
  <li class="info__list__item">Passerines</li>
  <li class="info__list__item">Forest birds</li>
  <li class="info__list__item">Song birds</li>
  <li class="info__list__item">Predator birds</li>
  <li class="info__list__item">Sea birds</li>`;
  let infoName = document.querySelectorAll('.info-name')[0];
  infoName.innerHTML = `Score:`;
  let quizAbout = document.querySelectorAll('.quiz__about__p')[0];
  quizAbout.innerHTML = 'Select the answer';
  let nextBtn = document.querySelectorAll('.next-btn')[0];
  nextBtn.innerHTML = 'Next';
  let quizAboutDiv = document.querySelectorAll('.quiz__about__div')[0];
  quizAboutDiv.classList.add('active-about__div')
}



export {languageApp,languageAppRu,languageAppEn};