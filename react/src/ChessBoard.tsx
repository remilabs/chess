import {useState} from 'react'
export default function ChessBoard() {
  const [selectedPiece, setSelectedPiece] = useState<[number,number] | null>(null) // [x, y]
  const whitePlayer = 0
  const blackPlayer = 1

  interface ChessPiece {
    type: string
    player: 0 | 1,
    initialCoordinates?: [number, number]
  }
  const initialBoardState: (ChessPiece | null)[][] = Array(8).fill(null).map(_ => Array(8).fill(null))
  // white player - bottom
    // add pawns
    for (let i = 0; i < 8; i += 1) {
      initialBoardState[6][i] = {
        type: 'pawn',
        player: 0,
        initialCoordinates: [6, i]
      }
    }
    // add rook
    const rook = {
      type: 'rook',
      player: 0,

    } as const
    initialBoardState[7][0] = rook
    initialBoardState[7][7] = rook
    // bishop
    const bishop = {
      type: 'bishop',
      player: 0
    } as const
    initialBoardState[7][1] = bishop
    initialBoardState[7][6] = bishop
    // knight
    const knight = {
      type: 'knight',
      player: 0
    } as const
    initialBoardState[7][2] = knight
    initialBoardState[7][5] = knight
    // king
    initialBoardState[7][4] = {
      type: 'king',
      player: 0
    }
    // queen
    initialBoardState[7][3] = {
      type: 'queen',
      player: 0
    }
  const [boardState, setBoardState] = useState(initialBoardState)
  //const [currentPlayer, ]

    

  function movePiece(source: [number, number], destination: [number, number]) {
    function isValidMove(piece: ChessPiece) {
      if (piece.type === 'pawn') {
        return source[0] - destination[0] === 1 && source[1] === destination[1]
      }

    }
    const sourcePiece = boardState[source[0]][source[1]]
    if (!sourcePiece) {
      return
    }

    if (!isValidMove(sourcePiece)) {
      return
    }
 
    boardState[source[0]][source[1]] = null
    boardState[destination[0]][destination[1]] = sourcePiece
    setBoardState([...boardState])
  }

  return (
    <div className="grid grid-cols-8 max-w-[48rem]">
      {boardState.map((row, x) => row.map((col, y) => (
        <div className={`h-24 w-24 border border-black ${(x % 2 === 0 && y % 2 === 0) || (x % 2 == 1 && y % 2 === 1) ? 'bg-gray-600' : ''}`}>
          <div onClick={() => {
            // mark space as selected, if it has a piece
            if (!selectedPiece) {
              setSelectedPiece([x,y])
              console.log("selected", col)
              return
            }

            // have a selected square?  try to move the piece
            movePiece(selectedPiece, [x,y])
            setSelectedPiece(null)
            
          }} className="p-8">{x},{y} {col?.type ? col.type : ''}</div>
        </div>
      )))}
    </div>
  )
}