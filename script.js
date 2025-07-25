// words.js (Example - replace with full 10,000 words)
const wordList = [
  "CAT","DOG","HOUSE","APPLE","PIZZA","BALL","LOVE","HAPPY","TEACH","SCHOOL",
  "THANK","FRIEND","WATER","PHONE","DEAF","SIGN","HELLO","CHAIR","LIGHT",
  "EAT","SLEEP","RUN","WORK","READ","WRITE","BIRD","MOUSE","PAPER","TABLE"
  // ... (add up to 10,000 words in CAPS)
];

let currentWord = "";
let displaySpeed = 1000;
let score = 0;

// Elements
const output = document.getElementById("output");
const newWordBtn = document.getElementById("newWordBtn");
const replayBtn = document.getElementById("replayBtn");
const speedSelect = document.getElementById("speedSelect");
const maxLetters = document.getElementById("maxLetters");
const slowerBtn = document.getElementById("slowerBtn");
const fasterBtn = document.getElementById("fasterBtn");
const scoreDisplay = document.getElementById("score");
const wordInput = document.getElementById("wordInput");
const checkBtn = document.getElementById("checkBtn");

// ✅ Show fingerspelling images (with double-letter support)
function showLetterSequence(word) {
  let index = 0;
  outputDiv.innerHTML = ""; // clear first
  const img = document.createElement("img");
  outputDiv.appendChild(img);

  const interval = setInterval(() => {
    if (index < word.length) {
      const char = word[index];
      if (index > 0 && word[index] === word[index - 1]) {
        img.src = `images/${char.toLowerCase()}${char.toLowerCase()}.png`;
      } else {
        img.src = `images/${char.toLowerCase()}.png`;
      }
      index++;
    } else {
      // turn black at the end
      img.src = "";
      img.style.background = "#000"; 
      clearInterval(interval);
    }
  }, currentSpeed);
}

  showNext();
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
  showWordAnimated(currentWord);
}

// ✅ Replay
function replayWord() {
  if (currentWord) showWordAnimated(currentWord);
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

// ✅ Start first word
newWord();
