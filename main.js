const MOVES = ['rock', 'paper', 'scissors'];
const COMPUTER_NAMES = ['R2-D2', 'The Terminator', 'Optimus Prime', 'HAL', 'WALL-E'];

const randomIndex = num => Math.floor(Math.random() * num);
const getElement = id => document.getElementById(id);
const capitalizeString = string => string.charAt(0).toUpperCase() + string.slice(1);

// Set computer name to random name from array
const computerName = COMPUTER_NAMES[randomIndex(COMPUTER_NAMES.length)]
const computerHeading = getElement('computer-name-heading');
computerHeading.innerText = computerName;

// Declare blinking text variable to store interval id 
let displayInterval;

// Add blinking for 'start game' text
window.addEventListener('load', () => {
    const title = getElement('start-game');

    // Set interval to display 'start game' on timer
    displayInterval = setInterval( () => {
        title.style.display = title.style.display === 'none' ? '' : 'none';
    }, 600);
}, false);

// Dynamically change the size of the input text 
const nameInput = getElement('player-name');
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
const startScreen = getElement('start-screen-container');
const startButton = getElement('start-button');
const playerNameHeading = getElement('player-name-heading');

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

// Pop-up to show round result
const roundResult = getElement('round-winner-container');
const resultHeading = getElement('round-result-heading');
const emoji = getElement('emoji');
const playNextRound = getElement('play-button');
playNextRound.addEventListener('click', () => roundResult.classList.remove('show'));

// Play the game
const playerScoreElement = getElement('player-score');
const computerScoreElement = getElement('computer-score');
const rock = getElement('rock');
const paper = getElement('paper');
const scissors = getElement('scissors');

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
    
    displayResult();
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
            resultHeading.innerText = `${capitalizeString(playerMove) } beats ${computerMove}, you win!`
            emoji.innerText = String.fromCodePoint(0x1F929);
            break;
        case 'lose':
            computerScore++;
            computerScoreElement.innerText = computerScore;
            resultHeading.innerText = `${capitalizeString(computerMove) } beats ${playerMove}, you lose!`
            emoji.innerText = String.fromCodePoint(0x1F92C);
            break;
        case 'draw':
            resultHeading.innerText = `${capitalizeString(playerMove)} draws with ${computerMove}, it's a draw!`
            emoji.innerText = String.fromCodePoint(0x1F61B);
            break;
    }
}

// Function to display the results of game round
function displayResult() {
    roundResult.classList.add('show');
}

// Function to display the winner of the game
function displayWinner() {
    resultHeading.innerText = 'GAME OVER';
    emoji.style.fontSize = '7rem'

    if (playerScore > computerScore) {
        emoji.innerText = 'You won!';
        emoji.style.color = 'var(--yellow)'
    } else {
        emoji.innerText = 'You lost!';
        emoji.style.color = 'var(--dark-red)'
    }

    playNextRound.innerHTML = "<a href='index.html'>PLAY AGAIN</a>";
}