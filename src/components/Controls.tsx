import React from "react";

type ControlsProps = {
  resetGame: () => void;
};

const Controls: React.FC<ControlsProps> = ({ resetGame }) => {
  return (
    <div className="controls">
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default Controls;
