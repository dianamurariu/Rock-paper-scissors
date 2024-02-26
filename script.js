document.addEventListener('DOMContentLoaded', function () {
  let computerScore = 0;
  let userScore = 0;
  let roundNumber = 1;

  const introductionSection = document.getElementById('introduction');
  const gameSection = document.getElementById('game-section');
  const roundNumberElement = document.getElementById('round-number');

  const movesImages = document.getElementById('moves-images');
  const chooseMessage = document.getElementById('choose-move');

  const moveComputerElement = document.getElementById('move-computer');
  const moveUserElement = document.getElementById('move-user');
  const optionsButtons = document.querySelectorAll('.btn-option');

  const btnCancel = document.getElementById('btn-cancel');
  const btnConfirm = document.getElementById('btn-confirm');

  btnCancel.addEventListener('click', cancelGame);
  btnConfirm.addEventListener('click', startGame);

  function showIntroduction() {
    introductionSection.classList.remove('hidden');
    gameSection.classList.add('hidden');
  }

  function hideIntroduction() {
    introductionSection.classList.add('hidden');
    gameSection.classList.remove('hidden');
  }

  function showMovesImages() {
    movesImages.classList.remove('hidden');
    chooseMessage.classList.add('hidden');
  }

  function hideMovesImages() {
    movesImages.classList.add('hidden');
    chooseMessage.classList.remove('hidden');
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

  optionsButtons.forEach((button) => {
    button.addEventListener('click', () => {
      userPlay(button.querySelector('img').src);
      showMovesImages();
    });
  });

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

    roundNumberElement.textContent = roundNumber;

    if (roundNumber <= 7) {
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
    hideMovesImages();
    hideIntroduction();
  }

  function resetGame() {
    computerScore = 0;
    userScore = 0;
    roundNumber = 1;
    updateScore();
    showIntroduction();
    hideMovesImages();
    window.location.reload();
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
});
