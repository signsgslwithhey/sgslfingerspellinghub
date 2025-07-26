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

// ✅ Preload images before showing
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Image failed: ${src}`);
    img.src = src;
  });
}

// ✅ Show fingerspelling images (with double-letter & slower first/last)
async function showLetterSequence(word) {
  outputDiv.innerHTML = ""; // clear output

  for (let i = 0; i < word.length; i++) {
    let char = word[i];
    const lower = char.toLowerCase();

    // Double-letter logic
    let imgSrc;
    if (i > 0 && word[i] === word[i - 1]) {
      imgSrc = `images/${lower}${lower}.png`;
    } else {
      imgSrc = `images/${lower}.png`;
    }

    try {
      const img = await loadImage(imgSrc);
      img.style.height = "350px";
      img.style.margin = "20px 0";
      img.style.borderRadius = "0px";
      img.style.backgroundColor = "#0f0f0f";

      outputDiv.innerHTML = ""; // clear previous
      outputDiv.appendChild(img);

      // ✅ Adjust timing for first and last letter
      if (i === 0) {
        await new Promise(r => setTimeout(r, displaySpeed * 2)); // First letter slower
      } else if (i === word.length - 1) {
        await new Promise(r => setTimeout(r, displaySpeed * 2)); // Last letter longest
      } else {
        await new Promise(r => setTimeout(r, displaySpeed));
      }
    } catch (error) {
      console.error(error);
    }
  }

  // ✅ Show blank.png at the end
  try {
    const blankImg = await loadImage("images/blank.png");
    blankImg.style.height = "350px";
    blankImg.style.margin = "20px 0";
    blankImg.style.backgroundColor = "#0f0f0f";
    outputDiv.innerHTML = "";
    outputDiv.appendChild(blankImg);
  } catch (error) {
    console.error(error);
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

// ✅ Start first word
newWord();
