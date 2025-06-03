import SentimentAnalyzer from "@/components/sentiment-analyzer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-green-500 p-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl md:text-4xl font-mono mb-8 glitch-text">SENTIMENT ANALYZER</h1>
      <SentimentAnalyzer />
      <footer className="fixed bottom-4 font-mono text-xs opacity-50">&gt; SYSTEM READY // AWAITING INPUT</footer>
    </main>
  )
}
