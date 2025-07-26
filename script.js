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

// ✅ Show fingerspelling images (with double-letter support)
function showLetterSequence(word) {
  let index = 0;
  outputDiv.innerHTML = ""; // clear first
  const img = document.createElement("img");
  img.style.width = "400px";
  img.style.height = "400px";
  img.style.background = "#1a1a1a"; // match page background
  outputDiv.appendChild(img);

  const interval = setInterval(() => {
    if (index < word.length) {
      const char = word[index];
      const lower = char.toLowerCase();

      // ✅ Double-letter logic (e.g., LL → ll.png)
      if (index > 0 && word[index] === word[index - 1]) {
        img.src = `images/${lower}${lower}.png`;
      } else {
        img.src = `images/${lower}.png`;
      }

      index++;
    } else {
      // ✅ End of word → transparent 1x1 GIF to avoid broken image icon
      img.src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      img.style.background = "#1a1a1a"; // keep same background color
      clearInterval(interval);
    }
  }, displaySpeed);
}

// ✅ Get random word
function getRandomWord() {
  const filterLength =
    maxLetters.value === "any" ? null : parseInt(maxLetters.value);
  let filtered = wordList;
  if (filterLength) {
    filtered = wordList.filter((word) => word.length <= filterLength);
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
speedSelect.addEventListener(
  "change",
  () => (displaySpeed = parseInt(speedSelect.value))
);
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
