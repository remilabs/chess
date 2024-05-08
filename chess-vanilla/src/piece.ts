export type Color = 'black' | 'white'
export type Piece = 'pawn' | 'knight' | 'bishop' | 'queen' | 'king' | 'rook' | null

export abstract class ChessPiece {
  public abstract type: Piece
  public abstract color: Color
  constructor(
    public r: number,
    public c: number,
  ) { }

  move(r: number, c: number) {
    this.r = r
    this.c = c
  }

  moveToPos(pos: [number, number]) {
    this.r = pos[0]
    this.c = pos[1]
  }

  getSymbol() {
    return ''
  }
}

export class Pawn extends ChessPiece {
  public type: Piece = 'pawn'
  public color: Color
  constructor(r: number, c: number, color: Color) {
    super(r, c)
    this.color = color
  }

  getSymbol(): string {
    return 'p'
  }
}


export class Knight extends ChessPiece {
  public type: Piece = 'knight'
  public color: Color
  constructor(r: number, c: number, color: Color) {
    super(r, c)
    this.color = color
  }

  getSymbol(): string {
    return 'k'
  }
}


export class Bishop extends ChessPiece {
  public type: Piece = 'bishop'
  public color: Color
  constructor(r: number, c: number, color: Color) {
    super(r, c)
    this.color = color
  }

  getSymbol(): string {
    return 'b'
  }
}

export class Rook extends ChessPiece {
  public type: Piece = 'rook'
  public color: Color
  constructor(r: number, c: number, color: Color) {
    super(r, c)
    this.color = color
  }

  getSymbol(): string {
    return 'r'
  }
}


export class Queen extends ChessPiece {
  public type: Piece = 'queen'
  public color: Color
  constructor(r: number, c: number, color: Color) {
    super(r, c)
    this.color = color
  }

  getSymbol(): string {
    return 'q'
  }
}

export class King extends ChessPiece {
  public type: Piece = 'king'
  public color: Color
  constructor(r: number, c: number, color: Color) {
    super(r, c)
    this.color = color
  }

  getSymbol(): string {
    return 'K'
  }
}
