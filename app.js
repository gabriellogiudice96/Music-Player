const audio = document.querySelector("audio");
const title = document.querySelector("h1");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const time = document.getElementById("time");
const audiotime = document.getElementById("audiotime");
const progressContainer = document.querySelector(".progress_container");
const progress = document.getElementById("progress");
const album_cover = document.getElementById("album_cover"); 
const songs = ["Back to the future burn the book", "Hans Zimmer-One Day", "Conquest of Paradise", "District 9 Exosuit"];
const defaultVolume = 0.5;
const defaultAlbumCover = "images/gg.jpg"; 
const volumeControl = document.getElementById("Volume");

let audioIndex = 0;

loadAudio(songs[audioIndex]);

function loadAudio(song) {
  title.textContent = song;
  audio.src = `audio/${song}.mp3`;

  const albumCoverSrc = `images/${song}.jpg`;

  // ver si hay caratula alternativa
  fetch(albumCoverSrc)
    .then(response => {
      if (!response.ok) {
        throw new Error("Album cover not found");
      }
      return response;
    })
    .then(() => {
      album_cover.src = albumCoverSrc;
    })
    .catch(() => {
      album_cover.src = defaultAlbumCover;
    });

  audio.addEventListener("loadedmetadata", () => {
    timeSong(audio.duration, audiotime);
  });
}



function playSong() {
  play.classList.add("play");

  const icon = play.querySelector("i.fas");
  icon.classList.remove("fa-play");
  icon.classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  play.classList.remove("play");

  const icon = play.querySelector("i.fas");
  icon.classList.remove("fa-pause");
  icon.classList.add("fa-play");

  audio.pause();
}

function prevSong() {
  audioIndex--;

  if (audioIndex < 0) {
    audioIndex = songs.length - 1;
  }

  loadAudio(songs[audioIndex]);
  playSong();
}

function nextSong() {
  audioIndex++;

  if (audioIndex > songs.length - 1) {
    audioIndex = 0;
  }

  loadAudio(songs[audioIndex]);
  playSong();
}

function updateBarPorgress(e) {
  const { duration, currentTime } = e.srcElement;

  const progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickPosition = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickPosition / width) * duration;
}

function timeSong(audio, element) {
  const totalSeconds = Math.round(audio);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  element.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

play.addEventListener("click", () => {
  const isPlaying = play.classList.contains("play");

  if (!isPlaying) {
    playSong();
  } else {
    pauseSong();
  }
});

prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", (e) => {
  updateBarPorgress(e);
  timeSong(audio.currentTime, time);
});

progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);


volumeControl.addEventListener("input", function() {
  let volume = parseFloat(this.value)/parseFloat(this.max);
  

  audio.volume = volume;
});

audio.volume = defaultVolume;
volumeControl.value = defaultVolume;



/*caratula*/
function loadAudio(song) {
    title.textContent = song;
    audio.src = `audio/${song}.mp3`;
    album_cover.src = `images/${song}.jpg`; 
  
    audio.addEventListener("loadedmetadata", () => {
      timeSong(audio.duration, audiotime);
    });
  }
  

