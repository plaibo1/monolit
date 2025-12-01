"use client";

import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  type KeyboardEvent,
} from "react";
import { Button } from "@/components/ui/button";
import { Send, Mic, StopCircle, ArrowRight, Search } from "lucide-react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { cn } from "@/lib/utils";

type InputAreaProps = {
  onSendMessage: (message: string) => void;
  disabled: boolean;
};

export type InputAreaRef = {
  setValue: (value: string) => void;
  focus: () => void;
};

export const InputArea = forwardRef<InputAreaRef, InputAreaProps>(
  ({ onSendMessage, disabled }, ref) => {
    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const {
      isListening,
      isSupported,
      transcript,
      startListening,
      stopListening,
      resetTranscript,
    } = useSpeechRecognition();

    useImperativeHandle(ref, () => ({
      setValue: (value: string) => {
        setInput(value);
        setTimeout(() => textareaRef.current?.focus(), 0);
      },
      focus: () => {
        textareaRef.current?.focus();
      },
    }));

    useEffect(() => {
      if (isListening && transcript) {
        setInput(transcript);
      }
    }, [transcript, isListening]);

    const handleSend = () => {
      if (input.trim() && !disabled) {
        onSendMessage(input.trim());
        setInput("");
        resetTranscript();
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };

    const handleVoiceToggle = () => {
      if (isListening) {
        stopListening();
      } else {
        resetTranscript();
        startListening();
      }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
      e.target.style.height = "auto";
      e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
    };

    return (
      <>
        <div
          className={cn(
            "w-full relative flex items-end gap-2 p-2 transition-all duration-300",
            "bg-white/5 dark:bg-black/20 backdrop-blur-3xl border border-white/10 dark:border-white/5 rounded-2xl",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]",
            isFocused
              ? "ring-1 ring-white/20 shadow-lg"
              : "hover:border-white/20 hover:shadow-md"
          )}
          style={{
            background:
              "radial-gradient(at top left, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Search tokens, wallets, or trends..."
            disabled={disabled}
            rows={1}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 bg-transparent px-2 py-3 text-base md:text-lg text-foreground/90 placeholder:text-muted-foreground/70 focus:outline-none w-full"
            style={{ minHeight: "24px" }}
          />

          <div className="flex items-center gap-1 pr-2 pb-2">
            {isSupported && (
              <Button
                onClick={handleVoiceToggle}
                disabled={disabled}
                size="icon"
                variant="ghost"
                className={cn(
                  "h-10 w-10 mr-1 rounded-full text-muted-foreground/80 hover:text-foreground hover:bg-white/5 transition-all",
                  "backdrop-blur-sm border border-white/5 hover:border-white/10",
                  isListening &&
                    "bg-red-500/90 hover:bg-red-600 text-white animate-pulse border-red-400/30"
                )}
                title={isListening ? "Stop recording" : "Start voice input"}
              >
                {isListening ? (
                  <StopCircle className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </Button>
            )}

            <Button
              onClick={handleSend}
              disabled={disabled || !input.trim()}
              size="icon"
              className={cn(
                "h-10 w-10 rounded-lg transition-all backdrop-blur-sm",
                "border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
                input.trim()
                  ? "bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-white/5 text-muted-foreground/60 hover:bg-white/10"
              )}
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {isListening && (
          <div className="flex items-center justify-center gap-2 mt-2 text-xs text-muted-foreground">
            <div className="flex gap-1">
              <span
                className="w-1 h-3 bg-red-500 rounded-full animate-pulse"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="w-1 h-3 bg-red-500 rounded-full animate-pulse"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="w-1 h-3 bg-red-500 rounded-full animate-pulse"
                style={{ animationDelay: "300ms" }}
              />
            </div>
            <span>Listening...</span>
          </div>
        )}
      </>
    );
  }
);

InputArea.displayName = "InputArea";
