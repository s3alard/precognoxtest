import React from "react";

type CellProps = {
  value: "" | "X" | "O";
  onClick: () => void;
};

const Cell: React.FC<CellProps> = ({ value, onClick }) => {
  return (
    <button className="cell" onClick={onClick}>
      {value}
    </button>
  );
};

export default Cell;
