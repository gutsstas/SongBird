import audioPlay from '../assets/Pictures/play-button.svg';
let time;
function timerAudio(questionAudio,timer,i){
  time = setTimeout(audioTime,1000,questionAudio,timer,i);
  return time;
}
function clearTimer(time) {
  clearTimeout(time)
}

function audioTime(questionAudio,timer,i) {
  let audioScale = document.querySelectorAll('.audio-scale')[i];
  audioScale.value = Math.ceil(questionAudio.currentTime);
  let timeSec = Math.ceil(questionAudio.currentTime);
  let time = Math.floor(questionAudio.duration);
  let min = Math.floor(timeSec/60);
  let sec = timeSec - 60 * min;
  let startTime = document.querySelectorAll('.start__time')[i];
  startTime.innerHTML = (min > 9 ? min : "0" + min)
          + ":" + (sec > 9 ? sec : "0" + sec);
  if(time == timeSec || time == timeSec-1 || time == timeSec-2){
    let audioBtn = document.querySelectorAll('.audio__btn')[i];
    audioBtn.src = audioPlay;
    questionAudio.pause();
    questionAudio.currentTime = 0.0;

    setTimeout(() => {
      startTime.innerHTML = '00:00';
    }, 200);
    return false;
  }
}
export {timerAudio,clearTimer,audioTime};