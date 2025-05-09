import React from "react";

interface CellProps {
  value: number;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ value, onClick }) => {
  const renderContent = () => {
    if (value === 1) {
      return "X";
    }
    if (value === 2) {
      return "O";
    }
    return "";
  };

  return (
    <button
      className={`cell ${value === 1 ? "x" : value === 2 ? "o" : ""}`}
      onClick={onClick}
    >
      {renderContent()}
    </button>
  );
};

export default Cell;
