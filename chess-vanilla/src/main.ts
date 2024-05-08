import { Board, Pos, Square } from './board'
import { Pawn, Rook } from './piece';
import './style.css'

class GameSquare {
  public isBrown: boolean = false
  constructor(public piece: Square, public elem: HTMLDivElement, public pos: Pos) {
    this.elem.className = 'square'
    this.isBrown = (pos[0] % 2 == 0) !== (pos[1] % 2 == 0)
    if (this.isBrown) this.elem.classList.add('brown')
    this.elem.innerHTML = piece?.getSymbol() ?? ""
  }

  update() {
    this.elem.innerHTML = this.piece?.getSymbol() ?? ""
  }

  changePiece(p: Square) {
    this.piece = p
    if (p) {
      p.r = this.pos[0]
      p.c = this.pos[1]
    }
    this.update()
  }
}

class Game {
  public app: HTMLDivElement
  public debug: HTMLDivElement
  public board: Board
  public ui: GameSquare[][]
  public active: GameSquare | null
  public moves: GameSquare[] = []

  constructor() {
    this.app = document.querySelector<HTMLDivElement>('#app')!
    this.debug = document.createElement('div')
    this.app.appendChild(this.debug)
    this.board = new Board()
    this.ui = []
    this.active = null
  }

  resetColor(gs: GameSquare) {
    gs.elem.className = 'square'
    if (gs.isBrown) gs.elem.classList.add('brown')
  }

  setDefaultOnClick(gs: GameSquare) {
    const p = gs.piece
    if (!p) {
      gs.elem.onclick = (e) => {
        e.preventDefault()
        this.updateMoves([])
        if (this.active) {
          this.resetColor(this.active)
          this.active = null
        }
      }
    }
    else {
      gs.elem.onclick = (e) => {
        e.preventDefault();
        if (this.active) this.resetColor(this.active)
        const moves = this.board.getMoves(p).map(pos => this.ui[pos[0]][pos[1]])
        this.updateMoves(moves)
        gs.elem.className = 'square active'
        this.active = gs
      }
    }
  }

  updateMoves(moves: GameSquare[]) {
    for (const old of this.moves) {
      this.resetColor(old)
      this.setDefaultOnClick(old)
    }
    this.moves = moves
    // this.debug.innerHTML = JSON.stringify(this.moves)
    for (const gs of this.moves) {
      const moveElem = gs.elem
      if (moveElem) {
        moveElem.classList.add("move")
        moveElem.onclick = (e) => {
          e.preventDefault()
          if (this.active) {
            const s = gs.piece
            gs.changePiece(this.active.piece)
            this.active.changePiece(s)
            this.update()
            this.updateMoves([])
            this.resetColor(this.active)
            this.setDefaultOnClick(this.active)
            this.resetColor(gs)
            this.setDefaultOnClick(gs)
          }
        }
      }
    }
  }

  update() {
    this.ui.flatMap(r => r).forEach(g => g.update())
  }

  setup() {
    this.board.addPiece(new Pawn(0, 0, 'white'))
    this.board.addPiece(new Rook(7, 0, 'black'))

    const pieces = this.board.getBoard()
    for (let i = 0; i < 8; i++) {
      const rowElem = document.createElement("div")
      rowElem.classList.add('row')
      const uiRow: GameSquare[] = []
      for (let j = 0; j < 8; j++) {
        const p = pieces[i][j]
        const elem = document.createElement('div')
        const gs = new GameSquare(p, elem, [i, j])
        this.setDefaultOnClick(gs)
        rowElem.appendChild(elem)
        uiRow.push(gs)
      }
      this.app.appendChild(rowElem)
      this.ui.push(uiRow)
    }
  }
}

const game = new Game()
game.setup()

