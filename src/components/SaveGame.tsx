import React from "react";

interface SaveGameProps {
  board: number[];
}

const SaveGame: React.FC<SaveGameProps> = ({ board }) => {
  const saveBoard = () => {
    const name = prompt("Enter a name for this board:");
    if (!name) return;

    fetch("http://localhost:5000/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ board: board.join(""), name }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Board saved successfully!");
        } else {
          alert("Failed to save the board.");
        }
      })
      .catch(() => alert("An error occurred while saving the board."));
  };

  return <button onClick={saveBoard}>Save Game</button>;
};

export default SaveGame;
