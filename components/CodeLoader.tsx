"use client";

import { useEffect, useState, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { FileCode } from "lucide-react";

interface CodeLoaderProps {
  /**
   * Text to display in the header (e.g. filename)
   */
  filename?: string;
  /**
   * Maximum number of lines to keep in the viewport before scrolling
   */
  maxLines?: number;
  /**
   * Speed in ms between new lines appearing
   */
  lineDuration?: number;
}

const COLORS = [
  "bg-blue-400/50 ",
  "bg-green-400/50 ",
  "bg-purple-400/50 ",
  "bg-red-400/50 ",
  "bg-yellow-400/50 ",
  "bg-slate-200/60",
  "bg-slate-300/50",
];

const generateLine = (prevIndent: number) => {
  let newIndent = prevIndent;
  const random = Math.random();

  if (random > 0.75 && prevIndent < 6) newIndent += 1;
  else if (random < 0.15 && prevIndent > 0) newIndent -= 1;

  newIndent = Math.max(0, newIndent);

  const tokenCount = Math.floor(Math.random() * 4) + 1;
  const tokens = Array.from({ length: tokenCount }).map((_, idx) => {
    // First token tends to be shorter (like keywords)
    const baseWidth = idx === 0 ? 30 : 50;
    const variance = idx === 0 ? 30 : 70;

    return {
      width: Math.floor(Math.random() * variance) + baseWidth,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  });

  return {
    indent: newIndent,
    tokens,
    id: Math.random().toString(36).substring(7),
  };
};

export function CodeLoader({
  filename = "Generating dashboard...",
  maxLines = 18,
  lineDuration = 380,
}: CodeLoaderProps) {
  const [lines, setLines] = useState<
    { indent: number; tokens: { width: number; color: string }[]; id: string }[]
  >([]);
  const currentIndent = useRef(0);

  useEffect(() => {
    setLines([
      {
        indent: 0,
        tokens: [
          { width: 50, color: "bg-red-400/50 dark:bg-red-500/40" },
          { width: 90, color: "bg-slate-200/60" },
        ],
        id: "init-1",
      },
      {
        indent: 5,
        tokens: [
          { width: 35, color: "bg-blue-400/50 dark:bg-blue-500/40" },
          { width: 45, color: "bg-green-400/50 dark:bg-green-500/40" },
        ],
        id: "init-2",
      },
    ]);
    currentIndent.current = 1;

    const interval = setInterval(() => {
      setLines((prev) => {
        const newLine = generateLine(currentIndent.current);
        currentIndent.current = newLine.indent;

        const newLines = [...prev, newLine];
        if (newLines.length > maxLines) {
          return newLines.slice(newLines.length - maxLines);
        }
        return newLines;
      });
    }, lineDuration);

    return () => clearInterval(interval);
  }, [maxLines, lineDuration]);

  return (
    <div className="relative w-full flex justify-start">
      <div className="w-full max-w-lg rounded-2xl border border-border/40 bg-background shadow-lg overflow-hidden mb-8">
        <div className="relative flex items-center justify-between px-4 py-3 border-b border-border/40 bg-muted/20">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400/80 animate-bounce [animation-delay:-0.3s]" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80 animate-bounce [animation-delay:-0.15s]" />
            <div className="w-3 h-3 rounded-full bg-green-400/80 animate-bounce" />
          </div>
          <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground flex items-center gap-2">
            <FileCode className="w-3.5 h-3.5" />
            {filename}
          </div>
        </div>

        <div className="p-6 font-mono text-sm h-[280px] overflow-hidden relative">
          <div className="flex flex-col gap-2">
            {lines.map((line) => (
              <div
                key={line.id}
                className="flex items-center gap-2.5 animate-in fade-in slide-in-from-left-1 duration-200"
                style={{ paddingLeft: `${line.indent * 7}px` }}
              >
                {line.tokens.map((token, tIndex) => (
                  <Skeleton
                    key={tIndex}
                    className={cn("h-3.5 rounded", token.color)}
                    style={{ width: `${token.width}px` }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Gradient fade at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
        </div>

        {/* Footer Status Bar */}
        {/* <div className="flex items-center justify-between px-3 py-1.5 bg-muted/30 text-[10px] text-muted-foreground font-medium">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Generating code...
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span>UTF-8</span>
            <span>TypeScript</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}
