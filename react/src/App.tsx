import { useState } from "react";
import "./App.css";

type ChessPiece = {
  type: string;
};

const chessBoard = [
  [
    { type: "rook", id: "rook1", color: "white" },
    { type: "knight", id: "knight1", color: "white" },
    { type: "bishop", id: "bishop1", color: "white" },
    { type: "queen", id: "queen", color: "white" },
    { type: "king", id: "king", color: "white" },
    { type: "bishop", id: "bishop2", color: "white" },
    { type: "knight", id: "knight2", color: "white" },
    { type: "rook", id: "rook2", color: "white" },
  ],
  [
    { type: "pawn", id: "pawn1", color: "white" },
    { type: "pawn", id: "knight1", color: "white" },
    { type: "pawn", id: "bishop1", color: "white" },
    { type: "pawn", id: "queen", color: "white" },
    { type: "pawn", id: "king", color: "white" },
    { type: "pawn", id: "bishop2", color: "white" },
    { type: "pawn", id: "knight2", color: "white" },
    { type: "pawn", id: "rook2", color: "white" },
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    { type: "pawn", id: "rook1", color: "white" },
    { type: "pawn", id: "knight1", color: "white" },
    { type: "pawn", id: "bishop1", color: "white" },
    { type: "pawn", id: "queen", color: "white" },
    { type: "pawn", id: "king", color: "white" },
    { type: "pawn", id: "bishop2", color: "white" },
    { type: "pawn", id: "knight2", color: "white" },
    { type: "pawn", id: "rook2", color: "white" },
  ],
  [
    { type: "rook", id: "rook1", color: "white" },
    { type: "knight", id: "knight1", color: "white" },
    { type: "bishop", id: "bishop1", color: "white" },
    { type: "queen", id: "queen", color: "white" },
    { type: "king", id: "king", color: "white" },
    { type: "bishop", id: "bishop2", color: "white" },
    { type: "knight", id: "knight2", color: "white" },
    { type: "rook", id: "rook2", color: "white" },
  ],
];

function App() {
  const [board, setBoard] = useState(chessBoard);
  const movePiece = (from: [number, number], to: [number, number]) => {
    const [fromRow, fromColumn] = from;
    const [toRow, toColumn] = to;
    const piece = board[fromRow][fromColumn];
    setBoard((prevBoard) => {
      prevBoard[fromRow][fromColumn] = null;
      prevBoard[toRow][toColumn] = piece;
      return prevBoard;
    });
  };

  return (
    <>
      <h1>Chess</h1>
      {board.map((row, rowIndex) => {
        return (
          <div style={{ display: "flex", flexDirection: "row" }} key={rowIndex}>
            {row.map((space, spaceIndex) => {
              return (
                <div
                  onClick={() => movePiece()}
                  key={spaceIndex}
                  style={{
                    height: 100,
                    width: 100,
                    border: "1px solid black",
                  }}
                >
                  <span>{space?.type}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default App;
