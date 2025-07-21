const paragraphs = [
  `BABE HAPPY GIRLFRIEND DAY "WIFEY"!!!\n
you know you mean a lot for me i really love you and these 1.5 year with you and almost 5 month seeing you as mine was something best 
Hn kbhi kbhi me thoda ganda bacha bn jata hu but yes hu tho apka hi na hehe "mommy"
dekho hn raat me bt ni kr pata but yr mn bht krta h late night gossips ka apko pyr krne ka romance krne ka and all but chota hu na me 
tho yes meri pooku i love you and this is smtg i wrote for you hope you will love`,

  `"The Moment the Universe Changed 🌌"\n
10 March 2025, 8:46:07 pm —
The universe didn’t shout, but my world shifted.
In that quiet moment, your name echoed in my soul.
Since then...

Every second is a poem,
Every silence carries your breath,
And every heartbeat? — It knows Manu.

You’re not just a chapter, you’re the whole story —
The calm in my chaos, the smile behind my screen,
The full moon’s envy, and the wish every star failed to grant.

I once searched for peace in books, songs, and skies,
But peace, it turns out, has your eyes.`,

  `Tere bina zindagi adhuri si lagti hai 💞
Har pal tu yaad aati hai 💖
Tere saath bitaye har lamhe ko dil mein sajaya hai ❤️
Jitna pyaar tujhe karti hoon, utna khud se bhi nahi kiya 💌`,

  `"To the Moon I Said..." 🌙❤
I looked up at the moon last night, full and glowing.
I whispered, “You’re beautiful.”
The moon smiled and said,
“She exists, doesn’t she?”
And in that moment, even the moon felt small.`
];

const images = [
  "img1.jpg",
  "img2.jpg",
  "img3.jpg",
  "img4.jpg"
];

let imgIndex = 0;
let paraIndex = 0;
let imgInterval = null;
let paraInterval = null;

const imgTag = document.getElementById("slideshow");
const textTag = document.getElementById("romanticText");

function startSlides() {
  imgInterval = setInterval(() => {
    imgIndex = (imgIndex + 1) % images.length;
    imgTag.src = `static/images/${images[imgIndex]}`;
    if (images[imgIndex].includes("IMG-")) {
      imgTag.style.transform = "rotateX(90deg)";
    } else {
      imgTag.style.transform = "rotateX(0deg)";
    }
    imgTag.classList.remove("heartbeat");
    void imgTag.offsetWidth;
    imgTag.classList.add("heartbeat");
  }, 5000);

  paraInterval = setInterval(() => {
    paraIndex = (paraIndex + 1) % paragraphs.length;
    textTag.innerHTML = paragraphs[paraIndex];

    textTag.classList.remove("fade-scale", "slide-glow");
    void textTag.offsetWidth;
    textTag.classList.add("fade-scale", "slide-glow");
  }, 10000);
}

function pauseSlides() {
  clearInterval(imgInterval);
  clearInterval(paraInterval);
  imgInterval = null;
  paraInterval = null;
}

function resumeSlides() {
  if (!imgInterval && !paraInterval) startSlides();
}

function toggleMusic() {
  const music = document.getElementById("bgMusic");
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}

function updateTimer() {
  const start = new Date("2025-03-10T20:46:07");
  const now = new Date();
  let diff = now - start;
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
  let mins = Math.floor((diff / (1000 * 60)) % 60);
  document.getElementById("timeCount").innerText = `${days} days, ${hrs} hrs, ${mins} min 💞`;
}

setInterval(updateTimer, 60000);
updateTimer();

function checkUnlock() {
  const val = document.getElementById("unlockInput").value.trim().toLowerCase();
  const valid = ["22 oct", "22/10", "22-10"];
  if (valid.includes(val)) {
    document.getElementById("unlockScreen").style.display = "none";
    document.getElementById("mainApp").style.display = "block";
    document.getElementById("secretMessage").style.display = "none";

    const music = document.getElementById("bgMusic");
    setTimeout(() => {
      music.play().catch((err) => {
        console.log("Autoplay blocked. User must tap manually:", err);
      });
    }, 300);

    startSlides();
    triggerFireworks();
    setTimeout(showSecretMessage, 180000); // 3 minutes
  } else {
    document.getElementById("unlockMsg").innerText =
      "That's not the day we met... try again 😔";
  }
}

function triggerFireworks() {
  const today = new Date();
  const canvas = document.getElementById("fireworksCanvas");
  if (today.getMonth() === 7 && today.getDate() >= 1) {
    canvas.style.display = "block";
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const hearts = [];
    for (let i = 0; i < 100; i++) {
      hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 10 + 4,
        speed: Math.random() * 1 + 0.5,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      });
    }
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hearts.forEach(h => {
        ctx.beginPath();
        ctx.fillStyle = h.color;
        ctx.arc(h.x, h.y, h.size, 0, Math.PI * 2);
        ctx.fill();
        h.y -= h.speed;
        if (h.y < 0) h.y = canvas.height;
      });
      requestAnimationFrame(animate);
    }
    animate();
  }
}

function showSecretMessage() {
  const box = document.getElementById("secretMessage");
  box.innerText = "If you're still here, it means you really care… and that makes me love you even more 💝";
  box.style.display = "block";
}
