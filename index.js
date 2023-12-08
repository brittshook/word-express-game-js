// Create your game here!
const randomWordAPI = "https://random-word-api.herokuapp.com/word";

async function getRandomWord() {
    try {
        const response = await fetch(randomWordAPI);
        const randomWord = await response.json();
        return randomWord[0];
    } catch (error) {
        console.log("Error:", error);
        const wordArr = [
            "serendipity",
            "cozy",
            "nebulous",
            "snuggle",
            "mellifluous",
            "puzzle",
            "quixotic",
            "whisper",
            "jubilant",
            "halcyon",
            "dazzle",
            "meadow",
            "ephemeral",
            "silly",
            "mellotron",
            "resplendent",
            "giggly",
            "capricious",
            "harmony",
            "bubble",
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

  const subwaySign = document.querySelector('#app');
  subwaySign.style.backgroundColor = "#121212";
  subwaySign.style.height = "fit-content";
  subwaySign.style.width = "82%";
  subwaySign.style.display = "flex";
  subwaySign.style.flexDirection = "column";
  subwaySign.style.gap = "20px";

  const horizontalLine = document.createElement("hr");
  horizontalLine.style.backgroundColor = "#FEFEFE";
  horizontalLine.style.height = "3px";
  horizontalLine.style.width = "100%";
  horizontalLine.style.marginTop = "60px";
  subwaySign.appendChild(horizontalLine);

  const gameContainer = document.createElement("div");
  gameContainer.id = 'game-container';
  gameContainer.style.display = "flex";
  gameContainer.style.flexDirection = "column";
  gameContainer.style.fontFamily = "Armino, sans-serif";
  gameContainer.style.color = "#FEFEFE";
  gameContainer.style.padding = "20px";
  subwaySign.appendChild(gameContainer);

  const headerWithButton = document.createElement("div");
  headerWithButton.style.display = "flex";
  headerWithButton.style.justifyContent = "space-between";
  gameContainer.appendChild(headerWithButton);

  const h1 = document.createElement("h1");
  h1.style.fontSize = "78px";
  h1.style.fontWeight = "700";
  h1.style.lineHeight = "80px";
  h1.style.width = "75%";
  h1.style.maxWidth = "600px";
  h1.textContent = "Word Express-Lexicon";
  headerWithButton.appendChild(h1);

  const startButton = document.createElement("button");
  startButton.style.borderRadius = "100%";
  startButton.style.width = "175px";
  startButton.style.height = "175px";
  startButton.style.cursor = 'pointer';
  startButton.type = "button";
  startButton.id = "start";
  startButton.value = "play game";
  startButton.textContent = "Play Game";
  headerWithButton.appendChild(startButton);
}

function createWordTiles(letterArr) {
  const gameContainer = document.querySelector('#game-container');
  const tileContainer = document.createElement("div");
  tileContainer.id = 'tile-container';
  tileContainer.style.display = "none";
  tileContainer.style.gap = "20px";
  gameContainer.appendChild(tileContainer);

  for (const letter of letterArr) {
    const tileEl = document.createElement("div");
    tileContainer.appendChild(tileEl);
    tileEl.style.background = "brown";
    tileEl.style.borderRadius = "100%";
    tileEl.style.height = "140px";
    tileEl.style.width = "140px";
    tileEl.style.display = "flex";
    tileEl.style.justifyContent = "center";
    tileEl.style.alignItems = "center";
    tileEl.style.textTransform = "uppercase";
    tileEl.style.fontSize = "48px";
    tileEl.style.fontWeight = "700";

    const letterEl = document.createElement("p");
    letterEl.classList.add("letter");
    letterEl.textContent = letter;
    letterEl.style.display = "none";
    tileEl.appendChild(letterEl);
  }
}

async function playGame() {
  stylePage();
  const letterArr = await getLetters();
  console.log(letterArr);
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

    return window.prompt(prompt);
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
    }

    if (correctGuesses === letterArr.length) {
      document.body.style.backgroundColor = "green";
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
    startButton.style.display = 'none';
    document.querySelector('#tile-container').style.display = 'flex';
    
    setTimeout(handleGuess, 200);
  });
}

playGame();