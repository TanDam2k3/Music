var listMusic = [
    {
        id: 1,
        name: "Iu là đây",
        path: "./MUSIC/1/iu-la-day-SEAN x MUỘII x ANFANG.mp3",
        img: "./MUSIC/1/iu-la-day.jpg",
        album: "",
        author: "SEAN x MUỘII"
    },
    {
        id: 2,
        name: "Đường tôi chở em về",
        path: "./MUSIC/2/duong-toi-cho-em-ve-buitruonglinh.mp3",
        img: "./MUSIC/2/duong-toi-cho-em-ve.jpg",
        album:"",
        author: "buitruonglinh"
    },
    {
        id: 3,
        name: "I'm still alive today",
        path: "./MUSIC/3/Im still alive today.mp3",
        img: "./MUSIC/3/Eiko-Tsukimi.jpg",
        album:"",
        author: "Kuroneko"
    },
    {
        id: 4,
        name: "Để anh một mình",
        path: "./MUSIC/4/de-anh-mot-minh.mp3",
        img: "./MUSIC/4/de-anh-mot-minh.jpg",
        album: "",
        author: "Rhyder"
    },
    {
        id: 5,
        name: "Em thích",
        path: "./MUSIC/5/em-thich-SEANx@LuaOfficialMusic.mp3",
        img: "./MUSIC/5/em-thich.jpg",
        album: "",
        author: "SEAN x @LuaOfficialMusic"
    },
    {
        id: 6,
        name: "Ngày đầu tiên",
        path: "./MUSIC/6/ngay-dau-tien-duc-phuc.mp3",
        img: "./MUSIC/6/ngay-dau-tien-duc-phuc.jpg",
        album: "",
        author: "Đức Phúc"
    },
    {
        id: 7,
        name: "Chúng ta của hiện tại",
        path: "./MUSIC/7/chung-ta-cua-hien-tai NGHIIA COVER.mp3",
        img: "./MUSIC/7/chung-ta-cua-hien-tai.jpg",
        album: "",
        author: "NGHIIA COVER"
    },
    {
        id: 8,
        name: "11 giờ 11 phút",
        path: "./MUSIC/8/11h-11p-MiiNa x RIN9 x DREAMeR.mp3",
        img: "./MUSIC/8/11h-11p.jpg",
        album: "",
        author: "MiiNa x RIN9 x DREAMeR"
    },
    {
        id: 9,
        name: "Lời yêu ngây dại",
        path: "./MUSIC/9/loi-yeu-ngay-dai-Kha.mp3",
        img: "./MUSIC/9/loi-yeu-ngay-dai.jpg",
        album: "",
        author: "Kha"
    },
    {
        id: 10,
        name: "Răng khôn",
        path: "./MUSIC/10/Rang-khon-PHI-PHUONG-ANH-ft-RIN9.mp3",
        img: "./MUSIC/10/rang-khon.jpg",
        album: "",
        author: "PHI PHUONG ANH ft. RIN9"
    }
    
]

function getMusic() {
    var fullListMusic = "";
    listMusic.forEach(
        function(music){
            fullListMusic += `   
                <div class="music-item" id="${music.id}" onclick="getPath(${music.id})">
                    <div class="col-5">
                        <div class="music">
                            <div class="img-music">
                                <img src="${music.img}" alt="" class="img-one-music">
                                <i class="bi bi-play-fill play-icon"></i>
                            </div>
                            <div class="info-music">
                                <b>${music.name}</b>
                                <div class="title">${music.author}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-5">${music.album}</div>
                    <div class="col-2" id="time-music-${music.id}"></div>
                    <audio id="music${music.id}" src="${music.path}"></audio>
                </div>
            `;
            return fullListMusic;
        }
    );
    document.getElementById("list-music").innerHTML = fullListMusic;
    getTimeMusic();
}

// Lấy thời gian bài hát
function getTimeMusic(){
    listMusic.forEach(
        function(music){
            var timeMusic = document.getElementById("time-music-"+music.id);
            var pathMusic = music.path;
            
            var audio = new Audio(pathMusic);
            audio.addEventListener('loadedmetadata', function() {
                timeMusic.innerHTML = formatTime(audio.duration);
            });
        }
    )
}
function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);
    var formattedTime = (minutes < 10 ? '0' : '') + minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
    return formattedTime;
}

// Xử lí ảnh bên dưới
function handelImgBottom(id){
    var leftBottom = document.querySelector(".left-bottom");
    listMusic.forEach(
        (music) => {
            if(music.id == id){
                leftBottom.innerHTML = `
                <div class="music">
                    <div class="img-music">
                        <img src="${music.img}" alt="" class="img-one-music">
                    </div>
                    <div class="info-music">
                        <b class="name-music">${music.name}</b>
                        <div class="title">${music.author}</div>
                    </div>
                </div>
                `;
            }
        }
    );
}

// Dừng tất cả các bản nhạc bật trước đó
function stopMusic(pathSrc) {
    const audioElements = document.querySelectorAll("audio");
    audioElements.forEach((audio) => {
        if(audio.src != pathSrc) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
}

// Lấy đường dẫn
var toPath = "";
var idMusic = "";
var dem = false;
function getPath(id) {
    var path = document.getElementById("music"+id);
    toPath = path;
    if(idMusic == id) PlayMusic();
    else if(idMusic != id && dem != false) handlePlayMusic();
    idMusic = id;
    dem = true;
    eventMusic();
    stopMusic(toPath.src);
    handleTimeMusicLast();
    handelImgBottom(idMusic);
}

// Xử lí thanh thời gian
var timeProgress = document.querySelector("progress");
function handleTimeMusicLast() {
    var audio = new Audio(toPath.src);
    audio.addEventListener("loadedmetadata", function() {
        document.querySelector("#timeLast").innerHTML = formatTime(toPath.duration);
        timeProgress.setAttribute("max", toPath.duration);
    });
}
timeProgress.addEventListener("click",function(e){
    var result = (e.clientX-timeProgress.getBoundingClientRect().left) / timeProgress.offsetWidth *100;
    var valueTime = (timeProgress.max*result)/100;
    timeProgress.setAttribute("value", valueTime);
    toPath.currentTime = valueTime;
})
function handleTimeMusicFirst(){
    toPath.addEventListener("timeupdate", function(){
        document.querySelector("#timeFirst").innerHTML = formatTime(toPath.currentTime);
        timeProgress.setAttribute("value", toPath.currentTime);
    });
}

// xử lí việc khi bấm vào để chạy
function handlePlayMusic(){
    eventPlayMusic(toPath);
}

// Xử lí khi bấm vào để dừng
function handlePauseMusic(){
    eventPauseMusic(toPath);
}

// Sự kiện
    var playMusic = document.getElementById("play");
    var pauseMusic = document.getElementById("pause");
function eventPlayMusic(eventPlay){
    playMusic.style.display = "none";
    pauseMusic.style.display = "block";
    pauseMessage();
    eventPlay.play();
}

function eventPauseMusic(eventPause){
    playMusic.style.display = "block";
    pauseMusic.style.display = "none";
    playee.innerHTML = '<img src="./IMG/lofi.jpg" alt="Lofi" class="img-lofi"><i class="bi bi-play-circle play-icon"></i>';
    playe.innerHTML = '<i class="bi bi-play-fill" style="margin-right: 8px;"></i>TIẾP TỤC PHÁT';
    eventPause.pause();
}

function eventMusic(){
    playMusic.addEventListener("mouseup",function(){
        eventPlayMusic(toPath);
    });
    pauseMusic.addEventListener("mouseup", function(){
        eventPauseMusic(toPath);
    });
}

// Random ID
function randomID(){
    var generatedNumbers = [];
    for(var i = 0; i < listMusic.length; i++) {
        generateRandomNumber(generatedNumbers);
    }
    return generatedNumbers;    
}

// Hàm để tạo số ngẫu nhiên không trùng lặp
function generateRandomNumber(generatedNumbers) {
  var randomNumber = Math.floor(Math.random() * listMusic.length) + 1;
  while (generatedNumbers.indexOf(randomNumber) !== -1) {
    randomNumber = Math.floor(Math.random() * listMusic.length) + 1;
  }
  generatedNumbers.push(randomNumber);
}

var numberRD = randomID();
var isRandomOn = false;
function randomMusic() {
    var rd = document.getElementById("random");
    isRandomOn = !isRandomOn;
    if(isRandomOn){
        rd.style.color = "#9B4DE0";
    }
    else{
        rd.style.color = "white";
    }
}

// Xóa bài nhạc đã phát
function deletePlay(){
    var indexOfMusic = numberRD.indexOf(idMusic);
    for(var i = indexOfMusic; i < numberRD.length-1; i++){
        numberRD[i] = numberRD[i+1];
    }
    numberRD.pop();
}

// Qua bài hát
function nextToPath(){
    if(isRandomOn){
        nextToRandom();
    }
    else{
        nextToNormal();
    }
}

// Qua bài mà có chế độ Random
function nextToRandom(){
    if(numberRD.length === 0) {
        numberRD = randomID();
        deletePlay();
    }
    getPath(numberRD[0]);
    eventPlayMusic(toPath);
    deletePlay();
    pauseMessage();
}

// Qua bài mà không có chế độ Random
function nextToNormal() {
    if(idMusic == listMusic.length) idMusic = 0;
    getPath(idMusic + 1);
    eventPlayMusic(toPath);
    pauseMessage();
}

// Lùi bài hát
function backToPath(){
    if(isRandomOn){
        nextToRandom();
    }
    else{
        backToNormal();
    }
}

// Lùi bài hát mà không có Random
function backToNormal() {
    if(idMusic == 1) idMusic = listMusic.length + 1;
    getPath(idMusic - 1);
    eventPlayMusic(toPath);
    playee.innerHTML = '<img src="./IMG/lofi.jpg" alt="Lofi" class="img-lofi"><i class="bi bi-pause-circle play-icon"></i>';
    playe.innerHTML = '<i class="bi bi-pause-circle" style="margin-right: 8px;"></i>TẠM DỪNG';
}

// Lặp lại bài hát
var isRepeat = false;
function repeatMusic(){
    var repeat = document.getElementById("repeat");
    isRepeat = !isRepeat;
    if(isRepeat){
        repeat.style.color = "#9B4DE0";
        setInterval(function(){
            if(toPath.ended){
                getPath(idMusic);
                eventPlayMusic(toPath);
            }
        },1000);
    }
    else{
        repeat.style.color = "white";
    }
}


// Tin nhắn dừng
function pauseMessage(){
    playee.innerHTML = '<img src="./IMG/lofi.jpg" alt="Lofi" class="img-lofi"><i class="bi bi-pause-circle play-icon"></i>';
    playe.innerHTML = '<i class="bi bi-pause-circle" style="margin-right: 8px;"></i>TẠM DỪNG';
}
// Chạy nhạc bên tay phải

var isPlay = true;
var playe = document.getElementById("playAll");
var playee = document.getElementById("playImg");
function PlayMusic(){
    isPlay = !isPlay;
    if(isPlay){
        handlePlayMusic();
    }
    else{
        handlePauseMusic();
    }
}
// Chạy
function run(){
    getMusic();
    getPath(1);
    setInterval(handleTimeMusicFirst,1000);
    setInterval(function(){
        if(toPath.ended){
            nextToPath();
        }
    },1000);
}
run();