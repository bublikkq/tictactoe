const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

cells.forEach(cell => {
  cell.addEventListener('click', () => handleCellClick(cell));
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(cell) {
  const index = cell.getAttribute('data-index');
  if (gameBoard[index] === '' && gameActive) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (gameActive) {
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      status.textContent = `Player ${gameBoard[a]} wins!`;
      gameActive = false;
      return;
    }
  }
  if (!gameBoard.includes('')) {
    status.textContent = "It's a draw!";
    gameActive = false;
  }
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => (cell.textContent = ''));
  currentPlayer = 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
  gameActive = true;
}
