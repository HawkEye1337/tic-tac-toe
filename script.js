"use strict";
const status = document.querySelector(".game--status");
let playing = true;
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

//cell X,O
//index 0,1,2,3
const checkWinner = function () {
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i]; //row by row
    let a = game.board[winCondition[0]];
    let b = game.board[winCondition[1]];
    let c = game.board[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      status.textContent = `${game.currentPlayer.name} won`;
      playing = false;
    } else if (!game.board.includes("")) {
      status.textContent = `Draw`;
      playing = false;
    }
  }
  game.switchPlayers();
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
    console.log(e.target.getAttribute("data-cell"));
    const clickedCell = e.target;
    const clickedCellIndex = +clickedCell.getAttribute("data-cell");
    // game.board.forEach((cell, index) => {
    //   document.querySelector(`[data-cell="${index}"]`).textContent = cell;
    // });
    if (game.board[clickedCellIndex] === "") {
      game.board[clickedCellIndex] = game.currentPlayer.icon;
      clickedCell.textContent = game.board[clickedCellIndex];

      updateCurrentPlayer();
    }

    console.log(game.board);
    checkWinner();
  }
};

//add X or O
document.querySelector(".game--container").addEventListener("click", addMark);
//restart the game
document.querySelector(".game--restart").addEventListener("click", (e) => {
  console.log("working");
  console.log(game);
  playing = true;
  game.reset();
  game.board.forEach((cell, index) => {
    document.querySelector(`[data-cell="${index}"]`).textContent = cell;
  });

  status.textContent = `Current Player: ${game.currentPlayer.name}`;
  console.log(game.board);
});
