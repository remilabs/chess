import { useState } from "react";
import "./App.css";

type Coord = [number, number];
type Peices =
  | "♖"
  | "♘"
  | "♗"
  | "♔"
  | "♕"
  | "♗"
  | "♘"
  | "♖"
  | "♙"
  | "♜"
  | "♞"
  | "♝"
  | "♚"
  | "♛"
  | "♟︎";

function App() {
  const [board, setBoard] = useState<(Peices | "")[][]>([
    ["♖", "♘", "♗", "♔", "♕", "♗", "♘", "♖"],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎"],
    ["♜", "♞", "♝", "♚", "♛", "♝", "♞", "♜"],
  ]);

  const [activeTile, setActiveTile] = useState<Coord>();
  const [optionTiles, setOptionTiles] = useState<Coord[]>([]);

  const blackPieces: Set<Peices> = new Set(["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜", "♟︎"]);
  const whitePieces: Set<Peices> = new Set(["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖", "♙"]);
  const pawns: Set<Peices> = new Set(["♟︎", "♙"]);
  const rooks: Set<Peices> = new Set(["♜", "♖"]);
  const knights: Set<Peices> = new Set(["♞", "♘"]);
  const bishops: Set<Peices> = new Set(["♝", "♗"]);
  const queens: Set<Peices> = new Set(["♛", "♕"]);
  const kings: Set<Peices> = new Set(["♚", "♔"]);

  const isActiveTile = (x: number, y: number): boolean => {
    if (!activeTile) return false;
    return activeTile[0] === x && activeTile[1] === y;
  };

  const isOptionTile = (x: number, y: number): boolean => {
    return optionTiles.some((tile) => tile[0] === x && tile[1] === y);
  };

  const isEveryOther = (x: number, y: number): boolean => {
    return (x % 2 === 0 && y % 2 === 0) || (x % 2 !== 0 && y % 2 !== 0);
  };

  const onCellClick = (x: number, y: number, peice: Peices | "") => {
    if (activeTile) {
      if (optionTiles.some((tile) => tile[0] === x && tile[1] === y)) {
        const newBoard: (Peices | "")[][] = [];
        board.forEach((row, index) => {
          if (index === y) {
            const newRow = [...row];
            newRow[x] = row[activeTile[0]];
            newRow[activeTile[0]] = "";
            newBoard.push(newRow);
          } else {
            newBoard.push(row);
          }
        });
        setBoard(newBoard);
      }
      // setActiveTile(undefined);
      // setOptionTiles([]);
    } else if (peice) {
      setActiveTile([x, y]);
      setAvailableMoves([x, y], peice);
    }
  };

  const setAvailableMoves = (coord: Coord, piece: Peices): void => {
    if (blackPieces.has(piece)) {
      if (pawns.has(piece)) {
        const newCoords: Coord[] = [];
        const newCoord: Coord = [coord[0], coord[1] - 1];
        if (board[newCoord[0]][newCoord[1]] === "") {
          newCoords.push(newCoord);
        }
        if (coord[1] === 6) {
          const newCoord2: Coord = [coord[0], coord[1] - 2];
          if (board[newCoord2[0]][newCoord2[1]] === "") {
            newCoords.push(newCoord2);
          }
        }
        setOptionTiles(newCoords);
      } else if (rooks.has(piece)) {
        console.log("rook");
      } else if (knights.has(piece)) {
        console.log("knight");
      } else if (bishops.has(piece)) {
        console.log("bishop");
      } else if (queens.has(piece)) {
        console.log("queen");
      } else if (kings.has(piece)) {
        console.log("king");
      }
    } else {
      if (pawns.has(piece)) {
        console.log("pawn");
      } else if (rooks.has(piece)) {
        console.log("rook");
      } else if (knights.has(piece)) {
        console.log("knight");
      } else if (bishops.has(piece)) {
        console.log("bishop");
      } else if (queens.has(piece)) {
        console.log("queen");
      } else if (kings.has(piece)) {
        console.log("king");
      }
    }
  };

  return (
    <>
      <div className="app">
        <div className="board">
          {board.map((row, i) => (
            <div className="row" key={`row${i}`}>
              {row.map((cell, j) => (
                <div
                  key={`cell${j}`}
                  onClick={() => onCellClick(j, i, cell)}
                  className={`cell ${isEveryOther(j, i) ? "black" : "white"} ${isActiveTile(j, i) ? "active" : ""} ${isOptionTile(j, i) ? "option" : ""}`}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
