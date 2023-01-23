import './style/style.css';
import './scale.js';
import {languageApp,languageAppRu,languageAppEn} from './language.js';
import audioPlay from '../assets/Pictures/play-button.svg';
import audioPause from '../assets/Pictures/pause-button.svg';
import buildPage from './build';
import selectAnswer from './select';
import {clearTimer,audioTime} from './timer';
import logo from '../assets/Pictures/logoRS.svg';


let questionAudio;
let questionAudioInfo;
let currentIndex = 0;
let randomIndex = Math.floor(Math.random() * 6);
let point = 5;
let pointTrue;
let birdsData = languageApp(currentIndex,randomIndex);

questionAudio = buildPage(currentIndex,randomIndex);

let logoImg = document.querySelectorAll('.link-rs__img')[0];
logoImg.src = logo;
let audioBlock = document.querySelectorAll('.audio__circle')[0];

let timer;
let timerId;
audioBlock.addEventListener('click', () => {
  let audioBtn = document.querySelectorAll('.audio__btn')[0];
  if(audioBtn.classList.contains('play-audio')) {
    audioBtn.classList.remove('play-audio');
    audioBtn.src = audioPause;
    questionAudio.play();
    // timer = timerAudio(questionAudio,timer,0);//
    audioTime(questionAudio,timer,0)
    timer = setTimeout(function tick() {
      audioTime(questionAudio,timer,0);
      timer = setTimeout(tick, 1000); // (*)
    }, 1000);
    timerId = setTimeout(() => {
      clearTimeout(timer);
      audioBtn.classList.add('play-audio');
    }, ((questionAudio.duration - questionAudio.currentTime) * 1000));
  }
  else {
    audioBtn.classList.add('play-audio');
    audioBtn.src = audioPlay;
    questionAudio.pause();
    clearTimer(timer);
    clearTimer(timerId);
  }
})

let timerInfo;
let timerInfoId;
let audioBlockInfo = document.querySelectorAll('.audio__circle')[1];
audioBlockInfo.addEventListener('click', () => {
  let audioBtnInfo = document.querySelectorAll('.audio__btn-info')[0];
if(audioBtnInfo.classList.contains('play-audio')) {
  audioBtnInfo.classList.remove('play-audio');
  audioBtnInfo.src = audioPause;
  questionAudioInfo.play();
  audioTime(questionAudioInfo,timerInfo,1)
  timerInfo = setTimeout(function tick() {
    audioTime(questionAudioInfo,timerInfo,1);
    timerInfo = setTimeout(tick, 1000); // (*)
  }, 1000);
  timerInfoId = setTimeout(() => {
    clearTimeout(timerInfoId);
    audioBtnInfo.classList.add('play-audio');
  }, ((questionAudioInfo.duration - questionAudioInfo.currentTime) * 1000));
}
else {
  audioBtnInfo.src = audioPlay;
  audioBtnInfo.classList.add('play-audio')
  questionAudioInfo.pause();
  clearTimer(timerInfo);
  clearTimer(timerInfoId);
}
})

let list = document.querySelectorAll('.quiz__list')[0];

list.addEventListener('click', (e) => {
  if(!e.target.classList.contains('quiz__list__item')) return false;
  point = selectAnswer(e,currentIndex,randomIndex,point,questionAudio,timer,timerId)[0];
  pointTrue = point;
  if(questionAudioInfo !== undefined){
    questionAudioInfo.pause();
    questionAudioInfo.currentTime = 0;
    clearTimer(timerInfo);
    clearTimer(timerInfoId);
  }
  questionAudioInfo = selectAnswer(e,currentIndex,randomIndex,point,questionAudio,timer,timerId)[1];
});

let audioScale = document.querySelectorAll('.audio-scale')[0];
audioScale.addEventListener("input", () => {
  let min = Math.floor(audioScale.value / 60);
  let sec = audioScale.value - min * 60;
  let startTime = document.querySelectorAll('.start__time')[0];
  startTime.innerHTML = (min > 9 ? min : "0" + min)
          + ":" + (sec > 9 ? sec : "0" + sec);
})
audioScale.addEventListener("mousedown", () => {
  clearTimeout(timer);
  clearTimeout(timerId);
})
audioScale.addEventListener("mouseup", () => {
  audioScale.max = Math.ceil(questionAudio.duration);
  questionAudio.currentTime = audioScale.value;
  audioTime(questionAudio,timer,0)
  if(audioScale.value >= audioScale.max || Math.ceil(audioScale.value) + 1 == audioScale.max) {
    clearTimeout(timer);
    clearTimeout(timerId);
    document.querySelectorAll('.audio__btn')[0].classList.add('play-audio')
    audioScale.value = 0;
    return false;
  }
  timer = setTimeout(function tick() {
    audioTime(questionAudio,timer,0);
    timer = setTimeout(tick, 1000); // (*)
  }, 1000);
  timerId = setTimeout(() => {
    clearTimeout(timer);
    let audioBtn = document.querySelectorAll('.audio__btn')[0];
    audioBtn.classList.add('play-audio')
    audioScale.value = 0;
  }, ((questionAudio.duration - questionAudio.currentTime) * 1000));

})

let audioScaleInfo = document.querySelectorAll('.audio-scale')[1];
audioScaleInfo.addEventListener("input", () => {
  let min = Math.floor(audioScaleInfo.value / 60);
  let sec = audioScaleInfo.value - min * 60;
  let startTime = document.querySelectorAll('.start__time')[1];
  startTime.innerHTML = (min > 9 ? min : "0" + min)
          + ":" + (sec > 9 ? sec : "0" + sec);
})

audioScaleInfo.addEventListener("mousedown", () => {
  clearTimer(timerInfo);
  clearTimer(timerInfoId);
})

audioScaleInfo.addEventListener("mouseup", () => {
  let audioBtnInfo = document.querySelectorAll('.audio__btn-info')[0];
  audioScaleInfo.max = Math.ceil(questionAudioInfo.duration);
  questionAudioInfo.currentTime = audioScaleInfo.value;
  audioTime(questionAudioInfo,timerInfo,1);
  if(audioScaleInfo.value >= audioScaleInfo.max || Math.ceil(audioScaleInfo.value) + 1 == audioScaleInfo.max) {
    clearTimeout(timerInfo);
    clearTimeout(timerInfoId);
    audioBtnInfo.classList.add('play-audio');
    audioScaleInfo.value = 0;
    return false;
  }
  timerInfo = setTimeout(function tick() {
    audioTime(questionAudioInfo,timerInfo,1);
    timerInfo = setTimeout(tick, 1000); // (*)
  }, 1000);
  timerInfoId = setTimeout(() => {
    clearTimeout(timerInfo);
    audioBtnInfo.classList.add('play-audio');
    audioScaleInfo.value = 0;
  }, ((questionAudioInfo.duration - questionAudioInfo.currentTime-0.2) * 1000));
})

let next = document.querySelectorAll('.next-btn')[0];
next.addEventListener('click', () => {
  if(!next.classList.contains('active-next-btn')) return false;
  if(birdsData.length == currentIndex + 1) {
    let score = document.querySelectorAll('.info__score')[0];
    score.innerHTML = +score.innerHTML + pointTrue;
    point = 5
    localStorage.setItem('resultBlockPoint', score.innerHTML)
    window.location.href = '../result/result.html';
    return false;
  };
  let blockInfo = document.querySelectorAll('.quiz__about__div')[0];
  blockInfo.classList.add('active-about__div')
  currentIndex++;
  questionAudio.pause();
  questionAudio.currentTime = 0;
  audioScale.value = 0;
  clearTimer(timer);
  clearTimer(timerId);
  randomIndex = Math.floor(Math.random() * 6);
  questionAudio = buildPage(currentIndex,randomIndex);
  questionAudioInfo.pause();
  questionAudioInfo.currentTime = 0;
  clearTimer(timerInfo);
  clearTimer(timerInfoId);
  let audioBtnInfo = document.querySelectorAll('.audio__btn-info')[0];
  audioBtnInfo.classList.add('play-audio');
  let audioBtn = document.querySelectorAll('.audio__btn')[0];
  audioBtn.classList.add('play-audio');
  let score = document.querySelectorAll('.info__score')[0];
  score.innerHTML = +score.innerHTML + pointTrue;
  point = 5
})

let audioVolume = document.querySelectorAll('.audio-volume')[0];
audioVolume.addEventListener("input", () => {
  questionAudio.volume = audioVolume.value;
})

let audioVolumeInfo = document.querySelectorAll('.audio-volume-info')[0];
audioVolumeInfo.addEventListener("input", () => {
  questionAudioInfo.volume = audioVolumeInfo.value;
})

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
    buildPage(currentIndex,randomIndex);
    languageAppRu()
  }
  else if (e.target.innerHTML == 'EN') {
    for (let i = 0; i < changeLng.length; i++) {
      changeLng[i].classList.remove('lng-active');      
    }
    e.target.classList.add('lng-active');
    localStorage.setItem('CheakLanguageApp', 'EN');
    localStorage.setItem('LanguageAppList', changeLngList.innerHTML);
    buildPage(currentIndex,randomIndex);
    languageAppEn();
  }
})




