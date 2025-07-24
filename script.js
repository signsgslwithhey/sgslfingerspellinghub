// ✅ Common dictionary-like word list (you can expand this)
const wordList = [
  "CAT", "DOG", "HOUSE", "BOOK", "APPLE", "PIZZA", "BALL", "LOVE",
  "HAPPY", "TEACH", "SCHOOL", "FOOD", "THANK", "HELP", "FRIEND",
  "WATER", "MONEY", "PHONE", "DEAF", "SIGN", "HELLO", "GOOD", "BAD",
  "CHAIR", "TABLE", "LIGHT", "BAG", "WATCH", "EAT", "SLEEP", "RUN",
  "WALK", "COOK", "PLAY", "WORK", "READ", "WRITE"
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
function showWordAnimated(word) {
  output.innerHTML = "";
  let i = 0;

  function showNext() {
    if (i < word.length) {
      let char = word[i];
      let img = document.createElement("img");

      // Check double letters (e.g., ZZ, LL)
      if (i < word.length - 1 && word[i] === word[i + 1]) {
        img.src = `images/${char.toLowerCase()}${char.toLowerCase()}.png`;
        img.alt = char + char;
        i++;
      } else {
        img.src = `images/${char.toLowerCase()}.png`;
        img.alt = char;
      }

      output.appendChild(img);
      i++;
      setTimeout(showNext, displaySpeed);
    }
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
