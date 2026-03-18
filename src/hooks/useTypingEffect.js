import { useState, useEffect } from 'react'

export const useTypingEffect = (words, typeSpeed = 100, pauseTime = 2000, deleteSpeed = 50) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[currentWordIndex]

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(prev => prev.slice(0, -1))
        if (currentText === '') {
          setIsDeleting(false)
          setCurrentWordIndex(prev => (prev + 1) % words.length)
        }
      } else {
        setCurrentText(prev => currentWord.slice(0, prev.length + 1))
        if (currentText === currentWord) {
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, currentWordIndex, isDeleting, words, typeSpeed, pauseTime, deleteSpeed])

  return currentText
}