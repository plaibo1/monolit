"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type FeedbackType = "like" | "dislike" | null;

export const FeedbackButtons = () => {
  const [feedback, setFeedback] = useState<FeedbackType>(null);

  const handleFeedback = (type: FeedbackType) => {
    setFeedback((prev) => (prev === type ? null : type));
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className={`h-8 w-8 ${feedback === "like" ? "dark:text-white" : ""}`}
        onClick={() => handleFeedback("like")}
      >
        <ThumbsUp
          className={`h-4 w-4 ${feedback === "like" ? "fill-current" : ""}`}
        />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`h-8 w-8 ${feedback === "dislike" ? "dark:text-white" : ""}`}
        onClick={() => handleFeedback("dislike")}
      >
        <ThumbsDown
          className={`h-4 w-4 ${feedback === "dislike" ? "fill-current" : ""}`}
        />
      </Button>
    </>
  );
};
