const MOVES = ['ROCK', 'PAPER', 'SCISSORS'];
const COMPUTER_NAMES = ['R2-D2', 'The Terminator', 'Optimus Prime', 'HAL', 'WALL-E'];

const randomIndex = num => Math.floor(Math.random() * num);
const computerName = COMPUTER_NAMES[randomIndex(COMPUTER_NAMES.length)]
const computerHeading = document.getElementById('computer-name-heading');
computerHeading.innerText = computerName;

// Declare blinking text variable to store interval id 
let displayInterval;

// Add blinking for 'start game' text
window.addEventListener('load', () => {
    const title = document.getElementById('start-game');

    // Set interval to display 'start game' on timer
    displayInterval = setInterval( () => {
        title.style.display = title.style.display === 'none' ? '' : 'none';
    }, 600);
}, false);

// Dynamically change the size of the input text 
const nameInput = document.getElementById('player-name');
let playerName = '';

// Event listener for typing keys
nameInput.addEventListener('keyup', event => {
    // Check how many characters typed, store char count and update player name
    const inputWord = event.target.value ? event.target.value : '';
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

// Hide start screen when 'start game' clicked
const startScreen = document.getElementById('start-screen-container');
const startButton = document.getElementById('start-button');
const playerNameHeading = document.getElementById('player-name-heading');

startButton.addEventListener('click', closeStartScreen);
nameInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') closeStartScreen();
})

function closeStartScreen() {
    startScreen.classList.remove('show');
    // Stop text flashing 
    clearInterval(displayInterval);
    if (playerName) playerNameHeading.innerText = playerName;
}



const playButton = document.getElementById('play-button');
const rpsImages = document.getElementById('rps-image-container');

playButton.addEventListener('click', () => {
    playButton.style.display = 'none';
});


// const playButton = document.getElementById('play-button');
// playButton.addEventListener('click', () => console.log('clicked'));


// Function to generate random computer move
function computerPlay() {
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