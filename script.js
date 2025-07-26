// words.js is loaded separately and provides `wordList`

let currentWord = "";
let displaySpeed = 1000; // default speed in ms
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

// Show fingerspelling images (with double-letter support, blank at start/end)
function showLetterSequence(word) {
  let index = -1; // start with blank.png before word
  outputDiv.innerHTML = "";
  const img = document.createElement("img");
  img.style.width = "500px";
  img.style.height = "500px";
  img.style.background = "#0f0f0f";
  outputDiv.appendChild(img);

  // Minimum display duration to smooth speed
  const minDisplayDuration = 400;
  const speed = Math.max(displaySpeed, minDisplayDuration);

  function showNext() {
    if (index === -1) {
      // show blank before word starts
      img.src = `images/blank.png`;
      index++;
    } else if (index < word.length) {
      const char = word[index];
      const lower = char.toLowerCase();

      // double-letter logic: if current letter same as previous, show double letter image
      if (index > 0 && word[index] === word[index - 1]) {
        img.src = `images/${lower}${lower}.png`;
      } else {
        img.src = `images/${lower}.png`;
      }
      index++;
    } else if (index === word.length) {
      // show blank after word ends
      img.src = `images/blank.png`;
      index++;
    } else {
      // done
      return;
    }
    setTimeout(showNext, speed);
  }
  showNext();
}

// Get random word from wordList filtered by max letters
function getRandomWord() {
  const filterLength = maxLetters.value === "any" ? null : parseInt(maxLetters.value);
  let filtered = wordList;
  if (filterLength) {
    filtered = wordList.filter(word => word.length <= filterLength);
  }
  return filtered[Math.floor(Math.random() * filtered.length)];
}

// New word button click: reset input and start animation
function newWord() {
  currentWord = getRandomWord();
  wordInput.value = "";
  showLetterSequence(currentWord);
}

// Replay button click: replay current word
function replayWord() {
  if (currentWord) showLetterSequence(currentWord);
}

// Check answer button: compare user input to currentWord
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

// Speed controls
speedSelect.addEventListener("change", () => displaySpeed = parseInt(speedSelect.value));
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

// Start the first word when page loads
newWord();
