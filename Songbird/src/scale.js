let audioVolume = document.querySelectorAll('.audio-volume')[0];
let audioVolumeInfo = document.querySelectorAll('.audio-volume-info')[0];
let imgVolume = document.querySelectorAll('.icon-volume')[0];
imgVolume.addEventListener("mouseover", () => {
  audioVolume.classList.remove('volume-none')
})
imgVolume.addEventListener("mouseout", () => {
  audioVolume.classList.add('volume-none')
})
audioVolume.addEventListener("mouseover", () => {
  audioVolume.classList.remove('volume-none')
})
audioVolume.addEventListener("mouseout", () => {
  audioVolume.classList.add('volume-none')
})

let imgVolumeInfo = document.querySelectorAll('.icon-volume-info')[0];
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