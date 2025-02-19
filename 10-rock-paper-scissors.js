// JavaScript file for Rock Paper Scissors

let scores = JSON.parse(localStorage.getItem('scores')) || {wins:0, losses:0, ties:0};

    updateScoreText();
    let result = '';

    function playGame(userMove){
      
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