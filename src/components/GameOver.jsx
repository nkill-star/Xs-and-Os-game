export default function GameOver({winner,rematch}) {
    return (<div id="game-over">
        <h2>Game Over!</h2>
        {winner &&<p>{winner} Won!</p>}
        {!winner && <p>It's a Draw</p>}
        <p>
            <button onClick={rematch}>Rematch!</button>
        </p>
    </div>
    )
}