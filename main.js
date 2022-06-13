// DECLARE CONSTANTS
const MOVES = ['ROCK', 'PAPER', 'SCISSORS'];

window.addEventListener('load', () => {
    const title = document.getElementById('start-game');

    setInterval( () => {
        title.style.display = title.style.display === 'none' ? '' : 'none';
    }, 600);
}, false);

/*
* Dynamically change the size of the input text 
* box depending on the number of characters
*/
const nameInput = document.getElementById('player-name');
console.log(nameInput);
// Store player name in variable
let playerName = '';
// Event listener for typing keys
// Arrow function to resize input field
nameInput.addEventListener('keydown', event => {
    // Check how many characters typed, store char count and update player name
    const inputWord = event.target.value ? event.target.value : '';
    console.log(inputWord);
    const charCount = inputWord.length + 1;
    playerName = inputWord;

    // If less than placeholder text, set width to default value
    if (charCount <= 11) {
        nameInput.style.width = '288px';
        return
    }

    // Get current width of input field
    const inputWidth = nameInput.offsetWidth;
    // Check whether key is deleting or adding characters
    if (event.key === 'Delete' || event.key === 'Backspace') {
        nameInput.style.width = inputWidth - 24 + 'px';
    } else {
        nameInput.style.width = inputWidth + 24 + 'px';
    }
});

/*
* Take player name and pass it through to game
* then take player to the game screen
*/


const playButton = document.getElementById('play-button');
const rpsImages = document.getElementById('rps-image-container');

playButton.addEventListener('click', () => {
    playButton.style.display = 'none';
});

/*
* ------------------------------------------------------------------------
*                        ROCK PAPER SCISSORS
*                        SECTION: GAME PLAY
* ------------------------------------------------------------------------
*/

// const playButton = document.getElementById('play-button');
// playButton.addEventListener('click', () => console.log('clicked'));






// Function to generate random computer move
function computerPlay() {
    const randomIndex = num => Math.floor(Math.random() * num);
    return MOVES[randomIndex(3)];
}

// Function to play round of Rock Paper Scissors
function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toUpperCase();

    if ((playerSelection === 'ROCK' && computerSelection === 'PAPER') ||
        (playerSelection === 'PAPER' && computerSelection === 'SCISSORS') ||
        (playerSelection === 'SCISSORS' && computerSelection === 'ROCK')) {
        return 'lose';
    } else if (playerSelection === computerSelection) {
        return 'draw';
    } else {
        return 'win';
    }
}

// Function to play the game
function playGame() {
    let playerWins = 0;
    let computerWins = 0;

    const playerSelection = prompt('What is your move? (rock/paper/scissors)').toUpperCase();

    // Check valid entry by user
    if (playerSelection !== 'ROCK' &&
        playerSelection !== 'PAPER' &&
        playerSelection !== 'SCISSORS') {
        console.log('Invalid move');
        throw new Error('Invalid move');
    }

    const computerSelection = computerPlay();
    const result = playRound(playerSelection, computerSelection);

    switch (result) {
        case 'win':
            playerWins += 1;
            console.log(`You Win! ${playerSelection} beats ${computerSelection}`);
            break;
        case 'lose':
            computerWins += 1;
            console.log(`You Lose! ${computerSelection} beats ${playerSelection}`);
            break;
        case 'draw':
            console.log(`It's a Draw! ${playerSelection} draws with ${computerSelection}`);
            break;
    }


    // if (playerWins > computerWins) {
    //     console.log('YOU WON THE GAME! :D')
    // } else if (computerWins > playerWins) {
    //     console.log('YOU LOST THE GAME! :(')
    // } else {
    //     console.log('IT\'S A DRAW');
    // }
    // console.log(`You won ${playerWins} ${playerWins > 1 ? 'rounds' : 'round'}.`);
    // console.log(`Computer won ${computerWins} ${computerWins > 1 ? 'rounds' : 'round'}.`);
    // console.log('Thanks for playing ;)');
}