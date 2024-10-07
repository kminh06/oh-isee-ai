'use client'

import React, { useState, useEffect } from 'react'

export default function IncrementalWordRender({ sentence }) {
  const words = sentence.split(' ')

  const [displayedWords, setDisplayedWords] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < words.length) {
      const timer = setTimeout(() => {
        setDisplayedWords((prevWords) => [...prevWords, words[currentIndex]])
        setCurrentIndex((prevIndex) => prevIndex + 1)
      }, 10) // Adjust the delay (in milliseconds) as needed

      return () => clearTimeout(timer) // Clean up timer on component unmount
    }
  }, [currentIndex, words])

  return <div>{displayedWords.join(' ')}</div>
}
