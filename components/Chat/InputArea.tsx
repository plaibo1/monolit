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
            "bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/50",
            isFocused ? "ring-1 ring-ring border-ring" : "hover:border-ring/50"
          )}
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
            className="flex-1 bg-transparent px-2 py-3 text-base md:text-lg text-foreground placeholder:text-muted-foreground focus:outline-none w-full"
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
                  "h-10 w-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                  isListening &&
                    "bg-red-500 hover:bg-red-600 text-white animate-pulse"
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
                "h-10 w-10 rounded-lg transition-all",
                input.trim()
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-muted-foreground"
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
