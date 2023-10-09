import './StartScreen.css'

const StartScreen = ({startGame}) => {
  return (
    <div>
        <h2>Secret Word</h2>
        <p>Clique no botão abaixo para começar a jogar!</p>
        <button onClick={startGame}>COMEÇAR O JOGO!</button>
    </div>
  )
}

export default StartScreen