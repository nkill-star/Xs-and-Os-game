import Player from "./components/player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import { useState } from "react"
import { WiningCombinations } from './components/winning-combinations.js'
import GameOver from "./components/GameOver.jsx"

function derviveActivePlayer(gameTurns) {
  let currentPlayer = 'X'
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function App() {
  // const [activePlayer, setActivePlayer] = useState('X')

  const[players,setPlayers]=useState([{X:'Player 1', O:'Player 2'}])

  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = derviveActivePlayer(gameTurns)

  let gameBoard = [...initialGameBoard.map(array => [...array])]

  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square
    gameBoard[row][col] = player
  }

  let winner

  for (const combinations of WiningCombinations) {
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].col]
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].col]
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].col]

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol]
    }
  }

  const draw = gameTurns.length === 9 && !winner

  function handleSelecetSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns((prevTurns) => {
      const currentPlayer = derviveActivePlayer(prevTurns)
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns]
      return updatedTurns
    })
  }

  function handleRematch() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayers(prevPlayers=>{
      return{
        ...prevPlayers,
        [symbol]:newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
          <Player initialName="player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || draw) && <GameOver winner={winner} rematch={handleRematch} />}
        <GameBoard onSelectSquare={handleSelecetSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
