import "./App.css";
import ChessBoard from "./ChessBoard";

/*
game of chess

board: 8 x 8
pieces: pawn, rook, bishop, knight, king, queen
piece: moves
pawn - 3 moves: opening move, forward, attack
rook - row or column, any number of spaces
bishop - diagonals, any number of spaces
knight - forward 2, left/right 1 "L shape"
king - 1 space at a time, any direction
queen - combination of rook and bishop

special moves
pawn reaches end - becomes queen, rook, night or bishop
king and rook - castle - special move - if king and rook haven't moved yet, nothing between them and none of the spaces between them being attacked

attacked
- pawn, only diagonal one space forward
- all other pieces, reachable by another piece

- check - king is under attack
  - must get king out of attack position

ending states
- check mate
  - king cannot move out of being attacked
- stale mate
  - no valid moves for opponent, king not currently under attack

initial setup

2 sides - white / black

white always goes first

turn based

captured
- opponent lands on your piece
- replaces your piece - remove from play



Components

Board
Space
Piece
Notification / Move Log



*/



function App() {
  return (
    <div className="my-24 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">Chess</h1>
      <ChessBoard />
    </div>
  );
}

export default App;
