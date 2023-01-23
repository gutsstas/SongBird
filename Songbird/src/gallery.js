import './style/gallery.css';
// import './scale.js';
import logo from '../assets/Pictures/logoRS.svg';
import audioPlay from '../assets/Pictures/play-button.svg';
import audioPause from '../assets/Pictures/pause-button.svg';
import iconVolumeImg from '../assets/Pictures/volume.svg';
import questionPicture from '../assets/Pictures/Bird-1.jpeg';
import {audioTime} from './timer';

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
  let quizAbout = document.querySelectorAll('.quiz__about__p')[0];
  quizAbout.innerHTML = 'Выберите птицу';
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
  let quizAbout = document.querySelectorAll('.quiz__about__p')[0];
  quizAbout.innerHTML = 'Select the bird';
}

let birdsData = languageApp();
listBird(birdsData);

let questionImg = document.querySelectorAll('.about__img')[0];
questionImg.src = questionPicture;
let logoImg = document.querySelectorAll('.link-rs__img')[0];
logoImg.src = logo;
let list = document.querySelectorAll('.gallery__list')[0];
let iconVolume = document.querySelectorAll('.icon-volume-info')[0];
iconVolume.src = iconVolumeImg;

function listBird() {
  let birdsData = languageApp();
  let list = document.querySelectorAll('.gallery__list')[0];
  list.innerHTML = '';
  for (let i = 0; i < birdsData.length; i++) {
    for (let j = 0; j < birdsData[i].length; j++) {
      let item = document.createElement('li');
      item.classList.add('gallery__list__item');
      item.innerHTML = birdsData[i][j].name;
      list.append(item)    
    }  
  }
}



let questionAudioInfo = new Audio();
let imgInfo = document.querySelectorAll('.about__img')[0];
let nameInfo = document.querySelectorAll('.about__block-info__name')[0];
let typeInfo = document.querySelectorAll('.about__block-info__type')[0];
let textInfo = document.querySelectorAll('.quiz__about__p')[0];
let audioBtnInfo = document.querySelectorAll('.audio__btn')[0];
audioBtnInfo.src = audioPlay;

list.addEventListener('click', (e) => {
  if(!e.target.classList.contains('gallery__list__item')) return false;
  let birdsData = languageApp();
  for (let i = 0; i < birdsData.length; i++) {
    for (let j = 0; j < birdsData[i].length; j++) {
    if(e.target.innerHTML == birdsData[i][j].name){
      let quizAbout = document.querySelectorAll('.quiz__about__div')[0];
      quizAbout.classList.remove('active-about__div');
        questionAudioInfo.src = birdsData[i][j].audio;
        let audioBtnInfo = document.querySelectorAll('.audio__btn')[0];
        audioBtnInfo.src = audioPlay;
        if(!audioBtnInfo.classList.contains('play-audio')) audioBtnInfo.classList.add('play-audio');
        nameInfo.innerHTML = birdsData[i][j].name;
        typeInfo.innerHTML = birdsData[i][j].species;
        textInfo.innerHTML = birdsData[i][j].description;
        imgInfo.src = birdsData[i][j].image;
        questionAudioInfo.addEventListener('loadeddata', () => {
          let audioVolume = document.querySelectorAll('.audio-volume-info')[0];
          questionAudioInfo.volume = audioVolume.value;
          let audioScaleInfo = document.querySelectorAll('.audio-scale')[0];
          audioScaleInfo.max = Math.floor(questionAudioInfo.duration);
          audioScaleInfo.value = 0;
          let startTime = document.querySelectorAll('.start__time')[0];
          startTime.innerHTML = '00:00';
          let finishTime = document.querySelectorAll('.finish__time')[0];
          let timeSec = Math.floor(+questionAudioInfo.duration);
          let min = Math.floor(timeSec/60);
          let sec = timeSec - min * 60;
          min > 9 ? min : min = '0' + min;
          sec > 9 ? sec : sec = '0' + sec;
          finishTime.innerHTML = `${min}:${sec}`;
        })
        break;
      }  
    }   
  }
})

let timerInfo;
let timerId;
let audioBlockInfo = document.querySelectorAll('.audio__circle')[0];
audioBlockInfo.addEventListener('click', async () => {
  let audioBtnInfo = document.querySelectorAll('.audio__btn')[0];
if(audioBtnInfo.classList.contains('play-audio')) {
  audioBtnInfo.classList.remove('play-audio')
  audioBtnInfo.src = audioPause;
  questionAudioInfo.play();
  audioTime(questionAudioInfo,timerInfo,0)
  timerInfo = setTimeout(function tick() {
    audioTime(questionAudioInfo,timerInfo,0);
    timerInfo = setTimeout(tick, 1000); // (*)
  }, 1000);
  timerId = setTimeout(() => {
    clearTimeout(timerInfo);
    audioBtnInfo.classList.add('play-audio');
  }, ((questionAudioInfo.duration - questionAudioInfo.currentTime) * 1000));
}
else {
  audioBtnInfo.classList.add('play-audio');
  audioBtnInfo.src = audioPlay;
  questionAudioInfo.pause();
  clearTimeout(timerId);
  clearTimeout(timerInfo);
}
})

let imgVolumeInfo = document.querySelectorAll('.icon-volume-info')[0];
let audioVolumeInfo = document.querySelectorAll('.audio-volume-info')[0];
imgVolumeInfo.addEventListener("mouseover", () => {
  audioVolumeInfo.classList.remove('volume-none')
})
imgVolumeInfo.addEventListener("mouseout", () => {
  audioVolumeInfo.classList.add('volume-none')
})
audioVolumeInfo.addEventListener("mouseover", () => {
  audioVolumeInfo.classList.remove('volume-none')
})
audioVolumeInfo.addEventListener("mouseout", () => {
  audioVolumeInfo.classList.add('volume-none')
})

audioVolumeInfo.addEventListener("input", () => {
  questionAudioInfo.volume = audioVolumeInfo.value;
})

let audioScale = document.querySelectorAll('.audio-scale')[0];
audioScale.addEventListener("input", () => {
  let min = Math.floor(audioScale.value / 60);
  let sec = audioScale.value - min * 60;
  let startTime = document.querySelectorAll('.start__time')[0];
  startTime.innerHTML = (min > 9 ? min : "0" + min)
          + ":" + (sec > 9 ? sec : "0" + sec);
})
audioScale.addEventListener("mousedown", () => {
  clearTimeout(timerId);
  clearTimeout(timerInfo);
})
audioScale.addEventListener("mouseup", () => {
  audioScale.max = Math.ceil(questionAudioInfo.duration);
  questionAudioInfo.currentTime = audioScale.value;
  audioTime(questionAudioInfo,timerInfo,0);
  if(audioScale.value >= audioScale.max || Math.ceil(audioScale.value) + 1 == audioScale.max) {
    clearTimeout(timerId);
    clearTimeout(timerInfo);
    audioBtnInfo.classList.add('play-audio');
    audioScale.value = 0;
    return false;
  }
  timerInfo = setTimeout(function tick() {
    audioTime(questionAudioInfo,timerInfo,0);
    timerInfo = setTimeout(tick, 1000); // (*)
  }, 1000);
  timerId = setTimeout(() => {
    clearTimeout(timerInfo);
    audioBtnInfo.classList.add('play-audio');
    audioScale.value = 0;
  }, ((questionAudioInfo.duration - questionAudioInfo.currentTime) * 1000));

})


let changeLngList = document.querySelectorAll('.header__lng__list')[0];
changeLngList.addEventListener('click', (e) => {
  let changeLng = document.querySelectorAll('.lng__item');
  if (!e.target.classList.contains('lng__item')) return false;
  if(e.target.classList.contains('lng-active')) return false;
  else if (e.target.innerHTML == 'RU') {
    for (let i = 0; i < changeLng.length; i++) {
      changeLng[i].classList.remove('lng-active');      
    }
    e.target.classList.add('lng-active');
    localStorage.setItem('CheakLanguageApp', 'RU');
    localStorage.setItem('LanguageAppList', document.querySelectorAll('.header__lng__list')[0].innerHTML);
    languageAppRu();
    listBird();
    document.querySelectorAll('.quiz__about__div')[0].classList.add('active-about__div');
  }
  else if (e.target.innerHTML == 'EN') {
    for (let i = 0; i < changeLng.length; i++) {
      changeLng[i].classList.remove('lng-active');      
    }
    e.target.classList.add('lng-active');
    localStorage.setItem('CheakLanguageApp', 'EN');
    localStorage.setItem('LanguageAppList', changeLngList.innerHTML);
    languageAppEn();
    listBird();
    document.querySelectorAll('.quiz__about__div')[0].classList.add('active-about__div');
  }
})