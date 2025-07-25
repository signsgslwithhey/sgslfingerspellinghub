let currentWord = "";
let displaySpeed = 1000; // default
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

// Generate a random word (if you don't want to use words.js)
function generateRandomWord() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let length = 3;

  if (maxLetters.value === "any") {
    length = Math.floor(Math.random() * 4) + 3; // random 3–6 letters
  } else {
    length = parseInt(maxLetters.value);
  }

  let word = "";
  for (let i = 0; i < length; i++) {
    word += letters[Math.floor(Math.random() * letters.length)];
  }
  return word;
}

// Flashing sequence like ASL.ms
function showLetterSequence(word) {
  let index = 0;
  outputDiv.innerHTML = ""; // clear first
  const img = document.createElement("img");
  outputDiv.appendChild(img);

  const interval = setInterval(() => {
    if (index < word.length) {
      const char = word[index];

      // Show the letter image
      if (index > 0 && word[index] === word[index - 1]) {
        img.src = `images/${char.toLowerCase()}${char.toLowerCase()}.png`;
      } else {
        img.src = `images/${char.toLowerCase()}.png`;
      }

      // Make it disappear to black before next letter
      setTimeout(() => {
        img.src = "";
        img.style.background = "#000";
      }, displaySpeed * 0.6);

      index++;
    } else {
      // End of word, stay black
      img.src = "";
      img.style.background = "#000";
      clearInterval(interval);
    }
  }, displaySpeed);
}

// New random word
function newWord() {
  currentWord = generateRandomWord();
  wordInput.value = "";
  showLetterSequence(currentWord);
}

// Replay the same word
function replayWord() {
  if (currentWord) showLetterSequence(currentWord);
}

// Check answer
document.getElementById("checkBtn").addEventListener("click", () => {
  if (wordInput.value.toUpperCase() === currentWord) {
    score++;
    alert("✅ Correct!");
  } else {
    alert(`❌ Wrong! The word was: ${currentWord}`);
  }
  scoreDisplay.textContent = score;
});

// Speed settings
speedSelect.addEventListener("change", () => {
  displaySpeed = parseInt(speedSelect.value);
});
slowerBtn.addEventListener("click", () => {
  displaySpeed += 100;
});
fasterBtn.addEventListener("click", () => {
  displaySpeed = Math.max(100, displaySpeed - 100);
});

// Buttons
newWordBtn.addEventListener("click", newWord);
replayBtn.addEventListener("click", replayWord);

// Start first word automatically
newWord();
