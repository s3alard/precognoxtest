import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/SavedGames.css";

interface SavedGame {
  id: number;
  name: string;
  board: string;
}

const SavedGames: React.FC = () => {
  const [savedGames, setSavedGames] = useState<SavedGame[]>([]);

  useEffect(() => {
    const fetchSavedGames = async () => {
      const response = await fetch("http://localhost:5000/boards");
      if (response.ok) {
        const data = await response.json();
        setSavedGames(data);
      } else {
        alert("Failed to fetch saved games");
      }
    };
    fetchSavedGames();
  }, []);

  const deleteGame = async (id: number) => {
    const response = await fetch(`http://localhost:5000/boards/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setSavedGames(savedGames.filter((game) => game.id !== id));
    } else {
      alert("Failed to delete game");
    }
  };

  return (
    <div className="saved-games">
      <h2>Saved Games</h2>
      {savedGames.length === 0 ? (
        <p>No saved games found</p>
      ) : (
        <ul>
          {savedGames.map((game) => (
            <li key={game.id}>
              <span>{game.name}</span>
              <button onClick={() => deleteGame(game.id)}>Delete</button>
              <Link to={`/game/${game.id}`}>Load Game</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedGames;
