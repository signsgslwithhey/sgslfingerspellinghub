// Sample word list - replace with your SgSL word list
const wordList = ["hello", "sgsl", "sign", "learn", "practice", "deaf", "love", "happy", "good", "bad"];

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

// Show fingerspelling images one by one
function showWordAnimated(word) {
  output.innerHTML = "";
  let i = 0;

  function showNext() {
    if (i < word.length) {
      const char = word[i];
      if (/[a-z]/.test(char)) {
        const img = document.createElement("img");
        img.src = `images/${char}.png`;
        img.alt = char;
        output.appendChild(img);
      }
      i++;
      setTimeout(showNext, displaySpeed);
    }
  }

  showNext();
}

// Pick random word based on max letters
function getRandomWord() {
  const filterLength = maxLetters.value === "any" ? null : parseInt(maxLetters.value);
  let filtered = wordList;

  if (filterLength) {
    filtered = wordList.filter(word => word.length <= filterLength);
  }

  return filtered[Math.floor(Math.random() * filtered.length)];
}

// New word
function newWord() {
  currentWord = getRandomWord();
  wordInput.value = "";
  showWordAnimated(currentWord);
}

// Replay word
function replayWord() {
  if (currentWord) showWordAnimated(currentWord);
}

// Check answer
wordInput.addEventListener("input", function () {
  if (this.value.toLowerCase() === currentWord) {
    score++;
    scoreDisplay.textContent = score;
    setTimeout(newWord, 1000); // Next word after correct answer
  }
});

// Speed settings
speedSelect.addEventListener("change", function () {
  displaySpeed = parseInt(this.value);
});

slowerBtn.addEventListener("click", () => {
  displaySpeed += 100;
  alert("Speed: " + displaySpeed + "ms per letter");
});

fasterBtn.addEventListener("click", () => {
  displaySpeed = Math.max(100, displaySpeed - 100);
  alert("Speed: " + displaySpeed + "ms per letter");
});

// Button events
newWordBtn.addEventListener("click", newWord);
replayBtn.addEventListener("click", replayWord);

// Start with a word
newWord();
