import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type PlayerColor = 'white' | 'black'

type PieceName = 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king'

type BoardPiece = Piece | null

type Board = [
  [BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece],
  [BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece],
  [BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece],
  [BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece],
  [BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece],
  [BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece],
  [BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece],
  [BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece]
]

const defaultBoard: Board = [
  [null, null, null ,null ,null, null ,null ,null],
  [null, null, null ,null ,null, null ,null ,null],
  [null, null, null ,null ,null, null ,null ,null],
  [null, null, null ,null ,null, null ,null ,null],
  [null, null, null ,null ,null, null ,null ,null],
  [null, null, null ,null ,null, null ,null ,null],
  [null, null, null ,null ,null, null ,null ,null],
  [null, null, null ,null ,null, null ,null ,null]
]

type Piece = {
  id: number
  name: PieceName
  color: PlayerColor
}

const generatePiece = ({id, color, name} : {id?: number, color: PlayerColor, name: PieceName}): Piece => ({
  id: id ?? Math.random(),
  name,
  color
})


const generateDefaultBoard = () => {
  return [
    [generatePiece({name: 'rook', color: 'black'}), generatePiece({name: 'knight', color: 'black'}), generatePiece({name: 'bishop', color: 'black'}) ,generatePiece({name: 'queen', color: 'black'}) ,generatePiece({name: 'king', color: 'black'}), generatePiece({name: 'bishop', color: 'black'}) ,generatePiece({name: 'knight', color: 'black'}) ,generatePiece({name: 'rook', color: 'black'})],
    [generatePiece({name: 'pawn', color: 'black'}),generatePiece({name: 'pawn', color: 'black'}),generatePiece({name: 'pawn', color: 'black'}),generatePiece({name: 'pawn', color: 'black'}),generatePiece({name: 'pawn', color: 'black'}),generatePiece({name: 'pawn', color: 'black'}),generatePiece({name: 'pawn', color: 'black'}),generatePiece({name: 'pawn', color: 'black'}),],
    [null, null, null ,null ,null, null ,null ,null],
    [null, null, null ,null ,null, null ,null ,null],
    [null, null, null ,null ,null, null ,null ,null],
    [null, null, null ,null ,null, null ,null ,null],
    [generatePiece({name: 'pawn', color: 'white'}),generatePiece({name: 'pawn', color: 'white'}),generatePiece({name: 'pawn', color: 'white'}),generatePiece({name: 'pawn', color: 'white'}),generatePiece({name: 'pawn', color: 'white'}),generatePiece({name: 'pawn', color: 'white'}),generatePiece({name: 'pawn', color: 'white'}),generatePiece({name: 'pawn', color: 'white'}),],
    [generatePiece({name: 'rook', color: 'white'}), generatePiece({name: 'knight', color: 'white'}), generatePiece({name: 'bishop', color: 'white'}) ,generatePiece({name: 'queen', color: 'white'}) ,generatePiece({name: 'king', color: 'white'}), generatePiece({name: 'bishop', color: 'white'}) ,generatePiece({name: 'knight', color: 'white'}) ,generatePiece({name: 'rook', color: 'white'})],
  ]
}

type MoveCoords = {startingRow: number, startingCol: number, endingRow: number, endingCol: number}

const validRookMove = ({startingRow, startingCol, endingRow, endingCol}: MoveCoords) => {
  if(startingRow === endingRow) return true
  if(startingCol === endingCol) return true
  return false
}

const validBishopMove = ({startingRow, startingCol, endingRow, endingCol}: MoveCoords) => {
  const rowDiff = Math.abs(startingRow - endingRow)
  const colDiff = Math.abs(startingCol - endingCol)
  const canMove = rowDiff === colDiff
  if(startingRow !== endingRow && startingCol !== endingCol && canMove) return true
  return false
}

const checkValidMove = ({pieceName, moveCoords}:{pieceName: PieceName, moveCoords: MoveCoords}) => {
  const moveChecker = {
    rook: validRookMove,
    bishop: validBishopMove
  }
  return moveChecker[pieceName](moveCoords)
}

function App() {
  const [player, setPlayer] = useState<PlayerColor>('white')
  const [board, setBoard] = useState(generateDefaultBoard())
  const [selectedPiece, setSelectedPiece] = useState<BoardPiece>(null)
  const [selectedPieceCoords, setSelectedPieceCoords] = useState<{row: number, col: number}>({row: -1, col: -1})
  const [captures, setCaptures] = useState<Piece[]>([])

  const handlePieceMove = ({row, col}:{row: number, col: number}) => {
    if(!selectedPiece) return
    if(!checkValidMove({pieceName: selectedPiece?.name, moveCoords: {startingCol: selectedPieceCoords.col, startingRow: selectedPieceCoords.row, endingRow: row, endingCol: col}}))return
    const movingTo = board[row][col]
    if(movingTo?.id) {
      const newCaptures = [...captures, movingTo]
      setCaptures(newCaptures)
    }
    const boardCopy = [...board]
    boardCopy[row][col] = selectedPiece
    boardCopy[selectedPieceCoords.row][selectedPieceCoords.col] = null
    setBoard(boardCopy)
    setSelectedPiece(null)
    setSelectedPieceCoords({row: -1, col: -1})
  }

  const handleSelectPiece = ({selected, row, col}:{selected: Piece, row: number, col: number}) => {
    setSelectedPieceCoords({row, col})
    setSelectedPiece(selected)
  }

  return (
    <div>
      <h4>Current Player: {player}</h4>
      <div>{selectedPiece?.name}</div>
      <div>White: {captures.filter(c => c.color === 'black').map(c => c.name).join(',')}</div>
      <div>Black: {captures.filter(c => c.color === 'white').map(c => c.name).join(',')}</div>
    <div style={{display: 'flex', width: 800, height: 800, flexDirection: 'column'}}>
      {board.map((row, rowIdx) => {
        return <div key={rowIdx} style={{display: 'flex', height: 100}}>{row.map((col, colIdx) => {
          const squareColor = () => {
            if(rowIdx % 2) {
              return colIdx % 2 ? 'lightgray' : 'darkgray'
            }
            return colIdx % 2 ? 'darkgray' : 'lightgray'
          }
          const pieceOnClick = () => {
            if(selectedPiece?.id && col?.color !== selectedPiece?.color) {
              handlePieceMove({row: rowIdx, col: colIdx})
              return
            }
            if(col === null) {
              return
            }
            handleSelectPiece({selected: col, row: rowIdx, col: colIdx})
          }
          return <div key={col?.id} style={{flex: '1', background: squareColor(), height: '100%', color: 'black', border: selectedPiece?.id && selectedPiece?.id === col?.id ? '1px solid red' : ''}} onClick={pieceOnClick}>{col?.name}</div>
        })}</div>
      })}
    </div>
    </div>
  )
}

export default App
