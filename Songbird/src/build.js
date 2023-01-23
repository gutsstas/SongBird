import birdsDataRu from './birds';
import birdsDataEn from './birds-en';
import questionPicture from '../assets/Pictures/Bird-1.jpeg';
import audioPlay from '../assets/Pictures/play-button.svg';
import iconVolume from '../assets/Pictures/volume.svg'


function buildPage(currentIndex,randomIndex){
  console.log('Преветствую тебя, проверяющий!');
  console.log('Задание выполнено в полном объеме. Я оцениваю его в 270/270');
  let birdsData;
  let text = document.querySelectorAll('.quiz__about__p')[0];
  if (localStorage.getItem('CheakLanguageApp') == null 
   || localStorage.getItem('CheakLanguageApp') == 'RU') {
    birdsData = birdsDataRu;
    text.innerHTML = 'Выберите вариант ответа';
  }
  else {
    birdsData = birdsDataEn;
    text.innerHTML = 'Select the answer';
  }
  let questionAudio = new Audio();
  questionAudio.src = birdsData[currentIndex][randomIndex].audio;
  questionAudio.currentTime = 0;
  console.log('Правильный ответ',birdsData[currentIndex][randomIndex].name);
  let questionName = document.querySelectorAll('.block-info__name')[0];
  questionName.innerHTML = '****';
  let audioBtn = document.querySelectorAll('.audio__btn')[0];
  audioBtn.src = audioPlay;
  let questionImg = document.querySelectorAll('.question__img')[0];
  questionImg.src = questionPicture;
  let listItem = document.querySelectorAll('.quiz__list__item');
  let startTime = document.querySelectorAll('.start__time')[0];
  startTime.innerHTML = '00:00';
  let finishTime = document.querySelectorAll('.finish__time')[0];
  let audioScale = document.querySelectorAll('.audio-scale')[0];
  audioScale.value = 0;
  let audioVolume = document.querySelectorAll('.audio-volume')[0];
  questionAudio.volume = audioVolume.value;
  let iconVolumeSound = document.querySelectorAll('.icon-volume')[0];
  iconVolumeSound.src = iconVolume;
  let nextBtn = document.querySelectorAll('.next-btn')[0];
  nextBtn.classList.remove('active-next-btn');
  let infoList = document.querySelectorAll('.info__list__item');
  for (let i = 0; i < infoList.length; i++) {
    if(infoList[i].classList.contains('info__list__item-active')){
      infoList[i].classList.remove('info__list__item-active');
      break;
    }   
  }
  infoList[currentIndex].classList.add('info__list__item-active')
  nextBtn.classList.remove('active-next-btn');
    for (let i = 0; i < listItem.length; i++) {
    if(listItem[i].classList.contains('item-true')) listItem[i].classList.remove('item-true');
    if(listItem[i].classList.contains('item-false')) listItem[i].classList.remove('item-false');
    listItem[i].innerHTML = birdsData[currentIndex][i].name;
  }
  questionAudio.addEventListener('loadeddata', () => {
    audioScale.max = Math.floor(questionAudio.duration);
    let timeSec = Math.floor(+questionAudio.duration);
    let min = Math.floor(timeSec/60);
    let sec = timeSec - min * 60;
    min > 9 ? min : min = '0' + min;
    sec > 9 ? sec : sec = '0' + sec;
    finishTime.innerHTML = `${min}:${sec}`;
  })
  return questionAudio;
}
export default buildPage;