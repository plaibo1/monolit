import { useState, useRef, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Search, Mic, ArrowRight, RefreshCw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Monolith3D } from "../Monolith3D";
import { InputArea, InputAreaRef } from "./InputArea";

const SAMPLE_QUERIES = [
  "Analyze Q3 revenue growth for Tech Sector",
  "Compare AAPL and MSFT P/E ratios over 5 years",
  "Show me the debt-to-equity ratio for Tesla",
  "What is the current inflation rate impact on bonds?",
  "Forecast Ethereum price trends for 2025",
  "Identify undervalued stocks in the S&P 500",
  "Explain the latest Fed interest rate decision",
  "Visualize Bitcoin's correlation with Nasdaq",
  "Calculate the risk-adjusted return of my portfolio",
  "Find high-yield dividend stocks with low volatility",
  "Summarize the latest earnings call for NVIDIA",
  "What are the top ESG-rated companies in Energy?",
  "Track insider trading activity for Amazon",
  "Predict the impact of oil prices on airline stocks",
  "Show me a breakdown of global market capitalization",
  "Analyze the liquidity ratios of major banks",
  "Compare the performance of Gold vs. S&P 500",
  "What is the sentiment analysis for crypto markets?",
  "List the top performing ETFs this month",
  "Explain the yield curve inversion implications",
];

type CommandCenterProps = {
  onSendMessage: (message: string) => void;
  disabled: boolean;
};

export function CommandCenter({ onSendMessage, disabled }: CommandCenterProps) {
  const [queryIndex, setQueryIndex] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const inputRef = useRef<InputAreaRef>(null);

  // Hold interaction state
  const [holdingQuery, setHoldingQuery] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const startPositionRef = useRef<{ x: number; y: number } | null>(null);
  const HOLD_DURATION = 1500;

  const currentQueries = SAMPLE_QUERIES.slice(queryIndex, queryIndex + 5);

  const clearTimers = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const handlePointerDown = (query: string, e: React.PointerEvent) => {
    setHoldingQuery(query);
    setProgress(0);
    startTimeRef.current = Date.now();
    startPositionRef.current = { x: e.clientX, y: e.clientY };

    // Update progress every 16ms (~60fps)
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / HOLD_DURATION) * 100, 100);
      setProgress(newProgress);
    }, 16);

    // Timer for auto-send
    holdTimerRef.current = setTimeout(() => {
      clearTimers();
      setHoldingQuery(null);
      setProgress(0);
      handleSend(query);
    }, HOLD_DURATION);
  };

  const handlePointerUp = (query: string, e: React.PointerEvent) => {
    if (holdingQuery === query) {
      clearTimers();

      // Проверяем, было ли движение (свайп)
      const SWIPE_THRESHOLD = 10; // пикселей
      let isSwipe = false;

      if (startPositionRef.current) {
        const deltaX = Math.abs(e.clientX - startPositionRef.current.x);
        const deltaY = Math.abs(e.clientY - startPositionRef.current.y);
        isSwipe = deltaX > SWIPE_THRESHOLD || deltaY > SWIPE_THRESHOLD;
      }

      // If progress < 20% (quick click) AND no swipe, just copy text
      // Если был свайп - ничего не делаем
      if (progress < 20 && !isSwipe) {
        inputRef.current?.setValue(query);
        inputRef.current?.focus();
      }

      setHoldingQuery(null);
      setProgress(0);
      startPositionRef.current = null;
    }
  };

  const handlePointerLeave = () => {
    clearTimers();
    setHoldingQuery(null);
    setProgress(0);
    startPositionRef.current = null;
  };

  const handleShuffle = () => {
    setIsShuffling(true);
    setTimeout(() => {
      setQueryIndex((prev) => (prev + 5) % SAMPLE_QUERIES.length);
      setIsShuffling(false);
    }, 300); // Match fade out duration
  };

  const handleSend = (text: string) => {
    if (text.trim() && !disabled) {
      setIsSubmitted(true);
      // Wait for animation to start before actually sending
      setTimeout(() => {
        onSendMessage(text.trim());
        // setInput("");
        setIsSubmitted(false); // Reset for next time if we come back
      }, 800); // Allow time for animation
    }
  };

  return (
    <div
      className={cn(
        "w-full transition-all duration-700 ease-in-out flex flex-col items-center",
        isSubmitted
          ? "translate-y-[40vh] opacity-0"
          : "translate-y-0 opacity-100"
      )}
    >
      {/* Monolith Animation */}
      <div className="w-full h-[200px] mb-4">
        <Monolith3D />
      </div>

      {/* Branding Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Monolit
        </h1>
        <p className="text-lg text-muted-foreground mt-2">Unlock the Market.</p>
      </div>

      {/* Input Bar */}
      <InputArea
        ref={inputRef}
        onSendMessage={handleSend}
        disabled={disabled}
      />

      {/* Suggestion Engine */}
      <div
        className={cn(
          "w-full mt-8 transition-all duration-500",
          isSubmitted ? "opacity-0 translate-y-4" : "opacity-100"
        )}
      >
        <div className="flex items-center justify-between mb-4 px-2">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            TRENDING INQUIRIES
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShuffle}
            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-transparent gap-1"
          >
            <RefreshCw
              className={cn("w-3 h-3", isShuffling && "animate-spin")}
            />
            Shuffle
          </Button>
        </div>

        <div className="space-y-1">
          {currentQueries.map((query, i) => {
            const isHolding = holdingQuery === query;
            return (
              <button
                key={`${queryIndex}-${i}`}
                onPointerDown={(e) => handlePointerDown(query, e)}
                onPointerUp={(e) => handlePointerUp(query, e)}
                onPointerLeave={handlePointerLeave}
                className={cn(
                  "w-full relative overflow-hidden flex items-center gap-3 px-2 py-2 text-left group rounded-lg transition-all duration-300",
                  "dark:hover:bg-zinc-900/60 hover:bg-zinc-200/60 backdrop-blur-md",
                  "touch-none select-none",
                  isShuffling
                    ? "opacity-0 translate-y-2"
                    : "opacity-100 translate-y-0"
                )}
                style={{
                  transitionDelay: `${i * 50}ms`,
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  touchAction: "none",
                }}
              >
                {/* Progress Background */}
                {isHolding && (
                  <div
                    className="absolute inset-0 dark:bg-zinc-800/50 bg-zinc-200/50 transition-all ease-linear"
                    style={{
                      width: `${progress}%`,
                      transition: "none",
                    }}
                  />
                )}

                <Sparkles className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors relative z-10" />
                <span className="text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors relative z-10">
                  {query}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
