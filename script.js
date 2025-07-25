let currentWord = "";
let currentSpeed = 1000;
let score = 0;

function updateSpeed() {
  currentSpeed = 1000;
}

function startNewWord() {
  updateSpeed();
  document.getElementById("result").innerText = "";
  currentWord = wordList[Math.floor(Math.random() * wordList.length)];
  showLetterSequence(currentWord);
}

function showLetterSequence(word) {
  let index = 0;
  const display = document.getElementById("letter-display");
  display.innerHTML = "";

  const interval = setInterval(() => {
    display.innerHTML = "";
    const char = word[index];
    const img = document.createElement("img");

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

function checkAnswer() {
  const userAnswer = document.getElementById("answer").value.toUpperCase();
  if (userAnswer === currentWord) {
    score++;
    document.getElementById("result").innerText = "✅ Correct!";
  } else {
    document.getElementById("result").innerText = "❌ Wrong!";
  }
  document.getElementById("score").innerText = `Score: ${score}`;
}

function replayWord() {
  if (currentWord) {
    showLetterSequence(currentWord);
  }
}
