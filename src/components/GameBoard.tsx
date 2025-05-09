import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cell from "./Cell";
import "../styles/GameBoard.css";

const GameBoard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [board, setBoard] = useState<number[]>(Array(9).fill(0));
  const [boardName, setBoardName] = useState("");
  const [turn, setTurn] = useState<number>(1);
  const [winner, setWinner] = useState<number | null>(null);
  const navigate = useNavigate();

  // Memoized winner-checking function
  const checkWinner = useCallback((board: number[]): number | null => {
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

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] !== 0 && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }, []);

  useEffect(() => {
    if (id) {
      const loadGame = async () => {
        const response = await fetch(`http://localhost:5000/boards/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBoard(data.board.split("").map(Number));
          setBoardName(data.name);
          const xCount = data.board
            .split("")
            .filter((cell: string) => cell === "1").length;
          setTurn(xCount % 2 === 0 ? 1 : 2);
        } else {
          alert("Failed to load saved game");
        }
      };
      loadGame();
    }
  }, [id]);

  useEffect(() => {
    const winner = checkWinner(board);
    setWinner(winner);
  }, [board, checkWinner]); // Now depends on the memoized function

  const handleClick = (index: number) => {
    if (winner) return;

    const newBoard = [...board];
    if (newBoard[index] === 0) {
      newBoard[index] = turn;
      setBoard(newBoard);
      setTurn(turn === 1 ? 2 : 1);
    }
  };

  const saveGame = async () => {
    if (boardName.trim() === "") {
      alert("Please provide a name for the saved game");
      return;
    }

    const response = await fetch("http://localhost:5000/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board: board.join(""),
        name: boardName,
      }),
    });

    if (response.ok) {
      alert("Game saved successfully");
      navigate("/saved-games");
    } else {
      alert("Failed to save the game");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(0));
    setTurn(1);
    setWinner(null);
  };

  return (
    <div className="game-board">
      <div className="board">
        {board.map((cell: number, index: number) => (
          <Cell key={index} value={cell} onClick={() => handleClick(index)} />
        ))}
      </div>
      <input
        type="text"
        value={boardName}
        onChange={(e) => setBoardName(e.target.value)}
        placeholder="Enter game name"
      />
      <button onClick={saveGame}>Save Game</button>
      <button onClick={() => navigate("/saved-games")}>
        Go to Saved Games
      </button>
      <button onClick={resetGame}>Reset Game</button>

      {winner !== null && (
        <div className="winner-message">
          {winner === 1 ? "X wins!" : "O wins!"}
        </div>
      )}
    </div>
  );
};

export default GameBoard;
