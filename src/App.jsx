import React from 'react'
import useTypingGame from './useTypingGame'

function App() {
  
  const {
    textAreaRef,
    handleChange, 
    textArea, 
    isTimeRunning,
    timeRemaining,
    startGame, 
    wordCount 
  } = useTypingGame() 


  return (
    <div>
      <h1>Typing Game</h1>
      <textarea
      ref = {textAreaRef}
      type="text"
      placeholder="Type Here!"
      onChange={handleChange}
      value={textArea}
      disabled={!isTimeRunning}
      />
   
      <h4>Time Remaining: {timeRemaining}</h4>
      <button onClick={startGame} 
      disabled={isTimeRunning}
      >
        Start Game
      </button>
      <h1 className="word-count">Word Count: {wordCount}</h1>
    </div>
  )
}

export default App