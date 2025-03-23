let songindex = 0;
let audioElement = new Audio('../peace/new1.mp3');
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let songitems = Array.from(document.getElementsByClassName('songitem'));
let mastersongname = document.getElementById('mastersongname');
let previous = document.getElementById('previous');
let next = document.getElementById('next');
let albumCover = document.getElementById('album-cover');

let songs = [
    {songName: "Hey idi nenena", filePath: "../peace/new1.mp3", coverPath: "../covers/hey.png"},
    {songName: "Nuvvunte Naa Jathagaa", filePath: "../peace/new2.mp3", coverPath: "../covers/music.png"},
    {songName: "Aadinchi Ashta Chamma", filePath: "../peace/new3.mp3", coverPath: "../covers/nani.png"},
    {songName: "Unnatundi Gundey", filePath: "../peace/new4.mp3", coverPath: "../covers/thom.png"},
    {songName: "Em Sandeham Ledu", filePath: "../peace/new5.mp3", coverPath: "../covers/nag.png"},
    {songName: "Inthalo Ennenni Vinthalo", filePath: "../peace/new6.mp3", coverPath: "../covers/nik.png"},
];

songitems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Update master song name and album art
const updateSongInfo = () => {
    mastersongname.innerText = songs[songindex].songName;
    albumCover.src = songs[songindex].coverPath;
};

// Initialize first song info
updateSongInfo();

masterplay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('bx-play-circle');
        masterplay.classList.add('bx-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterplay.classList.remove('bx-pause-circle');
        masterplay.classList.add('bx-play-circle');
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    myprogressbar.value = progress;
});

myprogressbar.addEventListener('change', () => {
    audioElement.currentTime = myprogressbar.value * audioElement.duration / 100; 
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('bx-pause-circle');
        element.classList.add('bx-play-circle');
    });
};

Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('bx-play-circle');
        e.target.classList.add('bx-pause-circle');
        audioElement.src = songs[songindex].filePath;
        updateSongInfo();
        audioElement.currentTime = 0;
        audioElement.play();
        masterplay.classList.remove('bx-play-circle');
        masterplay.classList.add('bx-pause-circle');
        gif.style.opacity = 1;
    });
});

next.addEventListener('click', () => {
    if(songindex >= songs.length - 1) {
        songindex = 0;
    }
    else {
        songindex += 1;
    }
    audioElement.src = songs[songindex].filePath;
    updateSongInfo();
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('bx-play-circle');
    masterplay.classList.add('bx-pause-circle');
    gif.style.opacity = 1;
});

previous.addEventListener('click', () => {
    if(songindex <= 0) {
        songindex = songs.length - 1;
    }
    else {
        songindex -= 1;
    }
    audioElement.src = songs[songindex].filePath;
    updateSongInfo();
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('bx-play-circle');
    masterplay.classList.add('bx-pause-circle');
    gif.style.opacity = 1;
});