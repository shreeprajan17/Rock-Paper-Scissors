// JavaScript file for Rock Paper Scissors

let scores = JSON.parse(localStorage.getItem('scores')) || {wins:0, losses:0, ties:0};

updateScoreText();
let result = '';

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r')
    playGame('rock');
  else if (event.key === 'p')
    playGame('paper');
  else if (event.key === 's')
    playGame('scissors');
  else if(event.key === 'a') 
    autoPlay();
  else if (event.key === 'Backspace')
    resetPrompt();
})

document.querySelector('.js-rock-button')
  .addEventListener('click', () => playGame('rock'));

document.querySelector('.js-paper-button')
  .addEventListener('click', () => playGame('paper'));

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => playGame('scissors'));

const autoPlayElement = document.querySelector('.js-autoplay-button');
autoPlayElement.addEventListener('click', () => autoPlay());

const resetElement = document.querySelector('.js-reset-button');
resetElement.addEventListener('click', () => resetPrompt());

function playGame(userMove) {
  
  let computerMove = getComputerMove();
  if (userMove === 'rock'){
    if (computerMove == 'rock'){
      scores.ties++;
      result = 'tie';
    }
    if (computerMove == 'paper'){
      scores.losses++;
      result = 'lose';
    }
    if (computerMove == 'scissors'){
      scores.wins++;
      result = 'win';
    }
  }

  else if (userMove === 'paper'){
    if (computerMove == 'paper'){
      scores.ties++;
      result = 'tie';
    }
    if (computerMove == 'rock'){
      scores.wins++;
      result = 'win';
    }
    if (computerMove == 'scissors'){
      scores.losses++;
      result = 'lose';
    }
  }

  else if (userMove === 'scissors'){
    if (computerMove == 'paper'){
      scores.wins++;
      result = 'win';
    }
    if (computerMove == 'rock'){
      scores.losses++;
      result = 'lose';
    }
    if (computerMove == 'scissors'){
      scores.ties++;
      result = 'tie';
    }
  }

  localStorage.setItem('scores', JSON.stringify(scores));

  updateScoreText();

  let resultText = document.querySelector('.game-result');
  resultText.innerHTML = `You ${result}.`;

  let statsText = document.querySelector('.result-stats');
  statsText.innerHTML = `You 
  <img src="images/${userMove}-emoji.png" class="move-icon">
  <img src="images/${computerMove}-emoji.png" class="move-icon">
  Computer`
}

function updateScoreText(){
  let scoreText = document.querySelector('.score-text');
  scoreText.innerHTML = `Wins: ${scores.wins}, Losses: ${scores.losses}, Ties: ${scores.ties}`;
}

function getComputerMove(){
  let computerMove = Math.random();
  if (computerMove < 1/3){
    computerMove = 'rock';
  }
  else if (computerMove < 2 / 3){
    computerMove = 'paper';
  }
  else{
    computerMove = 'scissors';
  }
  return computerMove;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function() {
      const playerMove = getComputerMove();
      playGame(playerMove);
    }, 500);

    isAutoPlaying = true;
    autoPlayElement.innerText = 'Stop Playing';
    autoPlayElement.classList.add('is-auto-playing');
  }
  else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoPlayElement.innerText = 'Auto Play';
    autoPlayElement.classList.remove('is-auto-playing');
  }
}

function resetPrompt() {
  const resetPromptElement = document.querySelector('.reset-prompt');
  resetPromptElement.innerHTML = `
    <p>Are you sure you want to reset the score?</p>
    <button class="yes-button">Yes</button>
    <button class="no-button">No</button>
  `
  document.querySelector('.yes-button')
    .addEventListener('click', () => {
      resetScore();
      resetPromptElement.innerHTML = '';
    });
  
  document.querySelector('.no-button')
    .addEventListener('click', () => resetPromptElement.innerHTML = '');
}

function resetScore() {
  scores.wins = 0;
  scores.losses = 0;
  scores.ties = 0;
  localStorage.removeItem('scores');
  updateScoreText();
}
