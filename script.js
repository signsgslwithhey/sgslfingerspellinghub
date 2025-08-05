// words.js is loaded separately and provides `wordListByLength`

let currentWord = "";
let displaySpeed = 400;
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

// ✅ Preload all images to avoid delay on first play
function preloadImages() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const imagesToLoad = [];

  // Single letters
  for (let char of letters) {
    imagesToLoad.push(`images/${char}.png`);
  }
  // Double letters
  for (let char of letters) {
    imagesToLoad.push(`images/${char}${char}.png`);
  }
  // Blank screen
  imagesToLoad.push("images/blank.png");

  imagesToLoad.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  console.log("✅ All images preloading...");
}

// ✅ Show fingerspelling images (with double-letter support + slowed first & last letters)
function showLetterSequence(word) {
  outputDiv.innerHTML = "";
  const img = document.createElement("img");
  img.src = "images/blank.png"; // Start with blank screen
  outputDiv.appendChild(img);

  function showNext(index) {
    if (index >= word.length) {
      img.src = "images/blank.png"; // End with blank
      return;
    }

    const char = word[index].toUpperCase();

    if (index > 0 && word[index] === word[index - 1]) {
      img.src = `images/${char}${char}.png`;
    } else {
      img.src = `images/${char}.png`;
    }

    let extraDelay = 0;
    if (index === 0 || index === word.length - 1) {
      extraDelay = getExtraDelay();
    }

    setTimeout(() => {
      showNext(index + 1);
    }, displaySpeed + extraDelay);
  }

  // Show a blank first for a short moment, then start showing letters
  setTimeout(() => {
    showNext(0);
  }, displaySpeed);
}

// ✅ Decide extra delay based on speed selection
function getExtraDelay() {
  switch (speedSelect.value) {
    case "600": return displaySpeed * 2;    // Slow → longer extra delay
    case "400": return displaySpeed * 1.5;  // Medium → moderate extra delay
    case "250": return displaySpeed * 1.2;  // Fast → shorter extra delay
    case "125": return displaySpeed * 0.8;  // Deaf → minimal extra delay
    default: return 0;
  }
}

// ✅ Get random word
function getRandomWord() {
  const filterLength = maxLetters.value === "any" ? null : parseInt(maxLetters.value);
  let candidates = [];

  if (filterLength) {
    candidates = wordListByLength[filterLength] || [];
  } else {
    // flatten all word arrays
    for (const len in wordListByLength) {
      candidates = candidates.concat(wordListByLength[len]);
    }
  }

  return candidates[Math.floor(Math.random() * candidates.length)];
}

// ✅ New word
function newWord() {
  currentWord = getRandomWord();
  wordInput.value = "";
  showLetterSequence(currentWord);
}

// ✅ Replay
function replayWord() {
  if (currentWord) showLetterSequence(currentWord);
}

// ✅ Check answer
checkBtn.addEventListener("click", function () {
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
  alert("Speed: " + displaySpeed + "ms per letter");
});

fasterBtn.addEventListener("click", () => {
  displaySpeed = Math.max(100, displaySpeed - 100);
  alert("Speed: " + displaySpeed + "ms per letter");
});

// ✅ Button events
newWordBtn.addEventListener("click", newWord);
replayBtn.addEventListener("click", replayWord);

// ✅ Preload all images as soon as page loads
preloadImages();

// ✅ Start first word
newWord();
