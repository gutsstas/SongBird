import TrueAnswer from '../assets/Sounds/TrueAnswer.mp3';
import FalseAnswer from '../assets/Sounds/FalseAnswer.mp3';
import birdsDataRu from './birds';
import birdsDataEn from './birds-en';
import audioPlay from '../assets/Pictures/play-button.svg';
import iconVolumeImg from '../assets/Pictures/volume.svg'
import {clearTimer} from './timer';

function selectAnswer(e,currentIndex,randomIndex,point,questionAudio,timer,timerId){
  let birdsData;
  if (localStorage.getItem('CheakLanguageApp') == null 
   || localStorage.getItem('CheakLanguageApp') == 'RU') {
    birdsData = birdsDataRu;
  }
  else {
    birdsData = birdsDataEn;
  }
  let trueAudio = new Audio(TrueAnswer);
  let falseAudio = new Audio(FalseAnswer);
  if(e.target.className == 'quiz__list') return false;
  let listItem = document.querySelectorAll('.quiz__list__item');
  let findTrue = false;
  for (let i = 0; i < listItem.length; i++) {
    if(listItem[i].classList.contains('item-true')) {
      findTrue = true;
      break;
    };
  }
  if(!findTrue){
    falseAudio.pause();
    falseAudio.currentTime = 0.0;
    if (e.target.innerHTML == birdsData[currentIndex][randomIndex].name){
      e.target.classList.add('item-true'); 
      let nextBtn = document.querySelectorAll('.next-btn')[0];
      nextBtn.classList.add('active-next-btn');
      trueAudio.play();
      let audioBtn = document.querySelectorAll('.audio__btn')[0];
      audioBtn.src = audioPlay;
      audioBtn.classList.add('play-audio');
      questionAudio.pause();
      clearTimer(timer);
      clearTimer(timerId);
      if(point <= 0) point = 0
      let questionImg = document.querySelectorAll('.question__img')[0];
      questionImg.src = birdsData[currentIndex][randomIndex].image;
      let questionName = document.querySelectorAll('.block-info__name')[0];
      questionName.innerHTML = birdsData[currentIndex][randomIndex].name;
    }
    else if (!e.target.classList.contains('item-false')){
      e.target.classList.add('item-false');
      falseAudio.play();
      point--;
    }
  }

  let questionAudioInfo = new Audio();
  let blockInfo = document.querySelectorAll('.quiz__about__div')[0];
  let imgInfo = document.querySelectorAll('.about__img')[0];
  let nameInfo = document.querySelectorAll('.about__block-info__name')[0];
  let typeInfo = document.querySelectorAll('.about__block-info__type')[0];
  let textInfo = document.querySelectorAll('.quiz__about__p')[0];

  blockInfo.classList.remove('active-about__div');
  for (let i = 0; i < birdsData[currentIndex].length; i++) {
    if(e.target.innerHTML == birdsData[currentIndex][i].name){
      questionAudioInfo.src = birdsData[currentIndex][i].audio;
      let audioBtnInfo = document.querySelectorAll('.audio__btn-info')[0];
      audioBtnInfo.src = audioPlay;
      audioBtnInfo.classList.add('play-audio');
      let iconVolume = document.querySelectorAll('.icon-volume-info')[0];
      iconVolume.src = iconVolumeImg;
      nameInfo.innerHTML = birdsData[currentIndex][i].name;
      typeInfo.innerHTML = birdsData[currentIndex][i].species;
      textInfo.innerHTML = birdsData[currentIndex][i].description;
      imgInfo.src = birdsData[currentIndex][i].image;
      questionAudioInfo.addEventListener('loadeddata', () => {
        let audioVolume = document.querySelectorAll('.audio-volume-info')[0];
        questionAudioInfo.volume = audioVolume.value;
        let audioScaleInfo = document.querySelectorAll('.audio-scale')[1];
        audioScaleInfo.max = Math.floor(questionAudioInfo.duration);
        audioScaleInfo.value = 0;
        let startTime = document.querySelectorAll('.start__time')[1];
        startTime.innerHTML = '00:00';
        let finishTime = document.querySelectorAll('.finish__time')[1];
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


  return [point,questionAudioInfo];
}

export default selectAnswer;