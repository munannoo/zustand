import useTicTacToeStore from "../store/tictactoe-store";
import "./tictactoe.css";

export default function TicTacToe() {
  const {
    board,
    setBoard,
    player,
    setPlayer,
    winner,
    setWinner,
    resetGame,
    checkWinner,
  } = useTicTacToeStore();

  function Square({ cellNo, value }) {
    return (
      <button
        className="cellBtn cell"
        disabled={winner ? true : false}
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
      if (winner) return;
      let newBoard = [...board];
      newBoard[cellNo - 1] = player;
      setBoard(newBoard);
      setPlayer();
      checkWinner(newBoard);
    }
  }

  return (
    <div>
      <h3>{winner ? `${winner} wins! 🎉` : `${player}'s turn`}</h3>

      {winner ? (
        <button onClick={resetGame} className="resetBtn">
          Reset
        </button>
      ) : null}

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
