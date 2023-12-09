function stylePage() {
    document.body.style.background = 'url(https://img.freepik.com/free-photo/white-brick-wall-textured-background_53876-148139.jpg?w=1800&t=st=1701993609~exp=1701994209~hmac=4b267c1fadafe942e05087790e7cff37f497f0b93e319a61fc1d448b6bd3cd0c)';
    document.body.style.backgroundRepeat = 'repeat';
    document.body.style.margin = '0 auto';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.fontFamily = 'Armino, sans-serif';


    const app = document.querySelector('#app');
    app.style.display = 'flex';
    app.style.flexDirection = 'column';
    app.style.width = '82%';
    app.style.perspective = '10em';

    const subwaySign = document.createElement('div');
    subwaySign.id = 'subway-sign';
    subwaySign.style.backgroundColor = 'var(--black, #20181A)';
    subwaySign.style.height = 'fit-content';
    subwaySign.style.display = 'flex';
    subwaySign.style.flexDirection = 'column';
    subwaySign.style.gap = '20px';
    subwaySign.style.transform = 'translateZ(5px)';
    subwaySign.style.boxShadow = '0px 19px 16px -2px #00000066';
    subwaySign.style.borderRadius = '2px';
    app.appendChild(subwaySign);

    const topEdgeOfSign = document.createElement('div');
    topEdgeOfSign.style.height = '16px';
    topEdgeOfSign.style.background = 'linear-gradient(#7A7A7C, #2E2F2F)';
    topEdgeOfSign.style.transform = 'translateY(2px) rotateX(39deg)';
    app.insertBefore(topEdgeOfSign, subwaySign);

    const horizontalLine = document.createElement('hr');
    horizontalLine.style.backgroundColor = 'var(--white, #FEFEFE)';
    horizontalLine.style.height = '3px';
    horizontalLine.style.width = '100%';
    horizontalLine.style.marginTop = '40px';
    subwaySign.appendChild(horizontalLine);

    const gameContainer = document.createElement('div');
    gameContainer.id = 'game-container';
    gameContainer.style.display = 'flex';
    gameContainer.style.flexDirection = 'column';
    gameContainer.style.color = '#FEFEFE';
    gameContainer.style.padding = '0 20px 20px';
    gameContainer.style.gap = '20px';
    subwaySign.appendChild(gameContainer);

    const headerContainer = document.createElement('div');
    headerContainer.id = 'header-container';
    headerContainer.style.display = 'flex';
    headerContainer.style.justifyContent = 'space-between';
    gameContainer.appendChild(headerContainer);

    const h1 = document.createElement('h1');
    h1.style.fontSize = '78px';
    h1.style.fontWeight = '700';
    h1.style.lineHeight = '80px';
    h1.style.width = '75%';
    h1.style.maxWidth = '600px';
    h1.textContent = 'Word Express-Lexicon';
    headerContainer.appendChild(h1);

    const startButton = document.createElement('button');
    startButton.title = 'Play game';
    startButton.style.borderRadius = '100%';
    startButton.style.width = '175px';
    startButton.style.height = '175px';
    startButton.style.backgroundColor = 'var(--yellow, #FFC501)';
    startButton.style.border = 'none';
    startButton.style.cursor = 'pointer';
    startButton.type = 'button';
    startButton.id = 'start';
    startButton.value = 'play game';
    startButton.innerHTML = '<img src="imgs/arrow.svg" alt="arrow pointing to top right corner" />';
    startButton.onmouseover = () => startButton.style.backgroundColor = '#e5b002';
    startButton.onmouseleave = () => startButton.style.backgroundColor = 'var(--yellow, #FFC501)';
    headerContainer.appendChild(startButton);

    const incorrectGuessContainer = document.createElement('div');
    incorrectGuessContainer.id = 'guesses-container';
    incorrectGuessContainer.style.maxWidth = '300px';
    incorrectGuessContainer.style.height = 'fit-content';
    incorrectGuessContainer.style.display = 'none';
    incorrectGuessContainer.style.justifyContent = 'flex-end';
    incorrectGuessContainer.style.flexWrap = 'wrap';
    incorrectGuessContainer.style.fontSize = '16px';
    incorrectGuessContainer.style.fontWeight = '500';
    incorrectGuessContainer.style.textTransform = 'uppercase';
    incorrectGuessContainer.style.gap = '6px';
    headerContainer.appendChild(incorrectGuessContainer);
}

function createWordTiles(letterArr) {
    const gameContainer = document.querySelector('#game-container');

    const tileContainer = document.createElement('div');
    tileContainer.id = 'tile-container';
    tileContainer.style.display = 'none';
    tileContainer.style.gap = '20px';
    gameContainer.appendChild(tileContainer);

    for (let letter = 0; letter < letterArr.length; letter++) {
        const tileEl = document.createElement('div');
        tileContainer.appendChild(tileEl);
        tileEl.style.borderRadius = '100%';
        tileEl.style.height = '140px';
        tileEl.style.width = '140px';
        tileEl.style.display = 'flex';
        tileEl.style.justifyContent = 'center';
        tileEl.style.alignItems = 'center';
        tileEl.style.textTransform = 'uppercase';
        tileEl.style.fontSize = '48px';
        tileEl.style.fontWeight = '700';

        if (letter < 3) {
            tileEl.style.backgroundColor = 'var(--blue, #3438C7)';
        } else if (letter < 6) {
            tileEl.style.backgroundColor = 'var(--yellow, #FFC501)';
            tileEl.style.color = 'var(--black, #20181A)';
        } else {
            tileEl.style.backgroundColor = 'var(--pink, #A529A3)';
        }

        const letterEl = document.createElement('p');
        letterEl.classList.add('letter');
        letterEl.textContent = letterArr[letter];
        letterEl.style.display = 'none';
        tileEl.appendChild(letterEl);
    }
}

function showIncorrectGuesses(currentGuess) {
    const incorrectGuessContainer = document.querySelector('#guesses-container');
    const incorrectGuess = document.createElement('div');
    const incorrectGuessText = document.createElement('span');

    incorrectGuess.classList.add('guess');
    incorrectGuess.style.backgroundColor = 'var(--red, #D82C2C)';
    incorrectGuess.style.height = '24px';
    incorrectGuess.style.width = '24px';
    incorrectGuess.style.borderRadius = '100%';
    incorrectGuess.style.display = 'flex';
    incorrectGuess.style.justifyContent = 'center';
    incorrectGuess.style.alignItems = 'center';
    incorrectGuessText.textContent = currentGuess[0].toLowerCase();
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

function showModal() {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.height = '100%';
    modal.style.width = '100%';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.flexDirection = 'column';
    modal.style.gap = '14px';
    modal.style.backgroundColor = 'var(--black-translucent, #20181A99)';
    document.body.appendChild(modal);

    const restartButton = document.createElement('button');
    restartButton.title = 'Restart';
    restartButton.style.width = '88px';
    restartButton.style.height = '88px';
    restartButton.style.backgroundColor = 'var(--off-white, #ede7e7)';
    restartButton.style.border = 'none';
    restartButton.style.borderRadius = '100%';
    restartButton.style.display = 'flex';
    restartButton.style.justifyContent = 'center';
    restartButton.style.alignItems = 'center';
    restartButton.style.cursor = 'pointer';
    restartButton.innerHTML = '<img src="imgs/reload.svg" alt="restart"/>';
    restartButton.onmouseover = () => restartButton.style.backgroundColor = '#ccc';
    restartButton.onmouseleave = () => restartButton.style.backgroundColor = 'var(--off-white, #ede7e7)';
    modal.addEventListener('click', () => location.reload());
    modal.appendChild(restartButton);
}

export { stylePage, createWordTiles, showIncorrectGuesses, showModal };