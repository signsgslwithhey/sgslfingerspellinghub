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

// Show fingerspelling images (with blank.png before and after)
function showLetterSequence(word) {
  let index = -1; // start at -1 to show blank.png first
  outputDiv.innerHTML = "";
  const img = document.createElement("img");
  img.style.width = "500px";
  img.style.height = "500px";
  img.style.background = "#0f0f0f";  // new background color
  outputDiv.appendChild(img);

  const interval = setInterval(() => {
    if (index === -1) {
      // Show blank.png before word
      img.src = `images/blank.png`;
      index++;
    } else if (index < word.length) {
      const char = word[index];
      const lower = char.toLowerCase();

      // Double-letter logic
      if (index > 0 && word[index] === word[index - 1]) {
        img.src = `images/${lower}${lower}.png`; // e.g. ll.png
      } else {
        img.src = `images/${lower}.png`;
      }

      index++;
    } else if (index === word.length) {
      // Show blank.png after word
      img.src = `images/blank.png`;
      index++;
    } else {
      clearInterval(interval);
    }
  }, displaySpeed);
}

// Get random word
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
  showLetterSequence(currentWord);
}

// Replay
function replayWord() {
  if (currentWord) showLetterSequence(currentWord);
}

// Check answer
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

// Start first word
newWord();
