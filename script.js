let currentWord = "";
let currentSpeed = 1000; // default (medium)
let score = 0;

// Handle speed settings
function updateSpeed() {
  const baseSpeed = document.querySelector('input[name="speed"]:checked').value;
  let fineTune = 0;

  switch (baseSpeed) {
    case "slow": currentSpeed = 1500; break;
    case "medium": currentSpeed = 1000; break;
    case "fast": currentSpeed = 700; break;
    case "deaf": currentSpeed = 400; break;
  }

  const fineTuneValue = document.querySelector('input[name="fine"]:checked').value;
  if (fineTuneValue === "slower") currentSpeed += 200;
  if (fineTuneValue === "faster") currentSpeed -= 200;
}

// Start a new word
function startNewWord() {
  updateSpeed();
  document.getElementById("result").innerText = "";

  // Get max letters selection
  const maxLetters = document.querySelector('input[name="max"]:checked').value;
  let wordOptions = [];

  if (maxLetters === "any") {
    wordOptions = wordList;
  } else {
    const maxLen = parseInt(maxLetters);
    wordOptions = wordList.filter(w => w.length <= maxLen);
  }

  // Pick random word
  currentWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
  console.log("Selected word:", currentWord); // For debugging

  showLetterSequence(currentWord);
}

// Show each letter as PNG
function showLetterSequence(word) {
  let index = 0;
  const display = document.getElementById("letter-display");
  display.innerHTML = "";

  const interval = setInterval(() => {
    display.innerHTML = "";

    const char = word[index];
    const img = document.createElement("img");

    // Handle double letters
    if (index > 0 && word[index] === word[index - 1]) {
      img.src = `images/${char.toLowerCase()}${char.toLowerCase()}.png`;
    } else {
      img.src = `images/${char.toLowerCase()}.png`;
    }

    img.style.width = "250px";
    img.style.height = "250px";
    display.appendChild(img);

    index++;
    if (index >= word.length) {
      clearInterval(interval);
    }
  }, currentSpeed);
}

// Check answer
function checkAnswer() {
  const userAnswer = document.getElementById("answer").value.toUpperCase();

  if (userAnswer === currentWord) {
    score++;
    document.getElementById("result").innerText = "✅ Correct!";
  } else {
    document.getElementById("result").innerText = `❌ Wrong! The word was: ${currentWord}`;
  }
  document.getElementById("score").innerText = `Score: ${score}`;
}

// Replay the current word
function replayWord() {
  if (currentWord) {
    showLetterSequence(currentWord);
  }
}
