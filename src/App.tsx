import { useState, useEffect } from 'react'
import './App.css'

interface Imove {
  position : number,
  icon : string
}
interface IboardProp {
  currentMove : number,
  cellItems : string[],
  onMove : (move : Imove) => void
}
interface IcellProp {
  cellId : number,
  cellItem : string | null,
  onCellClick : (cellId : number) => void
}

const Cell = ({cellId, cellItem, onCellClick } : IcellProp) => {
  return (
    <div className={`cell ${cellItem==null && 'clickable'}`}
      onClick={() => onCellClick( cellId )}
    >
      { cellItem }
    </div>
  )
}

const Board = ({currentMove, cellItems, onMove} : IboardProp) => {  

  const activePlayer = currentMove % 2;

  const getWinner = () => {
    for(let i = 0; i < 3; i++) {
      if(cellItems[i] && cellItems[i] == cellItems[3 + i] && cellItems[i] == cellItems[6 + i]) return cellItems[i];
    }
    for(let i = 0; i < 9; i+=3) {
      if(cellItems[i] && cellItems[i] == cellItems[1 + i] && cellItems[i] == cellItems[2 + i]) return cellItems[i];
    }
    if(cellItems[4] && cellItems[4 - 4] == cellItems[4] && cellItems[4] == cellItems[4 + 4]) return cellItems[4];
    if(cellItems[4] && cellItems[4 - 2] == cellItems[4] && cellItems[4] == cellItems[4 + 2]) return cellItems[4];
    return null;
  }

  const winner = getWinner();
  
  const draw = winner ? false : currentMove == 9;
  const message = winner ? `Winner is : ${winner}` : draw ? 'Match Drawn' : `Next player : ${activePlayer ? 'X' : 'O'}`

  const onCellClick = ( cellId : number) => {
    if(cellItems[cellId] || winner) return;
    onMove({position : cellId, icon : activePlayer ? 'X' : 'O'});
  }

  return (
    <div className="board-container">
      {message}
      <div className="board">
        <div className="row">
          <Cell cellId = {0} cellItem = {cellItems[0]} onCellClick = {onCellClick} />
          <Cell cellId = {1} cellItem = {cellItems[1]} onCellClick = {onCellClick} />
          <Cell cellId = {2} cellItem = {cellItems[2]} onCellClick = {onCellClick} />
        </div>

        <div className="row">
          <Cell cellId = {3} cellItem = {cellItems[3]} onCellClick = {onCellClick} />
          <Cell cellId = {4} cellItem = {cellItems[4]} onCellClick = {onCellClick} />
          <Cell cellId = {5} cellItem = {cellItems[5]} onCellClick = {onCellClick} />
        </div>

        <div className="row">
          <Cell cellId = {6} cellItem = {cellItems[6]} onCellClick = {onCellClick} />
          <Cell cellId = {7} cellItem = {cellItems[7]} onCellClick = {onCellClick} />
          <Cell cellId = {8} cellItem = {cellItems[8]} onCellClick = {onCellClick} />
        </div>
        
      </div>
    </div>
  )
}


function App() {
  
  const [moves, setMoves] = useState<Imove[]>([]);
  const [curState, setCurState] = useState<any[]>(Array(9).fill(null));
  const [currentMove, setCurrentMove] = useState(0);


  const onMove = (move : Imove) => {
    setMoves([...moves.splice(0, currentMove ), move]);
    setCurrentMove(currentMove + 1);
  }

  const goBackTo = (target : number) => {
    setCurrentMove(target);
  }

  useEffect(() => {
    let tState = Array(9).fill(null);
    for(let i = 0; i < currentMove; i++) {
      const {position, icon} = moves[i];
      tState[position] = icon;
    }
    setCurState(tState)
  }, [currentMove])

  return (
    <div className="game">
      <Board currentMove={currentMove} cellItems={curState} onMove={onMove}/>
      <ol className="history">
        <li key={0}><button onClick={() => goBackTo(0)}>{`Go to game start`}</button></li>
        {moves.map( (element, key) => {          
          return <li key={key + 1}><button onClick={() => goBackTo(key + 1)}>{`Go to move # ${key + 1}`}</button></li>
        })}
      </ol>
    </div>
  )
}

export default App



