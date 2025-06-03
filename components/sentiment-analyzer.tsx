"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AsciiFace from "@/components/ascii-face"

interface SentimentResponse {
  sentiment: "positive" | "negative" | "neutral"
  polarity: number
}

export default function SentimentAnalyzer() {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SentimentResponse | null>(null)
  const [history, setHistory] = useState<Array<{ text: string; result: SentimentResponse }>>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Mock API call - replace with your actual API endpoint
  const analyzeSentiment = async (text: string): Promise<SentimentResponse> => {
    setLoading(true)

    try {
      // Replace with your actual API endpoint
      // const response = await fetch('https://your-api-endpoint.com/analyze', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ text })
      // });
      // return await response.json();

      // Mock response for demonstration
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Simple mock sentiment analysis
      const words = text.toLowerCase().split(/\s+/)
      const positiveWords = ["good", "great", "excellent", "happy", "love", "nice", "wonderful", "amazing"]
      const negativeWords = ["bad", "terrible", "awful", "sad", "hate", "horrible", "disappointing"]

      let score = 0
      words.forEach((word) => {
        if (positiveWords.includes(word)) score += 0.2
        if (negativeWords.includes(word)) score -= 0.2
      })

      // Clamp between -1 and 1
      score = Math.max(-1, Math.min(1, score))

      const sentiment = score > 0.1 ? "positive" : score < -0.1 ? "negative" : "neutral"

      return { sentiment, polarity: Number.parseFloat(score.toFixed(2)) }
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    const sentimentResult = await analyzeSentiment(text)
    setResult(sentimentResult)
    setHistory((prev) => [...prev, { text, result: sentimentResult }])
    setText("")

    // Focus back on input
    inputRef.current?.focus()
  }

  return (
    <div className="w-full max-w-3xl">
      <div className="border border-green-500 rounded-md p-4 mb-6 bg-black">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Terminal className="w-4 h-4 mr-2" />
            <span className="font-mono text-xs">terminal@sentiment-analyzer:~$</span>
          </div>
          <div className="flex space-x-1">
            {["#00FF00", "#FF0000", "#FFFF00"].map((color, i) => (
              <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>

        <div className="ascii-container h-[400px] overflow-hidden flex flex-col items-center justify-center">
          <AsciiFace polarity={result?.polarity || 0} />
        </div>

        <div className="mt-4 font-mono text-xs">
          {result && (
            <div className="typing-effect">
              &gt; Analysis complete:
              <span
                className={
                  result.sentiment === "positive"
                    ? "text-green-400"
                    : result.sentiment === "negative"
                      ? "text-red-400"
                      : "text-yellow-400"
                }
              >
                {" "}
                {result.sentiment.toUpperCase()} ({result.polarity})
              </span>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to analyze sentiment..."
          className="font-mono bg-black border-green-500 text-green-500 focus-visible:ring-green-500"
          disabled={loading}
          autoFocus
        />
        <Button
          type="submit"
          disabled={loading || !text.trim()}
          className="bg-green-700 hover:bg-green-600 text-black font-mono"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </Button>
      </form>

      <div className="mt-6">
        <h2 className="font-mono text-sm mb-2">&gt; History:</h2>
        <div className="border border-green-500 rounded-md p-2 max-h-40 overflow-y-auto bg-black/50">
          {history.length === 0 ? (
            <p className="text-xs font-mono opacity-50">No history yet</p>
          ) : (
            history.map((item, index) => (
              <div key={index} className="text-xs font-mono mb-1">
                <span className="opacity-50">[{index + 1}]</span> {item.text.substring(0, 40)}
                {item.text.length > 40 ? "..." : ""}
                <span
                  className={
                    item.result.sentiment === "positive"
                      ? "text-green-400"
                      : item.result.sentiment === "negative"
                        ? "text-red-400"
                        : "text-yellow-400"
                  }
                >
                  {" "}
                  {item.result.sentiment} ({item.result.polarity})
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
