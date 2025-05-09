import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameBoard from "./components/GameBoard";
import SavedGames from "./components/SavedGames";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <h1>Tic-Tac-Toe</h1>
        <Routes>
          <Route path="/saved-games" element={<SavedGames />} />
          <Route path="/game" element={<GameBoard />} />
          <Route path="/game/:id" element={<GameBoard />} /> {}
          <Route path="/" element={<GameBoard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
