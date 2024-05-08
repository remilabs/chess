import { Bishop, ChessPiece, King, Knight, Pawn, Queen, Rook } from "./piece";

export type Square = ChessPiece | null
export type Pos = [number, number]

export class Board {
  public static ROWS = 8;
  public static COLS = 8;
  public pieces: ChessPiece[] = []

  constructor() {
    this.clearBoard()
  }

  clearBoard() {
    this.pieces = []
  }


  getBoard(): Square[][] {
    const board: Square[][] = []
    for (let i = 0; i < Board.ROWS; i++) {
      const row: Square[] = Array.from<Square>({ length: Board.COLS }).fill(null)
      board.push(row)
    }
    for (const p of this.pieces) {
      board[p.r][p.c] = p
    }
    return board
  }

  resetBoard() {
    this.clearBoard()
    for (let i = 0; i < Board.COLS; i++) {
      if (i == 0 || i == Board.COLS - 1) {
        this.pieces.push(new Rook(0, i, 'white'))
      }
      if (i == 1 || i == Board.COLS - 2) {
        this.pieces.push(new Knight(0, i, 'white'))
      }
      if (i == 2 || i == Board.COLS - 3) {
        this.pieces.push(new Bishop(0, i, 'white'))
      }
      if (i == 3) {
        this.pieces.push(new Queen(0, i, 'white'))
      }
      if (i == 4) {
        this.pieces.push(new King(0, i, 'white'))
      }
    }
    for (let i = 0; i < Board.COLS; i++) {
      this.pieces.push(new Pawn(1, i, 'white'))
    }


    for (let i = 0; i < Board.COLS; i++) {
      if (i == 0 || i == Board.COLS - 1) {
        this.pieces.push(new Rook(7, i, 'black'))
      }
      if (i == 1 || i == Board.COLS - 2) {
        this.pieces.push(new Knight(7, i, 'black'))
      }
      if (i == 2 || i == Board.COLS - 3) {
        this.pieces.push(new Bishop(7, i, 'black'))
      }
      if (i == 3) {
        this.pieces.push(new Queen(7, i, 'black'))
      }
      if (i == 4) {
        this.pieces.push(new King(7, i, 'black'))
      }
    }
    for (let i = 0; i < Board.COLS; i++) {
      this.pieces.push(new Pawn(6, i, 'white'))
    }
  }

  checkIfInBounds(r: number, c: number) {
    return r >= 0 && r < Board.ROWS && c >= 0 && c < Board.COLS
  }

  addPiece(piece: ChessPiece) {
    const r = piece.r
    const c = piece.c
    if (this.checkIfInBounds(r, c)) {
      this.pieces.push(piece)
    }
  }

  isPieceOnPos(pos: Pos) {
    return this.pieces.find(p => p.r == pos[0] && p.c == pos[1])
  }

  getAllPos(): Pos[] {
    const res: Pos[] = []
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        res.push([i, j])
      }
    }
    return res
  }

  getMoves(p: ChessPiece): Pos[] {
    const moves: Pos[] = []
    if (p.type == 'pawn') {
      const pos: Pos = [p.r + (p.color == 'white' ? 1 : -1), p.c]
      if (!this.isPieceOnPos(pos)) moves.push(pos)
    }
    if (p.type == 'rook') {
      const possible = this.getAllPos().filter(([r, c]) => r == p.r || c == p.c)
      return possible
      // const pos: Pos = [p.r + (p.color == 'white' ? 1 : -1), p.c]
      // if (!this.isPieceOnPos(pos)) moves.push(pos)
    }
    return moves
  }
}
