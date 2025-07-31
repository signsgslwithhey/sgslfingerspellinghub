// words.js is loaded separately and provides `wordList`

let currentWord = "";
let displaySpeed = 1000;
let score = 0;

// Elements
const outputDiv = document.getElementById("output");
const newWordBtn = document.getElementById("newWordBtn");
const replayBtn = document.getElementById("replayBtn");
const speedSelect = document.getElementById("speedSelect");
const maxLetters = document.getElementById("maxLetters");
const slowerBtn = document.getElementById("slowerBtn");
const fasterBtn = document.getElementById("fasterBtn");
const scoreDisplay = document.getElementById("score");
const wordInput = document.getElementById("wordInput");
const checkBtn = document.getElementById("checkBtn");

// ✅ Preload all images (a-z, aa-zz, blank)
function preloadImages() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const imagesToLoad = [];

  for (const char of letters) {
    imagesToLoad.push(`images/${char}.png`);
    imagesToLoad.push(`images/${char}${char}.png`);
  }

  imagesToLoad.push("images/blank.png");

  imagesToLoad.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  console.log("✅ All images preloaded");
}

// ✅ Show fingerspelling images with double-letter support + slowed first & last letters
function showLetterSequence(word) {
  outputDiv.innerHTML = "";
  const img = document.createElement("img");
  img.src = "images/blank.png";
  outputDiv.appendChild(img);

  let index = -1;

  function showNext() {
    index++;

    if (index === -1) {
      img.src = "images/blank.png";
      setTimeout(showNext, displaySpeed);
      return;
    }

    if (index < word.length) {
      const char = word[index].toLowerCase();

      if (index > 0 && word[index] === word[index - 1]) {
        img.src = `images/${char}${char}.png`;
      } else {
        img.src = `images/${char}.png`;
      }

      const extraDelay = (index === 0 || index === word.length -1) ? getExtraDelay() : 0;
      setTimeout(showNext, displaySpeed + extraDelay);
    } else {
      img.src = "images/blank.png"; // End blank
    }
  }

  showNext();
}

// ✅ Decide extra delay based on speed selection
function getExtraDelay() {
  switch (speedSelect.value) {
    case "600": return 0; 
    case "400": return displaySpeed * 1.5;
    case "250": return displaySpeed * 1.7;
    case "125": return displaySpeed * 4;
    default: return 0;
  }
}

// ✅ Get random word
function getRandomWord() {
  const filterLength = maxLetters.value === "any" ? null : parseInt(maxLetters.value);
  let filtered = wordList;
  if (filterLength) {
    filtered = wordList.filter(word => word.length <= filterLength);
  }
  return filtered[Math.floor(Math.random() * filtered.length)];
}

// ✅ New word
function newWord() {
  currentWord = getRandomWord();
  wordInput.value = "";
  showLetterSequence(currentWord);
}

// ✅ Replay current word
function replayWord() {
  if (currentWord) showLetterSequence(currentWord);
}

// ✅ Check answer
checkBtn.addEventListener("click", () => {
  const userAnswer = wordInput.value.toUpperCase().trim();
  if (userAnswer === currentWord) {
    score++;
    scoreDisplay.textContent = score;
    alert("✅ Correct! The word was: " + currentWord);
    setTimeout(newWord, 1000);
  } else {
    alert("❌ Try again! (Click REPLAY to watch again)");
  }
});

// ✅ Speed controls
speedSelect.addEventListener("change", () => {
  displaySpeed = parseInt(speedSelect.value);
});
slowerBtn.addEventListener("click", () => {
  displaySpeed += 100;
  alert(`Speed: ${displaySpeed}ms per letter`);
});
fasterBtn.addEventListener("click", () => {
  displaySpeed = Math.max(100, displaySpeed - 100);
  alert(`Speed: ${displaySpeed}ms per letter`);
});

// ✅ Button events
newWordBtn.addEventListener("click", newWord);
replayBtn.addEventListener("click", replayWord);

// ✅ Start
preloadImages();
newWord();
