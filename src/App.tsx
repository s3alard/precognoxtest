import "./App.css";
import React from "react";
import GameBoard from "./components/GameBoard";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <GameBoard />
    </div>
  );
};

export default App;
