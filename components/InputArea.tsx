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
import { Send, Mic, MicOff, StopCircle } from "lucide-react";
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
      <div className="border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div
            className={cn(
              "relative flex items-end gap-2 rounded-3xl border border-input bg-background shadow-sm transition-all",
              "focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent",
              disabled && "opacity-50"
            )}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Message..."
              disabled={disabled}
              rows={1}
              className={cn(
                "flex-1 bg-transparent px-4 py-3 text-sm resize-none outline-none",
                "placeholder:text-muted-foreground",
                "max-h-[200px] overflow-y-auto scrollbar-thin"
              )}
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
                    "h-8 w-8 rounded-full shrink-0 transition-all",
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
                  "h-8 w-8 rounded-full shrink-0 transition-all",
                  input.trim() && !disabled
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-muted hover:bg-muted"
                )}
              >
                <Send className="w-4 h-4" />
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
        </div>
      </div>
    );
  }
);

InputArea.displayName = "InputArea";
