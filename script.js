// ✅ Common vocabulary word list (replace or expand as needed)
const wordList = [
  "CAT", "DOG", "HOUSE", "BOOK", "APPLE", "PIZZA", "BALL", "LOVE", 
  "HAPPY", "TEACH", "SCHOOL", "FOOD", "THANK", "HELP", "FRIEND",
  "WATER", "MONEY", "PHONE", "DEAF", "SIGN", "HELLO", "GOOD", "BAD"
];

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
const checkBtn = document.getElementById("checkBtn");

// ✅ Show fingerspelling images (supporting double-letter images)
function showWordAnimated(word) {
  output.innerHTML = "";
  let i = 0;

  function showNext() {
    if (i < word.length) {
      let char = word[i];
      let img = document.createElement("img");

      // Check for double letter (e.g., ZZ, LL)
      if (i < word.length - 1 && word[i] === word[i + 1]) {
        img.src = `images/${char.toLowerCase()}${char.toLowerCase()}.png`; // e.g., zz.png
        img.alt = char + char;
        i++; // Skip next because it's combined
      } else {
        img.src = `images/${char.toLowerCase()}.png`;
        img.alt = char;
      }

      output.appendChild(img);
      i++;
      setTimeout(showNext, displaySpeed);
    }
  }

  showNext();
}

// ✅ Generate a random word based on maximum letters
function getRandomWord() {
  const filterLength = maxLetters.value === "any" ? null : parseInt(maxLetters.value);
  let filtered = wordList;
  if (filterLength) {
    filtered = wordList.filter(word => word.length <= filterLength);
  }
  return filtered[Math.floor(Math.random() * filtered.length)];
}

// ✅ Start a new word
function newWord() {
  currentWord
