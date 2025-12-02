import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const GridArchitectLoader = () => {
  const [stage, setStage] = useState(0);
  const [tick, setTick] = useState(0);
  // Narrative Phases: 0=Init, 1=Scanning, 2=Charting, 3=Synthesizing
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Initial Build - Slower
    const timer1 = setTimeout(() => setStage(1), 400);
    const timer2 = setTimeout(() => setStage(2), 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Narrative Sequence Loop - Slower
  useEffect(() => {
    if (stage < 2) return;

    const runSequence = () => {
      setPhase(1); // Scanning
      setTimeout(() => setPhase(2), 3000); // Charting (Orderbook/Candlesticks)
      setTimeout(() => setPhase(3), 6000); // Synthesizing (Twitter Scroll)
    };

    runSequence();
    const interval = setInterval(runSequence, 9000); // Loop every 9s

    return () => clearInterval(interval);
  }, [stage]);

  // Animation Loop - Slower tick
  useEffect(() => {
    if (stage < 2) return;
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 200);
    return () => clearInterval(interval);
  }, [stage]);

  return (
    <div className="min-w-full min-h-[160px] p-6 relative flex flex-col justify-center overflow-hidden bg-background font-mono rounded-xl border border-border">
      {/* Frame 1: Outer Border Drawing */}
      <div className="absolute inset-0 border border-border animate-draw-border rounded-xl" />

      {/* Content Container */}
      <div
        className={cn(
          "relative z-10 w-full h-full flex flex-col gap-4 transition-opacity duration-500",
          stage >= 1 ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Header Row */}
        <div className="flex items-center justify-between h-6 border-b border-border/50 pb-2">
          <div className="flex gap-2 items-center">
            <div
              className={cn(
                "w-2 h-2 rounded-full transition-colors duration-500",
                phase === 1
                  ? "bg-zinc-400 dark:bg-zinc-500 animate-pulse"
                  : "bg-zinc-200 dark:bg-zinc-800"
              )}
            />
            <div
              className={cn(
                "w-2 h-2 rounded-full transition-colors duration-500",
                phase === 2
                  ? "bg-zinc-400 dark:bg-zinc-500 animate-pulse"
                  : "bg-zinc-200 dark:bg-zinc-800"
              )}
            />
            <div
              className={cn(
                "w-2 h-2 rounded-full transition-colors duration-500",
                phase === 3
                  ? "bg-zinc-400 dark:bg-zinc-500 animate-pulse"
                  : "bg-zinc-200 dark:bg-zinc-800"
              )}
            />
          </div>
          {/* Generating Text */}
          <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider animate-pulse">
            GENERATING DASHBOARD...
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative min-h-[100px]">
          {/* PHASE 1: SCANNING (Abstract Text/Logs) */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col gap-2 transition-all duration-700",
              phase === 1
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            )}
          >
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-1 h-4 bg-zinc-200 dark:bg-zinc-800 transition-colors duration-200",
                    tick % 5 === i ? "bg-zinc-400 dark:bg-zinc-500" : ""
                  )}
                />
                <div className="h-2 bg-zinc-100 dark:bg-zinc-800/50 rounded w-full overflow-hidden relative">
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 bg-zinc-300 dark:bg-zinc-700/50 transition-all duration-500",
                      tick % 5 === i ? "w-full" : "w-0"
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* PHASE 2: CHARTING (Order Book & Candlesticks) */}
          <div
            className={cn(
              "absolute inset-0 grid grid-cols-2 gap-4 transition-all duration-700",
              phase === 2
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            )}
          >
            {/* Left: Order Book Dynamics (Center Out) - MONOCHROME */}
            <div className="flex flex-col justify-center gap-1.5 relative w-full h-full">
              {/* Center Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-border z-10" />

              {[...Array(6)].map((_, i) => (
                <div key={i} className="grid grid-cols-2 w-full h-1.5 gap-1">
                  {/* Left Side (Bids) - Darker Zinc */}
                  <div className="flex justify-end h-full">
                    <div
                      className="h-full bg-zinc-500 dark:bg-zinc-400 rounded-sm transition-all duration-300"
                      style={{
                        width: `${Math.random() * 80 + 10}%`,
                        opacity: tick % 2 === 0 ? 1 : 0.6,
                      }}
                    />
                  </div>
                  {/* Right Side (Asks) - Lighter Zinc */}
                  <div className="flex justify-start h-full">
                    <div
                      className="h-full bg-zinc-300 dark:bg-zinc-600 rounded-sm transition-all duration-300"
                      style={{
                        width: `${Math.random() * 80 + 10}%`,
                        opacity: tick % 2 === 1 ? 1 : 0.6,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Candlestick Patterns - MONOCHROME */}
            <div className="flex items-end justify-between gap-1 px-1 h-full pb-1">
              {[...Array(8)].map((_, i) => {
                const isUp = Math.sin(tick * 0.5 + i) > 0;
                const height =
                  30 + (Math.sin(tick * 0.2 + i * 0.5) * 0.5 + 0.5) * 60;
                return (
                  <div
                    key={i}
                    className="relative w-full flex justify-center items-end h-full"
                  >
                    {/* Wick */}
                    <div
                      className={cn(
                        "absolute w-[1px] bg-foreground transition-all duration-500"
                      )}
                      style={{ height: `${height}%`, bottom: "0" }}
                    />
                    {/* Body */}
                    <div
                      className={cn(
                        "relative w-full rounded-[1px] transition-all duration-500 border border-foreground",
                        isUp ? "bg-foreground" : "bg-background"
                      )}
                      style={{
                        height: `${height * 0.6}%`,
                        marginBottom: `${height * 0.2}%`,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* PHASE 3: SYNTHESIZING (Twitter Alpha Scroll) - FASTER SCROLL */}
          <div
            className={cn(
              "absolute inset-0 overflow-hidden transition-all duration-700",
              phase === 3
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            )}
          >
            {/* Scrolling Container - Faster (2s) */}
            <div className="flex flex-col gap-3 animate-[scroll-up_2s_linear_infinite]">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg flex gap-3 items-start flex-shrink-0"
                >
                  {/* Avatar */}
                  <div className="w-6 h-6 rounded-full bg-zinc-300 dark:bg-zinc-700 flex-shrink-0" />
                  {/* Content */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <div className="h-1.5 w-16 bg-zinc-400 dark:bg-zinc-600 rounded" />
                    <div className="h-1.5 w-full bg-zinc-300 dark:bg-zinc-700 rounded" />
                    <div className="h-1.5 w-3/4 bg-zinc-300 dark:bg-zinc-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
            {/* Gradient Masks for Scroll Depth */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
