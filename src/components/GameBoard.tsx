import React, { useState } from 'react';
import Cell from './Cell';
import Controls from './Controls';

type Player = '' | 'X' | 'O';

const GameBoard: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState<Player'X');
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (index: number) => {
    if (gameOver || board[index] !== '') return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    if (checkWinner(newBoard)) {
      setGameOver(true);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setGameOver(false);
  };

  const checkWinner = (board: Player[]): boolean => {
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

    return winningCombinations.some(([a, b, c]) => {
      return board[a] && board[a] === board[b] && board[a] === board[c];
    });
  };

  return (
    <div className="game-board">
      <div className="board">
        {board.map((value, index) => (
          <Cell key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>
      <Controls resetGame={resetGame} />
    </div>
  );
};

export default GameBoard;