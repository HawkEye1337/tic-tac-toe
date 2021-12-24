"use strict";

const status = document.querySelector(".game--status");
let playing = true;

//create players (with readonly properties)
const Player = (name, icon) => {
  return {
    get name() {
      return name;
    },
    get icon() {
      return icon;
    },
  };
};

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinner = function () {
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i]; //row by row
    let a = game.board[winCondition[0]]; //winning conditions 1st column
    let b = game.board[winCondition[1]];
    let c = game.board[winCondition[2]];
    //check if any spot from the winning conditions is empty that means no-one won yet
    if (a === "" || b === "" || c === "") {
      continue;
    }
    //check if any 3 spots are identical
    if (a === b && b === c) {
      status.textContent = `${game.currentPlayer.name} won`;
      playing = false;
    } //check for a draw (only happens if there's no empty spots on the board and the first condition is false)
    else if (!game.board.includes("")) {
      status.textContent = `Draw`;
      playing = false;
    }
  }
  //after checking switch players
};

const game = (() => {
  //private
  const board = new Array(9).fill("");
  const player1 = Player("player1", "X");
  const player2 = Player("player2", "O");
  let currentPlayer = player1;
  const switchPlayers = function () {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };
  const reset = function () {
    board.fill("");
  };
  //public
  return {
    get board() {
      return board;
    },
    get currentPlayer() {
      return currentPlayer;
    },
    get switchPlayers() {
      return switchPlayers;
    },
    reset,
  };
})();

function updateCurrentPlayer() {
  status.textContent = `Current player is: ${game.currentPlayer.name}`;
}
updateCurrentPlayer();

//add a mark on board click
const addMark = function (e) {
  if (playing) {
    const clickedCell = e.target;
    //save the index of the clicked cell (from HTML attributes)
    const clickedCellIndex = +clickedCell.getAttribute("data-cell");
    //check if the clicked cell is empty to avoid multiple entries
    if (game.board[clickedCellIndex] === "") {
      //add a mark (X,O) on the cell if it's empty (board then HTML)
      game.board[clickedCellIndex] = game.currentPlayer.icon;
      clickedCell.textContent = game.board[clickedCellIndex];
    }
    checkWinner();
    if (playing) {
      //Winner starts next round
      game.switchPlayers();
      updateCurrentPlayer();
    }
  }
};

//add X or O when empty cells are clicked
document.querySelector(".game--container").addEventListener("click", addMark);
//restart the game
document.querySelector(".game--restart").addEventListener("click", (e) => {
  playing = true;
  //clear the board in JS
  game.reset();
  //clear the board in HTML
  game.board.forEach((cell, index) => {
    document.querySelector(`[data-cell="${index}"]`).textContent = cell;
  });

  status.textContent = `Current Player: ${game.currentPlayer.name}`;
});
