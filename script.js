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

// Generate random letters for the "word"
function generateRandomWord() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
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

// Show fingerspelling images one by one
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

      index++;

      // After a short pause, flash to black before the next letter
      setTimeout(() => {
        img.src = ""; // remove the image
        img.style.background = "#000"; // black screen
      }, currentSpeed * 0.6); // disappears before next cycle

    } else {
      // End of word — stay black
      img.src = "";
      img.style.background = "#000";
      clearInterval(interval);
    }
  }, currentSpeed);
}

// New random "word"
function newWord() {
  currentWord = generateRandomWord();
  wordInput.value = "";
  showWordAnimated(currentWord);
}

// Replay
function replayWord() {
  if (currentWord) showWordAnimated(currentWord);
}

// Check answer
wordInput.addEventListener("input", function () {
  if (this.value.toLowerCase() === currentWord) {
    score++;
    scoreDisplay.textContent = score;
    setTimeout(newWord, 1000);
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

// Buttons
newWordBtn.addEventListener("click", newWord);
replayBtn.addEventListener("click", replayWord);

// Start first word
newWord();
