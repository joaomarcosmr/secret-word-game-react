// CSS
import './App.css'

// React
import { useEffect, useState } from 'react'

// Data
import { wordsList } from './data/words'

// Components
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words, setWords] = useState(wordsList)
  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [pickedLetters, setPickedLetters] = useState([])
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(7)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = () => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    const wordSelected = words[category][Math.floor(Math.random() * Object.keys(words).length)]

    return {wordSelected, category}
  }

  // Starts the game
  const startGame = () => {
    clearLetterStates()
    const {wordSelected, category} = pickWordAndCategory()
    let wordLetters = wordSelected.split('')
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    setPickedWord(wordSelected)
    setPickedCategory(category)
    setPickedLetters(wordLetters)
    setGameStage(stages[1].name)
  }

  // process the letter input
  const verifyLetter = (letter) =>{
    const normalizedLetter = letter.toLowerCase()

    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) return

    if (pickedLetters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }
  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
    setGuesses(7)
  }

  useEffect(() => {
    if (guesses <= 0){
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])

  useEffect(() => {
    const uniqueLetters = [...new Set(pickedLetters)]

    if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name){
      setScore((actualScore) => actualScore + 100)
      startGame()
    }
  }, [guessedLetters])

  // retry the game again
  const retry = () => {
    setScore(0)
    setGuesses(7)
    setGameStage(stages[0].name)
  }

  return (
    <div className='App'>
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} pickedLetters={pickedLetters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score}/>}
      {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
      <></>
    </div>
  )
}

export default App
