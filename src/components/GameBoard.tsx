import React, { useState } from "react";
import Cell from "./Cell";
import "../styles/GameBoard.css";

const initialBoard = Array(9).fill(0);

const GameBoard: React.FC = () => {
  const [board, setBoard] = useState<number[]>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);
  const [winner, setWinner] = useState<number | null>(null);

  const checkWinner = (updatedBoard: number[]) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        updatedBoard[a] !== 0 &&
        updatedBoard[a] === updatedBoard[b] &&
        updatedBoard[a] === updatedBoard[c]
      ) {
        return updatedBoard[a];
      }
    }

    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] !== 0 || winner !== null) return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);

    const newWinner = checkWinner(updatedBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer(1);
    setWinner(null);
  };

  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      <div className="game-board">
        {board.map((cellValue, index) => (
          <Cell
            key={index}
            value={cellValue}
            onClick={() => handleCellClick(index)}
          />
        ))}
      </div>
      {winner && <p className="winner">Player {winner} wins!</p>}
      {!winner && board.every((cell) => cell !== 0) && (
        <p className="winner">It's a draw!</p>
      )}
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default GameBoard;
