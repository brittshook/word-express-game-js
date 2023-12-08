// Create your game here!
const randomWordAPI = wordLength => `https://random-word-api.herokuapp.com/word?length=${wordLength}`;

async function getRandomWord() {
    try {
      const randomWordArr = [];

      for (let length = 3; length <= 7; length++) {
        const response = await fetch(randomWordAPI(length));
        const randomWord = await response.json();
        randomWordArr.push(randomWord[0]);
      }

      return randomWordArr[Math.floor(Math.random() * randomWordArr.length)];
    } catch (error) {
        console.log("Error:", error);

        const wordArr = [
          "cozy",
          "snuggle",
          "puzzle",
          "whisper",
          "halcyon",
          "dazzle",
          "meadow",
          "silly",
          "giggly",
          "harmony",
          "bubble",
          "mirth",
          "quaint",
          "serene",
          "lively",
          "jovial",
          "bliss",
          "azure",
          "zoo",
          "blithe"
        ];

        return wordArr[Math.floor(Math.random() * wordArr.length)];
    }
}

async function getLetters() {
    const randomWord = await getRandomWord();
    return randomWord.split("");
}

function stylePage() {
  document.body.style.background = 'url(https://img.freepik.com/free-photo/white-brick-wall-textured-background_53876-148139.jpg?w=1800&t=st=1701993609~exp=1701994209~hmac=4b267c1fadafe942e05087790e7cff37f497f0b93e319a61fc1d448b6bd3cd0c)';
  document.body.style.backgroundRepeat = 'repeat';
  document.body.style.margin = "0 auto";
  document.body.style.display = "flex";
  document.body.style.justifyContent = "center";
  document.body.style.alignItems = "center";

  const app = document.querySelector("#app");
  app.style.display = "flex";
  app.style.flexDirection = "column";
  app.style.width = "82%";
  app.style.perspective = "10em";

  const subwaySign = document.createElement("div");
  subwaySign.id = "subway-sign";
  subwaySign.style.backgroundColor = "#20181A";
  subwaySign.style.height = "fit-content";
  subwaySign.style.display = "flex";
  subwaySign.style.flexDirection = "column";
  subwaySign.style.gap = "20px";
  subwaySign.style.transform = "translateZ(5px)";
  subwaySign.style.boxShadow = "0px 19px 16px -2px #00000066";
  subwaySign.style.borderRadius = "2px";
  app.appendChild(subwaySign);

  const topEdgeOfSign = document.createElement("div");
  topEdgeOfSign.style.height = "16px";
  topEdgeOfSign.style.background = "linear-gradient(#7A7A7C, #2E2F2F)";
  topEdgeOfSign.style.transform = "translateY(2px) rotateX(39deg)";
  app.insertBefore(topEdgeOfSign, subwaySign);

  const horizontalLine = document.createElement("hr");
  horizontalLine.style.backgroundColor = "#FEFEFE";
  horizontalLine.style.height = "3px";
  horizontalLine.style.width = "100%";
  horizontalLine.style.marginTop = "40px";
  subwaySign.appendChild(horizontalLine);

  const gameContainer = document.createElement("div");
  gameContainer.id = 'game-container';
  gameContainer.style.display = "flex";
  gameContainer.style.flexDirection = "column";
  gameContainer.style.fontFamily = "Armino, sans-serif";
  gameContainer.style.color = "#FEFEFE";
  gameContainer.style.padding = "0 20px 20px";
  gameContainer.style.gap = "20px";
  subwaySign.appendChild(gameContainer);

  const headerContainer = document.createElement("div");
  headerContainer. id = "header-container";
  headerContainer.style.display = "flex";
  headerContainer.style.justifyContent = "space-between";
  gameContainer.appendChild(headerContainer);

  const h1 = document.createElement("h1");
  h1.style.fontSize = "78px";
  h1.style.fontWeight = "700";
  h1.style.lineHeight = "80px";
  h1.style.width = "75%";
  h1.style.maxWidth = "600px";
  h1.textContent = "Word Express-Lexicon";
  headerContainer.appendChild(h1);

  const startButton = document.createElement("button");
  startButton.style.borderRadius = "100%";
  startButton.style.width = "175px";
  startButton.style.height = "175px";
  startButton.style.backgroundColor = "#FFC501";
  startButton.style.border = "none";
  startButton.style.cursor = "pointer";
  startButton.type = "button";
  startButton.id = "start";
  startButton.value = "play game";
  startButton.innerHTML = `<img src="imgs/arrow.svg" alt="arrow pointing to top right corner" />`;
  headerContainer.appendChild(startButton);

  const incorrectGuessContainer = document.createElement("div");
  incorrectGuessContainer.id = "guesses-container";
  incorrectGuessContainer.style.maxWidth = "300px";
  incorrectGuessContainer.style.display = "none";
  incorrectGuessContainer.style.justifyContent = "flex-end";
  incorrectGuessContainer.style.fontSize = "16px";
  incorrectGuessContainer.style.textTransform = "uppercase";
  incorrectGuessContainer.style.gap = "6px";
  headerContainer.appendChild(incorrectGuessContainer);
}

function createWordTiles(letterArr) {
  const gameContainer = document.querySelector('#game-container');

  const tileContainer = document.createElement("div");
  tileContainer.id = 'tile-container';
  tileContainer.style.display = "none";
  tileContainer.style.gap = "20px";
  gameContainer.appendChild(tileContainer);

  const tileColors = ['#3438C7', '#FFC501', '#A529A3'];
  for (let letter = 0; letter < letterArr.length; letter++) {
    const tileEl = document.createElement("div");
    tileContainer.appendChild(tileEl);
    tileEl.style.borderRadius = "100%";
    tileEl.style.height = "140px";
    tileEl.style.width = "140px";
    tileEl.style.display = "flex";
    tileEl.style.justifyContent = "center";
    tileEl.style.alignItems = "center";
    tileEl.style.textTransform = "uppercase";
    tileEl.style.fontSize = "48px";
    tileEl.style.fontWeight = "700";

    if (letter < 3) {
      tileEl.style.background = tileColors[0];
    } else if (letter < 6) {
      tileEl.style.background = tileColors[1];
    } else {
      tileEl.style.background = tileColors[2];
    }

    const letterEl = document.createElement("p");
    letterEl.classList.add("letter");
    letterEl.textContent = letterArr[letter];
    letterEl.style.display = "none";
    tileEl.appendChild(letterEl);
  }
}

async function playGame() {
  stylePage();

  const letterArr = await getLetters();
  createWordTiles(letterArr);

  const guessHistory = [];
  let correctGuesses = 0;
  let currentGuess = null;
  let result;

  function getUserGuess() {
    let prompt;

    switch (result) {
      case "correct":
        prompt = "Correct! Guess another letter:";
        break;
      case "incorrect":
        prompt = "Not quite! Guess another letter:";
        break;
      case "repeated":
        prompt = "You've already guessed that! Guess another letter:";
        break;
      default:
        prompt = "Guess a letter:";
        break;
    }

    return window.prompt(prompt)[0];
  }

  function checkGuess() {
    if (currentGuess === null) {
      result = "canceled";
    } else if (guessHistory.includes(currentGuess)) {
      result = "repeated";
    } else {
      guessHistory.push(currentGuess);
      letterArr.includes(currentGuess)
        ? (result = "correct")
        : (result = "incorrect");
    }
    return result;
  }

  function updateUI() {
    if (result === "correct") {
      const matchingTiles = document.querySelectorAll(".letter");

      matchingTiles.forEach((tile) => {
        if (tile.textContent === currentGuess) {
          tile.style.display = "block";
          correctGuesses++;
        }
      });

      if (correctGuesses === letterArr.length) {
        // success ui here
      }
    } else if (result === "incorrect") {
      const incorrectGuessContainer = document.querySelector("#guesses-container");
      const incorrectGuess = document.createElement("div");
      incorrectGuess.style.background = "red";
      incorrectGuess.style.height = "24px";
      incorrectGuess.style.width = "24px";
      incorrectGuess.style.borderRadius = "100%";
      incorrectGuess.style.display = "flex";
      incorrectGuess.style.justifyContent = "center";
      incorrectGuess.style.alignItems = "center";
      incorrectGuessContainer.appendChild(incorrectGuess);

      const incorrectGuessText = document.createElement("span");
      incorrectGuess.textContent = currentGuess;
      incorrectGuess.appendChild(incorrectGuessText);
    }
  }

  async function handleGuess() {
    currentGuess = getUserGuess().toLowerCase();
    checkGuess();
    updateUI();

    console.log(currentGuess, correctGuesses, guessHistory);
    console.log(guessHistory.includes(currentGuess));
    console.log(correctGuesses < letterArr.length && currentGuess !== null);

    if (correctGuesses < letterArr.length && currentGuess !== null) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      handleGuess();
    }
  }

  const startButton = document.querySelector("#start");
  startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    document.querySelector('#tile-container').style.display = "flex";
    document.querySelector('#guesses-container').style.display = "flex";
    document.querySelector('#app').style.perspective = "16em";
    
    setTimeout(handleGuess, 200);
  });
}

playGame();