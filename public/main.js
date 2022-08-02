const NUMBER_OF_WORDS = 6;
const NUMBER_OF_CHARS = 5;
let words = document.getElementById("container");
for (let i = 0; i < NUMBER_OF_WORDS; i++) {
  let singleWord = document.createElement("div");
  singleWord.className = "word";
  for (let j = 0; j < NUMBER_OF_CHARS; j++) {
    let singleChar = document.createElement("div");
    singleChar.className = "char";
    singleWord.appendChild(singleChar);
  }
  words.appendChild(singleWord);
}
let curentWord = 0;
let currentChar = 0;
document.addEventListener("keydown", async function (event) {
  if (event.key === "Backspace") {
    if (currentChar > 0) {
      let wordDiv = words.children[curentWord];
      let CharToDelet = wordDiv.children[currentChar - 1];
      CharToDelet.innerHTML = "";
      currentChar--;
      animateCSS(wordDiv, "swing");
    }
  } else if (event.key === "Enter") {
    if (currentChar === 5) {
      let wordDiv = words.children[curentWord];
      animateCSS(wordDiv, "headShake");
      const word = getWord();
      const results = await (await fetch("/wordle/" + word)).json();
      for (let i = 0; i < results.length; i++) {
        wordDiv.children[i].style.backgroundColor = results[i];
      }
      curentWord++;
      currentChar = 0;
    }
  } else if (currentChar < 5 && isLetter(event.key)) {
    let wordDiv = words.children[curentWord];
    let charDiv = wordDiv.children[currentChar];
    charDiv.innerHTML = event.key.toUpperCase();
    currentChar++;
  }
});
function getWord() {
  let word = "";
  let myGuess = words.children[curentWord];
  for (let i = 0; i < myGuess.children.length; i++) {
    word = word + myGuess.children[i].innerHTML;
  }
  return word;
}
const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;

    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    element.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  });

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}
