# Word Express
Word Express is a word guessing game inspired by the iconic NYC subway. This game was developed to showcase during the Per Scholas Software Engineering bootcamp and demonstrate my mastery of the Document Object Model (DOM) and Browser Object Model (BOM).

In Word Express, players must guess the letters of random word ranging from 3 to 7 characters, which is generated using the Random Word API. The game leverages the Browser Object Model (BOM) to prompt users to enter letters.

## Building the Game
I opted to use an API for this game to create a dynamic and engaging gameplay experience and ensure the user would receive a new word on each play. However, in the event that a word retrieval from the API encounters an issue, I have created a small predefined array of words to serve as a backup.
```javascript
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
      const wordArr = ['cozy', 'snuggle', ..., 'blithe'];
      return wordArr[Math.floor(Math.random() * wordArr.length)];
  }
}
```

This code has been broken down into two modular scripts: 
- game.js, which includes functions to handle gameplay, such as getUserGuess and checkGuess
- style.js, which includes functions to style the game, including stylePage and createWordTiles

### game.js 
My use of the BOM comes into play in the getUserGuess function, which is actually a nested function of playGame: 
```javascript
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
```
This function utilizes the variable result, which is defined in its parent function, to track the previous result of the user's previous guess and present an informative prompt accordingly. The generic prompt, default, is utilized in cases such as the first play (no previous response) and an invalid response. 

After the user enters a response, the input is cleaned: 
```javascript
if (currentGuess != null || currentGuess != undefined) {
    currentGuess = currentGuess.trim();

    if (/[a-zA-Z]/.test(currentGuess)) {
    currentGuess = currentGuess.toLowerCase()[0];
    }
}
```

Assuming the guess is not null (user pressed 'Cancel' button in prompt) or undefined (user submitted empty response), the whitespace is trimmed. Then, it is checked that the response is a valid latin alphabet letter. If so, the first letter of the response is saved, in the event a user types multiple characters, and it is made lowercase for comparison to the random word letters.

From there, the guess undergoes thorough validation to account for potential scenarios such as prompt cancellation, inclusion of invalid characters, and comparison with the letters of the randomly generated word. The result variable is updated accordingly, which will inform the next prompt a user receives. If a user cancels, then a modal shows as an end to the game.
```javascript
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
```

### style.js
This game is styled almost entirely via the DOM model. Notable UI features include a 3D effect to the subway sign, letter tiles reminiscent of subway line names and a display of incorrect guesses, serving as a visual reminder of previous attempts for the user.

To create the illusion of a real, 3D sign, I utilized the CSS property perspective, a div representing the top edge of the sign, and a dropshadow.
![Start page](/screenshots/start.png?raw=true "Start page")
![Game page](/screenshots/game.png?raw=true "Game page")
![Success](/screenshots/confetti.png?raw=true "Success")
Upon successful completion of the word, confetti rains down.

This function loops through the letters of an array to generate tiles for each letter. I used a traditional for loop to set distinct colors for the tiles based on its index.
```javascript
function createWordTiles(letterArr) {
    ...
    for (let letter = 0; letter < letterArr.length; letter++) {
        const tileEl = document.createElement('div');
        tileContainer.appendChild(tileEl);
        tileEl.style.borderRadius = '100%';
        // I set the tile height and weight to be responsive to the user's screen size
        tileEl.style.height = `${appWidth() * .12}px`;
        tileEl.style.width = `${appWidth() * .12}px`;
        ...

        if (letter < 3) {
            tileEl.style.backgroundColor = 'var(--blue, #3438C7)';
        } else if (letter < 6) {
            tileEl.style.backgroundColor = 'var(--yellow, #FFC501)';
            tileEl.style.color = 'var(--black, #20181A)';
        } else {
            tileEl.style.backgroundColor = 'var(--pink, #A529A3)';
        }
        ...
    }
}
```

To present the user with a clear view of their previous guesses, I implemented a function that inserts each guess into the DOM in alphabetical order.
```javascript
function showIncorrectGuesses(currentGuess) {
    const incorrectGuessContainer = document.querySelector('#guesses-container');
    const incorrectGuess = document.createElement('div');
    const incorrectGuessText = document.createElement('span');

    incorrectGuess.classList.add('guess');
    ...
    incorrectGuess.appendChild(incorrectGuessText);

    // Sort alphabetically 
    const allIncorrectGuesses = document.querySelectorAll('.guess');

    if (!allIncorrectGuesses.length) {
        incorrectGuessContainer.appendChild(incorrectGuess);
    } else {
        for (let guess = 0; guess < allIncorrectGuesses.length; guess++) {
            const guessText = allIncorrectGuesses[guess].textContent.toLowerCase();

            if (guessText < currentGuess[0].toLowerCase()) {
                if (guess !== allIncorrectGuesses.length - 1) {
                    continue;
                } else {
                    incorrectGuessContainer.appendChild(incorrectGuess);
                }
            } else {
                incorrectGuessContainer.insertBefore(incorrectGuess, allIncorrectGuesses[guess]);
                break;
            }
        }
    }
}
```