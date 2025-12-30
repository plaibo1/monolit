"use client";

import { useEffect, useState, useRef } from "react";
import { useSocketStore } from "@/store/useSocketStore";
import {
  Terminal,
  Trash2,
  Wifi,
  WifiOff,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Monitor,
  XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DEBUG_EVENT_KEY } from "./utils";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

export const ChatDebugger = () => {
  const [isShow, setShowDebugger] = useState(
    process.env.NEXT_PUBLIC_SOCKET_DEBUG === "true"
  );
  const konamiIndex = useRef(0);

  // Konami Code Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === KONAMI_CODE[konamiIndex.current]) {
        const nextIndex = konamiIndex.current + 1;
        if (nextIndex === KONAMI_CODE.length) {
          setShowDebugger(true);
          konamiIndex.current = 0;
        } else {
          konamiIndex.current = nextIndex;
        }
      } else {
        konamiIndex.current = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Custom Event Listener
  useEffect(() => {
    const handleToggle = () => setShowDebugger(!isShow);
    window.addEventListener(DEBUG_EVENT_KEY, handleToggle);
    return () => window.removeEventListener(DEBUG_EVENT_KEY, handleToggle);
  }, [isShow, setShowDebugger]);

  if (!isShow) return null;

  return <>{isShow && <Debugger />}</>;
};

const Debugger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logs, clearLogs, socketStatus } = useSocketStore();

  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Sheet open={isOpen} modal={false}>
      <SheetTrigger
        className="fixed bottom-1/2 translate-y-1/2 right-4"
        asChild
      >
        <Button
          onClick={() => setIsOpen(true)}
          variant="default"
          size="icon"
          className="bg-green-400 hover:bg-green-300"
        >
          <Terminal className="w-4 h-4" />
        </Button>
      </SheetTrigger>

      <SheetContent
        customClose
        // className="w-full max-w-full sm:w-[40%] h-screen flex flex-col p-0 gap-0 overflow-hidden border-zinc-800 bg-zinc-950 text-zinc-100 bg-opacity-95 backdrop-blur-xl"
        className="w-full sm:max-w-full md:w-[500px] md:max-w-[500px] p-0 gap-0 bg-opacity-95 backdrop-blur-2xl"
      >
        <SheetHeader className="p-4 border-b border-zinc-800 flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Terminal className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <SheetTitle className="text-lg font-semibold tracking-tight">
                System Debugger
              </SheetTitle>
              <div className="flex items-center gap-2 mt-0.5">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full animate-pulse",
                    socketStatus === "connected"
                      ? "bg-emerald-500"
                      : socketStatus === "connecting"
                      ? "bg-amber-500"
                      : "bg-rose-500"
                  )}
                />
                <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">
                  Socket: {socketStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearLogs}
              className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="ml-4"
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="relative max-h-screen overflow-y-auto flex-1 p-4 font-mono text-xs h-[500px]">
          <div className="space-y-1">
            {logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-zinc-600">
                <Monitor className="w-12 h-12 mb-4 opacity-20" />
                <p>No socket activity recorded yet.</p>
              </div>
            ) : (
              logs.map((log, i) => (
                <LogEntry
                  key={`${log.timestamp}-${i}`}
                  log={log}
                  onCopy={(text) =>
                    copyToClipboard(text, `${log.timestamp}-${i}`)
                  }
                  isCopied={copiedId === `${log.timestamp}-${i}`}
                />
              ))
            )}
          </div>
        </div>

        <div className="p-2 bg-zinc-900/50 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-500 px-4">
          <span>Total Logs: {logs.length}</span>
          <span>Press ESC to close</span>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const LogEntry = ({
  log,
  onCopy,
  isCopied,
}: {
  log: any;
  onCopy: (text: string) => void;
  isCopied: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const typeColors = {
    info: "text-blue-400",
    error: "text-rose-400 font-bold",
    in: "text-emerald-400",
    out: "text-purple-400",
  };

  const typeIcons = {
    info: <Wifi className="w-3 h-3" />,
    error: <WifiOff className="w-3 h-3" />,
    in: <ChevronDown className="w-3 h-3" />,
    out: <ChevronRight className="w-3 h-3" />,
  };

  const hasData =
    log.data && (typeof log.data === "object" || Array.isArray(log.data));

  return (
    <div className="group border border-transparent hover:border-zinc-800 hover:bg-zinc-900/50 rounded transition-all">
      <div
        className={cn(
          "flex items-start gap-3 p-1.5 cursor-pointer select-none",
          isOpen && "bg-zinc-900/80 border-b border-zinc-800"
        )}
        onClick={() => hasData && setIsOpen(!isOpen)}
      >
        <span className="text-zinc-600 shrink-0 w-16">{log.timestamp}</span>
        <span
          className={cn(
            "shrink-0 flex items-center gap-1 w-12",
            typeColors[log.type as keyof typeof typeColors]
          )}
        >
          {typeIcons[log.type as keyof typeof typeIcons]}
          {log.type.toUpperCase()}
        </span>
        <span className="flex-1 truncate text-zinc-300">
          {log.message}
          {!isOpen && hasData && (
            <span className="ml-2 text-zinc-600 opacity-50 italic">
              {JSON.stringify(log.data).substring(0, 50)}...
            </span>
          )}
        </span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-zinc-500 hover:text-zinc-100"
            onClick={(e) => {
              e.stopPropagation();
              onCopy(JSON.stringify(log, null, 2));
            }}
          >
            {isCopied ? (
              <Check className="w-3 h-3 text-emerald-500" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </Button>
          {hasData && (
            <div className="text-zinc-600">
              {isOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
          )}
        </div>
      </div>

      {isOpen && hasData && (
        <div className="p-3 bg-black/40 text-zinc-400 overflow-x-auto">
          <pre className="text-[10px] leading-relaxed">
            {JSON.stringify(log.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
