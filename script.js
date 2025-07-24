// Sample word list (replace/add more SgSL words)
const wordList = ["hello", "sgsl", "sign", "learn", "practice", "deaf", "love"];

let currentWord = "";

// Get elements
const output = document.getElementById("output");
const newWordBtn = document.getElementById("newWordBtn");
const replayBtn = document.getElementById("replayBtn");

// Function to show fingerspelling images one by one
function showWordAnimated(word) {
  output.innerHTML = "";
  let i = 0;

  function showNext() {
    if (i < word.length) {
      const char = word[i];
      if (/[a-z]/.test(char)) {
        const img = document.createElement("img");
        img.src = `images/${char}.png`;
        img.alt = char;
        output.appendChild(img);
      }
      i++;
      setTimeout(showNext, 600); // adjust speed (ms)
    }
  }

  showNext();
}

// Generate a new random word
function newWord() {
  currentWord = wordList[Math.floor(Math.random() * wordList.length)];
  showWordAnimated(currentWord);
}

// Replay current word
function replayWord() {
  if (currentWord) {
    showWordAnimated(currentWord);
  }
}

// Event Listeners
newWordBtn.addEventListener("click", newWord);
replayBtn.addEventListener("click", replayWord);

// Typing logic (if you want immediate fingerspelling of typed word)
document.getElementById("wordInput").addEventListener("input", function() {
  const word = this.value.toLowerCase();
  // You can keep this or disable it for practice mode
});
