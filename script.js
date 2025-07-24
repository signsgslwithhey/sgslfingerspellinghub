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

// Generate random letters for the "word"
function generateRandomWord() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let length = 3;

  if (maxLetters.value === "any") {
    length = Math.floor(Math.random() * 4) + 3; // random 3–6 letters
  } else {
    length = parseInt(maxLetters.value);
  }

  let word = "";
  for (let i = 0; i < length; i++) {
    word += letters[Math.floor(Math.]()
