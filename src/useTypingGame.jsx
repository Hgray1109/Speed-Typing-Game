import {useState, useEffect, useRef} from 'react'

function useTypingGame(startingTime = 10) {
    const [textArea, setTextArea] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(startingTime)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const textAreaRef = useRef(null)
    

        function handleChange(event) {
        setTextArea(event.target.value)
        }

        function calculateWordCount(textarea) {
        const wordsArray = textArea.trim().split(" ")
        const filteredWords = wordsArray.filter(word => word !== "")
        return filteredWords.length
        }

        function startGame() {
        setIsTimeRunning(true)
        setTimeRemaining(startingTime)
        
        textAreaRef.current.focus()
        setTextArea("")
        }

        function endGame() {
        setIsTimeRunning(false)
        setWordCount(calculateWordCount(textArea))
        
        }

        useEffect(() => {
        if(isTimeRunning && timeRemaining > 0){
            setTimeout(() => {
            setTimeRemaining(prevTime => prevTime - 1)
            }, 1000)
        } else if(timeRemaining === 0) {
            endGame()
        }
        }, [timeRemaining, isTimeRunning])

        useEffect(() => {
        if (isTimeRunning) {
        textAreaRef.current.focus();
        }
    }, [isTimeRunning]);
    
    return {textAreaRef, handleChange, textArea, isTimeRunning, timeRemaining, startGame, wordCount}
}

export default useTypingGame