import './GameOver.css'

const GameOver = ({ retry, score }) => {
  return (
    <div>
        <h1>Game Over!</h1>
        <p>Sua pontuação foi de: <span>{score}</span></p>
        <button onClick={retry}>Resetar Jogo</button>
    </div>
  )
}

export default GameOver