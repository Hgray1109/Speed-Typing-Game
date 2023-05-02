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
    wordCount,
    displayScore,
    highScore,
    currentGame,
    restartGame 
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
      <button className="start-btn" onClick={startGame} 
      disabled={isTimeRunning}
      >
        {!currentGame ? "Start Game" : "Play Again"}
      </button>
      <h1 className="word-count">Word Count: {wordCount}</h1>
      {highScore.length > 0 &&
        <>
        <div className="high-score">
            High Score: {displayScore} 
        </div>
        <button className="restart-btn" onClick={restartGame} > Restart </button>
      </>
      }
    </div>
  )
}

export default App