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
import { Mic, StopCircle, ArrowRight } from "lucide-react";
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

const MIN_HEIGHT = 44; // Минимальная высота для одной строки
const MAX_HEIGHT = 200; // Максимальная высота

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
        setTimeout(() => {
          textareaRef.current?.focus();
        }, 0);
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

    // Автоматическое изменение высоты при изменении текста
    useEffect(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      // Сбрасываем высоту для правильного расчета scrollHeight
      textarea.style.height = "auto";

      // Вычисляем новую высоту
      const newHeight = Math.max(
        MIN_HEIGHT,
        Math.min(textarea.scrollHeight, MAX_HEIGHT)
      );
      textarea.style.height = `${newHeight}px`;
    }, [input]);

    const handleSend = () => {
      if (input.trim() && !disabled) {
        onSendMessage(input.trim());
        setInput("");
        resetTranscript();
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

    return (
      <>
        <div
          className={cn(
            "w-full relative flex items-end gap-1.5 sm:gap-2 p-1.5 sm:p-2 transition-all duration-300",
            "bg-white/5 dark:bg-black/20 backdrop-blur-3xl border border-white/10 dark:border-white/5 rounded-xl sm:rounded-2xl",
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
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search tokens, wallets, or trends..."
            disabled={disabled}
            rows={1}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "w-full bg-transparent px-2 sm:px-2.5 py-2.5 sm:py-3",
              "text-base md:text-lg leading-normal",
              "text-foreground/90 placeholder:text-muted-foreground/70",
              "focus:outline-none resize-none"
            )}
            style={{
              minHeight: `${MIN_HEIGHT}px`,
              transition: "height 0.15s ease-out",
            }}
          />

          <div className="flex items-center gap-0.5 sm:gap-2 shrink-0 mb-1.5 ml-2">
            {isSupported && (
              <Button
                onClick={handleVoiceToggle}
                disabled={disabled}
                size="icon"
                variant="ghost"
                className={cn(
                  "h-8 w-8 sm:h-10 sm:w-10 rounded-full",
                  "text-muted-foreground/80 hover:text-foreground hover:bg-white/5",
                  "transition-all backdrop-blur-sm border border-white/5 hover:border-white/10",
                  isListening &&
                    "bg-red-500/90 hover:bg-red-600 text-white animate-pulse border-red-400/30"
                )}
                title={isListening ? "Stop recording" : "Start voice input"}
              >
                {isListening ? (
                  <StopCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : (
                  <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
              </Button>
            )}

            <Button
              onClick={handleSend}
              disabled={disabled || !input.trim()}
              size="icon"
              className={cn(
                "h-8 w-8 sm:h-10 sm:w-10 rounded-lg transition-all backdrop-blur-sm",
                "border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
                input.trim()
                  ? "bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-white/5 text-muted-foreground/60 hover:bg-white/10"
              )}
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>

        {isListening && (
          <div className="flex items-center justify-center gap-2 mt-2 text-xs sm:text-sm text-muted-foreground">
            <div className="flex gap-1">
              <span
                className="w-0.5 h-2 sm:w-1 sm:h-3 bg-red-500 rounded-full animate-pulse"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="w-0.5 h-2 sm:w-1 sm:h-3 bg-red-500 rounded-full animate-pulse"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="w-0.5 h-2 sm:w-1 sm:h-3 bg-red-500 rounded-full animate-pulse"
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
