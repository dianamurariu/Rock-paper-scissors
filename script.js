document.addEventListener('DOMContentLoaded', function () {
  let computerScore = 0;
  let userScore = 0;
  let roundNumber = 1;

  const introductionSection = document.getElementById('introduction');
  const gameSection = document.getElementById('game-section');
  const roundNumberElement = document.getElementById('round-number');

  const moveComputerElement = document.getElementById('move-computer');
  const moveUserElement = document.getElementById('move-user');
  const optionsButtons = document.querySelectorAll('.btn-option');

  const btnCancel = document.getElementById('btn-cancel');
  const btnConfirm = document.getElementById('btn-confirm');

  btnCancel.addEventListener('click', cancelGame);
  btnConfirm.addEventListener('click', startGame);

  optionsButtons.forEach((button) => {
    button.addEventListener('click', () => {
      userPlay(button.querySelector('img').src);
    });
  });

  function showIntroduction() {
    introductionSection.classList.remove('hidden');
    gameSection.classList.add('hidden');
  }

  function userPlay(userMove) {
    moveComputerElement.src = '';
    moveUserElement.src = userMove;
    playRound();
  }

  function computerPlay() {
    const options = document.querySelectorAll('.options-game img');
    const randomIndex = Math.floor(Math.random() * options.length);
    const computerMove = options[randomIndex].src;
    moveComputerElement.src = computerMove;
  }

  function playRound() {
    const userMove = moveUserElement.src;
    computerPlay();
    const computerMove = moveComputerElement.src;

    if (
      (userMove.includes('rock') && computerMove.includes('scissors')) ||
      (userMove.includes('scissors') && computerMove.includes('paper')) ||
      (userMove.includes('paper') && computerMove.includes('rock'))
    ) {
      userScore++;
    } else if (userMove === computerMove) {
    } else {
      computerScore++;
    }
    updateScore();
    console.log(roundNumberElement);
    roundNumberElement.textContent = roundNumber;

    if (roundNumber < 5) {
      roundNumber++;
    } else {
      endGame();
      return;
    }
  }

  function updateScore() {
    const scoreElement = document.querySelector('.score span');
    scoreElement.innerHTML = `<p>${computerScore}</p><p>${userScore}</p>`;
  }
  function startGame() {
    introductionSection.classList.add('hidden');
    gameSection.classList.remove('hidden');
  }

  function endGame() {
    if (userScore > computerScore) {
      alert('Congratulations! You win the game!');
    } else if (userScore < computerScore) {
      alert('Computer wins the game. Better luck next time!');
    } else {
      alert("It's a tie game!");
    }
    resetGame();
  }

  function cancelGame() {
    alert('Game canceled!');
    resetGame();
  }

  function resetGame() {
    computerScore = 0;
    userScore = 0;
    roundNumber = 1;
    updateScore();
    showIntroduction();
  }
});

// const showIntroduction = () => {
//   const introductionMessage = `Welcome to Rock, Paper, Scissors Game!\n
//   Instructions:\n
//   - You will play against the computer for 5 rounds.
//   - Choose 'rock', 'paper', or 'scissors' when prompted.
//   - The winner of each round is determined by the game rules.
//   - Press 'Cancel' at any time to quit the game.`;

//   const userConfirmation = confirm(introductionMessage);

//   if (!userConfirmation) {
//     console.log('Game finished by the user.');
//     return false; // Indicate that the user decided to quit
//   }

//   return true; // Indicate that the user wants to continue with the game
// };

// const computerPlay = () => {
//   const random = Math.floor(Math.random() * 3);
//   switch (random) {
//     case 0:
//       return 'rock';
//     case 1:
//       return 'paper';
//     case 2:
//       return 'scissors';
//   }
// };
// const userPlay = () => {
//   let userInput;

//   do {
//     userInput = prompt('Enter your choice: rock, paper, or scissors');
//     // The user pressed cancel. Doesn't want to play or closed the game.
//     if (userInput === null) {
//       const userConfirmation = confirm(
//         'Are you sure you want to quit the game?'
//       );
//       if (userConfirmation) {
//         return null;
//       }
//     } else {
//       userInput = userInput.toLowerCase();

//       if (
//         userInput === 'rock' ||
//         userInput === 'paper' ||
//         userInput === 'scissors'
//       ) {
//         return userInput;
//       } else {
//         alert('Invalid choice, please type: rock, paper, or scissors.');
//       }
//     }
//   } while (true);
// };
// const winConditions = {
//   rock: 'scissors',
//   paper: 'rock',
//   scissors: 'paper',
// };

// const playRound = (playerSelection, computerSelection) => {
//   if (playerSelection === computerSelection) {
//     return 'It is a tie!';
//   } else if (winConditions[playerSelection] === computerSelection) {
//     return 'Round won!';
//   } else {
//     return 'Round lost!';
//   }
// };

// const game = () => {
//   if (!showIntroduction()) {
//     return; // End the game if the user decided to quit during the introduction
//   }

//   let scorePlayer = 0;
//   let scoreComputer = 0;

//   for (let i = 0; i < 5; i++) {
//     const playerSelection = userPlay();
//     // Check if the user canceled the game
//     if (playerSelection === null) {
//       console.log('Game canceled by the user.');
//       return;
//     }
//     const computerSelection = computerPlay();
//     const result = playRound(playerSelection, computerSelection);
//     console.log(
//       `Round: ${
//         i + 1
//       } : You threw: ${playerSelection.toUpperCase()} and the computer threw: ${computerSelection.toUpperCase()}. The result of this round is: ${result}`
//     );

//     if (result.includes('won')) {
//       scorePlayer++;
//     } else if (result.includes('lost')) {
//       scoreComputer++;
//     }

//     console.log(
//       `Current score - Your score: ${scorePlayer}, Computer's score: ${scoreComputer}`
//     );
//   }

//   console.log(
//     `Your final score: ${scorePlayer}, Computer's final score: ${scoreComputer}`
//   );

//   if (scorePlayer > scoreComputer) {
//     console.log('Congratulations! You won!');
//   } else if (scorePlayer < scoreComputer) {
//     console.log('Sorry! You lost!');
//   } else {
//     console.log("It's a tie!");
//   }
// };

// game();
