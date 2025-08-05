let currentWord = "";
let displaySpeed = 400;
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

// ✅ Preload images (single + double + blank)
function preloadImages() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const imagesToLoad = [];

  for (let char of letters) {
    imagesToLoad.push(`images/${char}.png`);
    imagesToLoad.push(`images/${char}${char}.png`);
  }

  imagesToLoad.push("images/blank.png");

  imagesToLoad.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  console.log("✅ All images preloading...");
}

// ✅ Show the fingerspelling sequence
function showLetterSequence(word) {
  let index = -1;
  outputDiv.innerHTML = "";
  const img = document.createElement("img");
  img.src = "images/blank.png";
  outputDiv.appendChild(img);

  const interval = setInterval(() => {
    if (index === -1) {
      index++;
      return;
    }

    if (index < word.length) {
      const char = word[index];
      const upper = char.toUpperCase();

      if (index > 0 && word[index] === word[index - 1]) {
        img.src = `images/${upper}${upper}.png`;
      } else {
        img.src = `images/${upper}.png`;
      }

      let extraDelay = 0;
      if (index === 0 || index === word.length - 1) {
        extraDelay = getExtraDelay();
      }

      clearInterval(interval);
      setTimeout(() => {
        index++;
        if (index <= word.length) {
          showNextLetter(word, img, index);
        }
      }, displaySpeed + extraDelay);
    } else {
      img.src = "images/blank.png";
      clearInterval(interval);
    }
  }, displaySpeed);
}

// ✅ Recursive fallback to show remaining letters
function showNextLetter(word, img, index) {
  if (index < word.length) {
    const char = word[index];
    const upper = char.toUpperCase();

    if (index > 0 && word[index] === word[index - 1]) {
      img.src = `images/${upper}${upper}.png`;
    } else {
      img.src = `images/${upper}.png`;
    }

    let extraDelay = 0;
    if (index === 0 || index === word.length - 1) {
      extraDelay = getExtraDelay();
    }

    setTimeout(() => {
      showNextLetter(word, img, index + 1);
    }, displaySpeed + extraDelay);
  } else {
    img.src = "images/blank.png";
  }
}

// ✅ Adjust delay for first & last letters
function getExtraDelay() {
  switch (speedSelect.value) {
    case "600": return 0;
    case "400": return displaySpeed * 1.5;
    case "250": return displaySpeed * 1.7;
    case "125": return displaySpeed * 4;
    default: return 0;
  }
}

// ✅ Get random word based on selection
function getRandomWord() {
  const lengthSelected = maxLetters.value;  // from <select id="maxLetters">
  const pool = wordListByLength[len] || [];  // chooses the correct list

  if (lengthSelected === "any") {
    for (const key in wordListByLength) {
      pool = pool.concat(wordListByLength[key]);
    }
  } else {
    const len = parseInt(lengthSelected);
    pool = wordListByLength[len] || [];
  }

  if (pool.length === 0) {
    alert("⚠️ No words available for this length.");
    return "";
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

// ✅ Show new word
function newWord() {
  currentWord = getRandomWord();
  wordInput.value = "";
  if (currentWord) {
    showLetterSequence(currentWord);
  }
}

// ✅ Replay word
function replayWord() {
  if (currentWord) {
    showLetterSequence(currentWord);
  }
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

// ✅ Speed control
speedSelect.addEventListener("change", () => {
  displaySpeed = parseInt(speedSelect.value);
});
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

// ✅ Startup
preloadImages();
newWord();
