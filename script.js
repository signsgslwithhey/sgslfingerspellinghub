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
  outputDiv.innerHTML = ""; // clear output
  const img = document.createElement("img");
  outputDiv.appendChild(img);

  const interval = setInterval(() => {
    if (index < word.length) {
      const char = word[index];
      const lower = char.toLowerCase();

      // Show double-letter image if current letter is same as previous
      if (index > 0 && word[index] === word[index - 1]) {
        img.src = `images/${lower}${lower}.png`; // e.g., ll.png
      } else {
        img.src = `images/${lower}.png`;
      }

      index++;
} else {
  // ✅ End of word → show black placeholder same size as image
  img.src = "";
  img.style.width = "400px";  // same width as your images
  img.style.height = "400px"; // same height as your images
  img.style.background = "#000";
  clearInterval(interval);
}
  }, displaySpeed);
}

// ✅ Get random word based on max letters filter
function getRandomWord() {
  const filterLength = maxLetters.value === "any" ? null : parseInt(maxLetters.value);
  let filtered = wordList;
  if (filterLength) {
    filtered = wordList.filter(word => word.length <= filterLength);
  }
  return filtered[Math.floor(Math.random() * filtered.length)];
}

// ✅ Load a new word and show it
function newWord() {
  currentWord = getRandomWord();
  wordInput.value = "";
  showLetterSequence(currentWord);
}

// ✅ Replay current word
function replayWord() {
  if (currentWord) showLetterSequence(currentWord);
}

// ✅ Check user input against current word
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

// ✅ Button event listeners
newWordBtn.addEventListener("click", newWord);
replayBtn.addEventListener("click", replayWord);

// ✅ Start with first word
newWord();
