const MOVES = ['rock', 'paper', 'scissors'];
const COMPUTER_NAMES = ['R2-D2', 'The Terminator', 'Optimus Prime', 'HAL', 'WALL-E'];

const randomIndex = num => Math.floor(Math.random() * num);

// Set computer name to random name from array
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

// Play the game
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');

let playerScore = 0;
let computerScore = 0;

rock.addEventListener('click', playRound);
paper.addEventListener('click', playRound);
scissors.addEventListener('click', playRound);

// Function to play 1 round of rock, paper, scissors
function playRound(event) {
    const playerMove = event.target.id;
    const computerMove = computerPlay();

    const result = checkResult(playerMove, computerMove);
    updateScores(result, playerMove, computerMove);

    if (isGameOver()) displayWinner();
}

// Function to check if game is over
function isGameOver() {
    if (playerScore === 5 || computerScore === 5) return true;
    return false;
}

// Function to generate random computer move
function computerPlay() {
    return MOVES[randomIndex(3)];
}

// Function to check whether win, lose or draw
function checkResult(playerMove, computerMove) {
    if ((playerMove === 'rock' && computerMove === 'paper') ||
        (playerMove === 'paper' && computerMove === 'scissors') ||
        (playerMove === 'scissors' && computerMove === 'rock')) {
        return 'lose';
    } else if (playerMove === computerMove) {
        return 'draw';
    } else {
        return 'win';
    }
}

// Function to update scores according to winner
function updateScores(result, playerMove, computerMove) {
    switch (result) {
        case 'win':
            playerScore++;
            playerScoreElement.innerText = playerScore;
            console.log(`You Win! ${playerMove} beats ${computerMove}`);
            break;
        case 'lose':
            computerScore++;
            computerScoreElement.innerText = computerScore;
            console.log(`You Lose! ${computerMove} beats ${playerMove}`);
            break;
        case 'draw':
            console.log(`It's a Draw! ${playerMove} draws with ${computerMove}`);
            break;
    }
}

// Function to display the winner of the game
function displayWinner() {
    if (playerScore > computerScore) {
        console.log('YOU WON THE GAME! :D')
    } else if (computerScore > playerScore) {
        console.log('YOU LOST THE GAME! :(')
    } else {
        console.log('IT\'S A DRAW');
    }
    console.log(`You won ${playerScore} ${playerScore > 1 ? 'rounds' : 'round'}.`);
    console.log(`Computer won ${computerScore} ${computerScore > 1 ? 'rounds' : 'round'}.`);
    console.log('Thanks for playing ;)');
}