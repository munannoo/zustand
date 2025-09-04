import React, { useState } from "react";
import "./tictactoe.css";

export default function TicTacToe() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  let cellNo, value;

  const [player, setPlayer] = useState("O");

  function changePlayer() {
    if (player === "O") {
      setPlayer("X");
    } else {
      setPlayer("O");
    }
  }

  function Square({ cellNo, value }) {
    return (
      <button
        className="cellBtn cell"
        // disabled={value !== ""}
        onClick={() => handleSquareClick({ cellNo })}
      >
        {value}
      </button>
    );
  }

  function handleSquareClick({ cellNo }) {
    console.log(cellNo, board, player);
    if (board[cellNo - 1] !== "") {
      return;
    } else {
      let newBoard = [...board];
      newBoard[cellNo - 1] = player;
      setBoard(newBoard);
      changePlayer();
    }
  }

  return (
    <div>
      <h3>{player}'s turn</h3>
      <div className="board">
        <div className="row r1">
          <Square cellNo={1} value={board[0]} />
          <Square cellNo={2} value={board[1]} />
          <Square cellNo={3} value={board[2]} />
        </div>
        <div className="row r2">
          <Square cellNo={4} value={board[3]} />
          <Square cellNo={5} value={board[4]} />
          <Square cellNo={6} value={board[5]} />
        </div>
        <div className="row r3">
          <Square cellNo={7} value={board[6]} />
          <Square cellNo={8} value={board[7]} />
          <Square cellNo={9} value={board[8]} />
        </div>
      </div>
    </div>
  );
}
