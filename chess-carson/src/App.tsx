import React from 'react';
import './App.css';

type Piece = 
  "rook" |
  "pawn"|
  "bishop"|
  "knight"|
  "queen"|
  "king"|
  "empty"

type Color = "white" | "black" | "empty"

type SquareType = {
  piece: Piece;
  color: Color;
}

type Position = {
  i: number, j: number
}



type StateType = {
  board: SquareType[][];
  potentialMoves: Position[];
  clicked: Position | null;
}

type ClickPiece = { type: "click", payload: {i: number, j:number}}

type ActionType = ClickPiece

function rookChecks(state: StateType, i: number, j: number, king = false) {
  const potentialMoves : Position[] = [];  
  const len = king ? 2 : state.board.length;
  for (let k=1; k<len; k++) {
    if (k+i<state.board.length) potentialMoves.push({i: i+k, j})
    if (k+j<state.board.length) potentialMoves.push({i, j:j+k})
    if (i-k>=0) potentialMoves.push({i:i-k, j}) 
    if (j-k>=0) potentialMoves.push({i, j:j-k}) 
  } 
  return potentialMoves;
}

function bishopChecks(state: StateType, i: number, j: number, king = false) {
  const potentialMoves : Position[] = []; 
  const len = king ? 2 : state.board.length;
  for (let k=1; k<len; k++) {
    if (k+i<state.board.length && k+j<state.board.length) potentialMoves.push({i: i+k, j: j+k})
    if (k+j<state.board.length && i-k>=0) potentialMoves.push({i: i-k, j:j+k})
    if (i-k>=0 && j-k>=0) potentialMoves.push({i:i-k, j: j-k}) 
    if (j-k>=0 && k+i<state.board.length) potentialMoves.push({i:i+k, j:j-k}) 
  }
  return potentialMoves;
}

function reducer(state: StateType, action: ActionType) {
  if (action.type === "click") {
    const i = action.payload.i;
    const j = action.payload.j;
    // if (state.clicked) {
    //   const board = state.board;
    //   console.log("board at clicked", board[state.clicked.i][state.clicked.j])

    //   board[i][j] = board[state.clicked.i][state.clicked.j]
    //   console.log("board after clicked", board[i][j]) 
    //   board[state.clicked.i][state.clicked.j] = {piece: "empty", color: "empty"} // change if enemy piece
    //   return {
    //     ...state,
    //     clicked: null,
    //     board: board,
    //     potentialMoves: [],
    //   }
    // }

    let potentialMoves : Position[] = [];
    if (state.board[i][j].piece === "rook") {
      potentialMoves = rookChecks(state,i,j)
    }
    else if (state.board[i][j].piece === "bishop") {
      potentialMoves = bishopChecks(state,i,j);
    }
    else if (state.board[i][j].piece === "queen") {
      potentialMoves = bishopChecks(state,i,j);
      potentialMoves = [...potentialMoves, ...rookChecks(state,i,j)]
    }
    else if (state.board[i][j].piece === "king") {
      potentialMoves = bishopChecks(state,i,j,true);
      potentialMoves = [...potentialMoves, ...rookChecks(state,i,j,true)]
    }
    return {
      ...state,
      potentialMoves: potentialMoves,
      clicked: {i, j}
    }
  }
  return state;
}

function initialize2DArray(width : number, height: number, val: SquareType) : SquareType[][] {
  const board = Array.from({ length: height }).map(() =>
    Array.from({ length: width }).fill(val)
  ) as SquareType[][];
  // board[0][0] = {piece: "rook", color: "white"}
  // board[0][2] = {piece: "bishop", color: "white"}
  // board[3][3] = {piece: "king", color: "white"} 
  // board[5][5] = {piece: "queen", color: "white"}
  // return board;
  
  const top = setup(board, "white", true);
  return setup(top, "black", false);
}

function setup(board: SquareType[][], color: Color, top: boolean) {
  const backline: Piece[] = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];
  const setupBoard = board;
  let i = 0;
  for (const b of backline) {
    setupBoard[top ? 0 : 7][i] = {piece: b, color}
    setupBoard[top ? 1 : 6][i] = {piece: "pawn", color}
    i++
  }
  return setupBoard;
}


const initialState : StateType = {
  board: initialize2DArray(8, 8, {piece: "empty", color: "empty"}),
  potentialMoves: [],
  clicked: null,
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  function checkIfInPotential(i: number, j: number) {
    for (const move of state.potentialMoves) {
      if (move.i === i && move.j === j) return true
    }
    return false;
  }

  console.log("board", state.board)
  console.log("potentialMove", state.potentialMoves)
  console.log("clicked", state.clicked)

  return (
    <>
      <div>
        <div className="board">
          {state.board.map((row, i) => {
            return (
              <div key={i} className="row">
                {row.map((col, j) => {
                  return (<div onClick={() => {
                    dispatch({type: "click", payload: {i, j}})
                  }} className={`square ${checkIfInPotential(i,j) ? "potential" : (i+j)%2==0 ? "even" : "odd"}`} key={j}>
                    <div>{col.piece === "empty" ? null : col.piece}</div>
                  </div>)
                })}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
