import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SaveGame from "./SaveGame";

describe("SaveGame Component", () => {
  it("renders without crashing", () => {
    const board = [0, 1, 2, 0, 1, 2, 0, 1, 2];
    render(<SaveGame board={board} />);
    expect(screen.getByText("Save Game")).toBeInTheDocument();
  });

  it("triggers saveBoard function on button click", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      })
    ) as jest.Mock;

    const board = [0, 1, 2, 0, 1, 2, 0, 1, 2];
    render(<SaveGame board={board} />);
    fireEvent.click(screen.getByText("Save Game"));

    expect(global.fetch).toHaveBeenCalled();
  });
});
