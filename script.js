document.getElementById("wordInput").addEventListener("input", function() {
  const word = this.value.toLowerCase();
  const output = document.getElementById("output");
  output.innerHTML = ""; // clear previous output

  for (let char of word) {
    if (/[a-z]/.test(char)) { 
      let img = document.createElement("img");
      img.src = `images/${char}.png`; // ensure images folder exists
      img.alt = char;
      output.appendChild(img);
    }
  }
});
