import { stylePage, createWordTiles, showIncorrectGuesses, showModal, generateRandomConfetti } from "./style.js";

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
      console.log('Error:', error);
      const wordArr = ['cozy', 'snuggle', 'puzzle', 'whisper', 'halcyon', 'dazzle', 'meadow', 'silly', 'giggly', 'harmony', 'bubble', 'mirth', 'quaint', 'serene', 'lively', 'jovial', 'bliss', 'azure', 'zoo', 'blithe'];
      return wordArr[Math.floor(Math.random() * wordArr.length)];
  }
}

async function getLetters() {
  const randomWord = await getRandomWord();
  return randomWord.split('');
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
      case 'correct':
        prompt = 'Correct! Guess another letter:';
        break;
      case 'incorrect':
        prompt = 'Not quite! Guess another letter:';
        break;
      case 'repeated':
        prompt = `You've already guessed that! Guess another letter:`;
        break;
      default:
        prompt = 'Guess a letter:';
        break;
    }

    return window.prompt(prompt);
  }

  function checkGuess() {
    if (currentGuess === null) {
      result = 'canceled';
    } else if (currentGuess === '' || currentGuess === undefined || !(/[a-zA-Z]/.test(currentGuess))) {
      result = 'invalid';
    } else if (guessHistory.includes(currentGuess)) {
      result = 'repeated';
    } else {
      guessHistory.push(currentGuess);
      letterArr.includes(currentGuess)
        ? (result = 'correct')
        : (result = 'incorrect');
    }
    return result;
  }

  function updateUI() {
    if (result === 'correct') {
      const matchingTiles = document.querySelectorAll('.letter');

      matchingTiles.forEach(tile => {
        if (tile.textContent === currentGuess) {
          tile.style.display = 'block';
          correctGuesses++;
        }
      });

      if (correctGuesses === letterArr.length) {
        generateRandomConfetti();
      }
    } else if (result === 'incorrect') {
      showIncorrectGuesses(currentGuess);
    } else if (result === 'canceled') {
      showModal();
    }
  }

  async function handleGuess() {
    currentGuess = getUserGuess();

    if (currentGuess != null || currentGuess != undefined) {
      currentGuess = currentGuess.trim();

      if (/[a-zA-Z]/.test(currentGuess)) {
        currentGuess = currentGuess.toLowerCase()[0];
      }
    }

    checkGuess();
    updateUI();

    if (correctGuesses < letterArr.length && currentGuess !== null) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      handleGuess();
    }
  }

  const startButton = document.querySelector('#start');
  startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    document.querySelector('#instructions').style.display = 'none';
    document.querySelector('#tile-container').style.display = 'flex';
    document.querySelector('#guesses-container').style.display = 'flex';
    document.querySelector('#app').style.perspective = '21.5em';
    
    setTimeout(handleGuess, 200);
  });
}

playGame();