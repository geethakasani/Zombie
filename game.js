// Iteration 1: Declare variables required for this game
const gameGround = document.getElementById("game-body");
const timer = document.getElementById("timer-box");
let seconds = parseInt(timer.textContent) || 60;
let images = ["zombie-1.png", "zombie-2.png", "zombie-3.png", "zombie-4.png", "zombie-5.png", "zombie-6.png"];
let currentZombieId = 0;
const maxLives = 4;
let lives = 4;

// Iteration 1.2: Add shotgun sound
const shotgun = new Audio("./assets/shotgun.wav");
gameGround.onclick = () => {
  shotgun.pause();
  shotgun.currentTime = 0;
  shotgun.play();
};
// Iteration 1.3: Add background sound
const bgm = new Audio("./assets/bgm.mp3");
bgm.play();
bgm.loop = true;

// Iteration 3: Write a function to check if the player missed a zombie
function createZombie() {
  const newZombie = document.createElement("img");
  const randomImage = Math.floor(Math.random() * images.length);
  newZombie.src = `./assets/${images[randomImage]}`;
  newZombie.classList.add("zombie-image");
  newZombie.setAttribute("id", `zombie-${currentZombieId}`);
  newZombie.style.transform = `translateX(${getRandomNum(10, 90)}vw)`;
  newZombie.style.animationDuration = `${getRandomNum(2, 10)}s`;
  newZombie.onclick = () => {
    removeZombie(newZombie);
  };
  gameGround.appendChild(newZombie);
  currentZombieId++;
}

function checkMissed(zombie) {
  if (zombie && zombie.getBoundingClientRect().top <= 0) {
    lives--;
    return true;
  }
  return false;
}
// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function removeZombie(zombie) {
  zombie.style.display = "none";
  currentZombieId++;
  shotgun.play();
  zombie.remove();
  createZombie();
}

// Iteration 5: Creating timer
let missed = 0;
let intervalID = setInterval(() => {
  seconds--;
  if (seconds <= 0) {
    clearInterval(intervalID);
    if (seconds < 0) {
        return;
    }
    if (lives == 0) {
        location.href = "./game-over.html";
        return;
    }
    location.href = "./win.html";
    return;
}

  document.getElementById("timer").textContent=seconds;
  const zombie = document.getElementById(`zombie-${currentZombieId - 1}`);
  if (checkMissed(zombie)) {
    removeZombie(zombie);
    missed++;
    if (missed >= 4) {
      clearInterval(intervalID);
      location.href = "./game-over.html";
    }
  }
}, 1000);

// Iteration 6: Write a code to start the game by calling the first zombie
createZombie(currentZombieId);

// Iteration 7: Write the helper function to get random integer
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}