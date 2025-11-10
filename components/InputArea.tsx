"use client";

import { useState, useEffect, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, MicOff } from "lucide-react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

type InputAreaProps = {
  onSendMessage: (message: string) => void;
  disabled: boolean;
};

export function InputArea({ onSendMessage, disabled }: InputAreaProps) {
  const [input, setInput] = useState("");

  const {
    isListening,
    isSupported,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    // error,
  } = useSpeechRecognition();

  // Update input field with voice transcript
  useEffect(() => {
    if (transcript) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInput(transcript);
    }
  }, [transcript]);

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
      startListening();
    }
  };

  return (
    <div className="border-t bg-background p-4">
      <div className="max-w-4xl mx-auto flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
          disabled={disabled}
          className="min-h-[60px] max-h-[200px] resize-none"
          rows={2}
        />
        {isSupported && (
          <Button
            onClick={handleVoiceToggle}
            disabled={disabled}
            size="icon"
            variant={isListening ? "destructive" : "outline"}
            className="h-[60px] w-[60px] shrink-0"
            title={isListening ? "Stop recording" : "Start voice input"}
          >
            {isListening ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
            <span className="sr-only">
              {isListening ? "Stop recording" : "Start voice input"}
            </span>
          </Button>
        )}
        <Button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          size="icon"
          className="h-[60px] w-[60px] shrink-0"
        >
          <Send className="w-5 h-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  );
}
