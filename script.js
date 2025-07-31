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
  let index = -1; // Start with blank
  outputDiv.innerHTML = "";
  const img = document.createElement("img");
  img.src = "images/blank.png"; // Start with blank screen
  outputDiv.appendChild(img);

  const interval = setInterval(() => {
    if (index === -1) {
      index++;
      return; // just show blank once before starting
    }

    if (index < word.length) {
      const char = word[index];
      const upper = char.toUpperCase();

      // ✅ Double-letter logic
      if (index > 0 && word[index] === word[index - 1]) {
        img.src = `images/${upper}${upper}.png`;
      } else {
        img.src = `images/${upper}.png`;
      }

      // ✅ Adjust timing for first & last letters
      let extraDelay = 0;
      if (index === 0 || index === word.length - 1) {
        extraDelay = getExtraDelay(); // function below decides based on speed
      }

      clearInterval(interval); // stop current interval
      setTimeout(() => {
        index++;
        if (index <= word.length) {
          showNextLetter(word, img, index); // recursive show
        }
      }, displaySpeed + extraDelay);
    } else {
      img.src = "images/blank.png"; // End of word → blank
      clearInterval(interval);
    }
  }, displaySpeed);
}

// ✅ Recursive helper for smoother timing
function showNextLetter(word, img, index) {
  if (index < word.length) {
    const char = word[index];
    const upper = char.toUpperCase();

    if (index > 0 && word[index] === word[index - 1]) {
      img.src = `images/${upper}${upper}.png`;
    } else {
      img.src = `images/${upper}.png`;
    }

    let extraDelay = 0;
    if (index === 0 || index === word.length - 1) {
      extraDelay = getExtraDelay();
    }

    setTimeout(() => {
      showNextLetter(word, img, index + 1);
    }, displaySpeed + extraDelay);
  } else {
    img.src = "images/blank.png"; // End → blank
  }
}

// ✅ Decide extra delay based on speed selection
function getExtraDelay() {
  switch (speedSelect.value) {
    case "600": return 0; // Slow → no extra
    case "400": return displaySpeed * 1.5; // Medium → 1.5x
    case "250": return displaySpeed * 1.7; // Fast → 1.7x
    case "125": return displaySpeed * 4;   // Deaf → 2x
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
speedSelect.addEventListener("change", () => displaySpeed = parseInt(speedSelect.value));
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
