"use client"

import { useState, useEffect } from "react"

interface AsciiFaceProps {
  polarity: number
}

export default function AsciiFace({ polarity }: AsciiFaceProps) {
  const [currentPolarity, setCurrentPolarity] = useState(polarity)
  const [transitioning, setTransitioning] = useState(false)

  // Smoothly transition between emotions
  useEffect(() => {
    if (polarity !== currentPolarity) {
      setTransitioning(true)
      const timer = setTimeout(() => {
        setCurrentPolarity(polarity)
        setTransitioning(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [polarity, currentPolarity])

  // Generate face based on polarity
  const getFace = (polarity: number) => {
    // Very happy: 0.6 to 1.0
    if (polarity >= 0.6) {
      return `
    ████████████████████████████████████████
    ██                                    ██
    ██    ●●●●●●        ●●●●●●            ██
    ██    ●●●●●●        ●●●●●●            ██
    ██                                    ██
    ██                                    ██
    ██  ●●                        ●●      ██
    ██    ●●                    ●●        ██
    ██      ●●●●●●●●●●●●●●●●●●●●          ██
    ██                                    ██
    ████████████████████████████████████████`
    }
    // Happy: 0.2 to 0.6
    else if (polarity >= 0.2) {
      return `
    ████████████████████████████████████████
    ██                                    ██
    ██    ●●●●●●        ●●●●●●            ██
    ██    ●●●●●●        ●●●●●●            ██
    ██                                    ██
    ██                                    ██
    ██      ●●              ●●            ██
    ██        ●●●●●●●●●●●●●●              ██
    ██                                    ██
    ██                                    ██
    ████████████████████████████████████████`
    }
    // Neutral: -0.2 to 0.2
    else if (polarity >= -0.2) {
      return `
    ████████████████████████████████████████
    ██                                    ██
    ██    ●●●●●●        ●●●●●●            ██
    ██    ●●●●●●        ●●●●●●            ██
    ██                                    ██
    ██                                    ██
    ██                                    ██
    ██        ●●●●●●●●●●●●●●              ██
    ██                                    ██
    ██                                    ██
    ████████████████████████████████████████`
    }
    // Sad: -0.6 to -0.2
    else if (polarity >= -0.6) {
      return `
    ████████████████████████████████████████
    ██                                    ██
    ██    ●●●●●●        ●●●●●●            ██
    ██    ●●●●●●        ●●●●●●            ██
    ██                                    ██
    ██                                    ██
    ██                                    ██
    ██        ●●●●●●●●●●●●●●              ██
    ██      ●●              ●●            ██
    ██                                    ██
    ████████████████████████████████████████`
    }
    // Very sad: -1.0 to -0.6
    else {
      return `
    ████████████████████████████████████████
    ██                                    ██
    ██    ●●●●●●        ●●●●●●            ██
    ██    ●●●●●●        ●●●●●●            ██
    ██                                    ██
    ██                                    ██
    ██      ●●●●●●●●●●●●●●●●●●●●          ██
    ██    ●●                    ●●        ██
    ██  ●●                        ●●      ██
    ██                                    ██
    ████████████████████████████████████████`
    }
  }

  return <pre>{getFace(currentPolarity)}</pre>
}
