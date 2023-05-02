import {useState, useEffect, useRef} from 'react'

function useTypingGame(startingTime = 10) {
    const [textArea, setTextArea] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(startingTime)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const [highScore, setHighScore] = useState([])
    const [currentGame, setCurrentGame] = useState(false)
    const textAreaRef = useRef(null)
    

        function handleChange(event) {
        setTextArea(event.target.value)
        }

        function calculateWordCount(textArea) {
        const wordsArray = textArea.trim().split(" ")
        const filteredWords = wordsArray.filter(word => word !== "")
        return filteredWords.length
        }

        function calculateHighScore(wordCountTally){
            const newHighScore = [
                ...highScore, wordCountTally
            ]

            newHighScore.sort((a, b) =>  a > b ? -1 : 1);
            const topFiveScores = newHighScore.slice(0,5);
            setHighScore(topFiveScores)
        }
        
       
        const displayScore = highScore.map((score, i) => {
        return <h4 className="score-list" key={i}>{score}</h4> })
            

        function startGame() {
        setIsTimeRunning(true)
        setTimeRemaining(startingTime)
        setCurrentGame(true)
        textAreaRef.current.focus()
        setTextArea("")
        }

        function endGame() {
        const wordCountTally = calculateWordCount(textArea)
        calculateHighScore(wordCountTally)
        setIsTimeRunning(false)
        setWordCount(wordCountTally)
        }

        function restartGame() {
            setTextArea("")
            setIsTimeRunning(false)
            setHighScore([])
            setTimeRemaining(startingTime)
            setWordCount(0)
            setCurrentGame(false)
        }


        useEffect(() => {
        if(isTimeRunning && timeRemaining > 0){
            setTimeout(() => {
            setTimeRemaining(prevTime => prevTime - 1)
            }, 1000)
        } else if(timeRemaining === 0 && isTimeRunning) {
            endGame()
        }
        }, [timeRemaining, isTimeRunning])

        useEffect(() => {
        if (isTimeRunning) {
        textAreaRef.current.focus();
        }
    }, [isTimeRunning]);
    
    return {textAreaRef, handleChange, textArea, isTimeRunning, timeRemaining, startGame, wordCount, displayScore, highScore, currentGame, restartGame}
}

export default useTypingGame