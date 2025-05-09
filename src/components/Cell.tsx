import React from "react";

interface CellProps {
  value: number;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ value, onClick }) => {
  return (
    <div className="cell" onClick={onClick}>
      {value === 0 ? "" : value === 1 ? "X" : "O"}
    </div>
  );
};

export default Cell;
