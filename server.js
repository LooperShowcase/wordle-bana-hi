const express = require("express");
const app = express();
const ourWord = "world";

app.get("/wordle/:guess", function (req, res) {
  let ourWordMap = {
    w: 1,
    o: 1,
    r: 1,
    l: 1,
    d: 1,
  };
  let resArr = ["", "", "", "", ""];
  const word = req.params.guess.toLocaleLowerCase();
  for (let i = 0; i < word.length; i++) {
    if (word[i] === ourWord[i]) {
      resArr[i] = "green";
      let curLetter = ourWord[i];
      ourWordMap[curLetter]--;
    }
  }
  for (let i = 0; i < word.length; i++) {
    if (word[i] !== ourWord[i]) {
      let curLetter = word[i];

      if (ourWordMap[curLetter] === undefined) {
        resArr[i] = "grey";
      } else if (ourWordMap[curLetter] > 0) {
        resArr[i] = "orange";
        ourWordMap[curLetter]--;
      } else {
        resArr[i] = "grey";
      }
    }
  }
  res.send(resArr);
});
app.use(express.static("public"));
app.listen(3000);
