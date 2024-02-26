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

    if (roundNumber <= 5) {
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
    window.location.reload();
  }
});
