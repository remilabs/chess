// 0: pawn (white)
// 1: rook
// 2: knight
// 3: bishop
// 4: queen
// 5: king
// 6-11 (black, same as above)

import { useState } from "react";

const display = ["pawn", "rook", "knight", "bishop", "queen", "king"];

function team(cell) {
  return cell < 6;
}

const moves = [
  // pawn
  (cell, ij, board) => {
    const direction = cell === 0 ? -1 : 1;
    const [i, j] = ij;
    if (i + direction < 0 || i + direction > board.length) {
      return [];
    }
    const availableCells = [];
    if (
      j > 0 &&
      board[i + direction][j - 1] != null &&
      team(board[i + direction][j - 1]) !== team(cell)
    ) {
      availableCells.push([i + direction, j - 1]);
    }
    if (board[i + direction][j] == null) {
      availableCells.push([i + direction, j]);
    }
    if (
      j > 0 &&
      board[i + direction][j + 1] != null &&
      team(board[i + direction][j + 1]) !== team(cell)
    ) {
      availableCells.push([i + direction, j + 1]);
    }
    return availableCells;
  },
];

export default function Chessboard() {
  const [phase, setPhase] = useState("ready"); // ready | selected
  const [availableCells, setAvailableCells] = useState([]); // array of tuples
  const [turn, setTurn] = useState(0); // white = 0, black = 1
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [board, setBoard] = useState([
    [7, 8, 9, 10, 11, 9, 8, 7],
    [6, 6, 6, 6, 6, 6, 6, 6],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 2, 3, 4, 5, 3, 2, 1],
  ]);
  const [capturedPieces, setCapturedPieces] = useState([]);

  const pieceClicked = (cell, ij) => {
    const fn = moves[cell % 6];
    const newAvailableCells = fn(cell, ij, board);
    setAvailableCells(newAvailableCells);
    setPhase("selected");
    setSelectedPiece(ij);
    console.log(newAvailableCells);
  };

  const displayCellReady = (cell, ij) => {
    if (cell == null) {
      return <td className="empty"></td>;
    }
    let onClick = () => {};
    let classes = "white";
    let val = cell;
    let selectable = (turn === 0 && cell < 6) || (turn === 1 && cell >= 6);
    if (cell >= 6) {
      classes = "black";
      val = cell - 6;
    }
    if (selectable) {
      onClick = () => pieceClicked(cell, ij);
      classes += " selectable";
    }
    return (
      <td className={classes} onClick={onClick}>
        {display[val]}
      </td>
    );
  };

  const availableCellSelected = (cell, ij) => {
    const [i, j] = ij;
    const clonedBoard = JSON.parse(JSON.stringify(board));
    if (clonedBoard[i][j] !== null) {
      setCapturedPieces((p) => [...p, clonedBoard[i][j]]);
    }
    clonedBoard[i][j] = board[selectedPiece[0]][selectedPiece[1]];
    clonedBoard[selectedPiece[0]][selectedPiece[1]] = null;
    setBoard(clonedBoard);
    setTurn((t) => (t + 1) % 2);
    setPhase("ready");
    setSelectedPiece(null);
    setAvailableCells([]);
  };

  const displayCellSelected = (cell, ij) => {
    const [i, j] = ij;
    let classes = "";
    let onClick = () => {};
    if (availableCells.find((a) => a[0] === i && a[1] === j)) {
      classes += "available";
      onClick = () => availableCellSelected(cell, ij);
    }
    let val = cell;
    if (cell < 6) {
      classes += " white";
    } else {
      classes += " black";
      val -= 6;
    }
    return (
      <td className={classes} onClick={onClick}>
        {display[val]}
      </td>
    );
  };

  const displayCell =
    phase === "ready" ? displayCellReady : displayCellSelected;

  return (
    <div>
      <table>
        {board.map((row, i) => (
          <tr>{row.map((cell, j) => displayCell(cell, [i, j]))}</tr>
        ))}
      </table>
      <p>Captured pieces:</p>
      {capturedPieces.length > 0 ? (
        <ul>
          {capturedPieces.map((p) => (
            <li>{p}</li>
          ))}
        </ul>
      ) : (
        <p>none.</p>
      )}
    </div>
  );
}
