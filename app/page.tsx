import SentimentAnalyzer from "@/components/sentiment-analyzer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-green-500 p-2 flex flex-col items-center justify-center">
      <h1 className="text-xl md:text-2xl font-mono mb-4 glitch-text">SENTIMENT ANALYZER</h1>
      <SentimentAnalyzer />
      <footer className="fixed bottom-2 font-mono text-xs opacity-50">&gt; SYSTEM READY // AWAITING INPUT</footer>
    </main>
  )
}
