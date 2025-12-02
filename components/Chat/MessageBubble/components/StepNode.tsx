"use client";

// import { useState, useEffect, useRef } from "react";
import {
  // ChevronDown,
  // ChevronRight,
  // GitPullRequest,
  // Terminal,
  Lightbulb,
  ListChecks,
  Wrench,
  FileCode,
  Circle,
  CheckCircle2,
  XCircle,
  Clock,
  Zap,
  Loader2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ExecutionStep } from "@/types/chat";

const stepIcons = {
  intention: Lightbulb,
  planning: ListChecks,
  tool: Wrench,
  html: FileCode,
  other: Circle,
};

const stepColors = {
  intention: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  planning: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  tool: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  html: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  other: "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

const statusIcons = {
  pending: Clock,
  success: CheckCircle2,
  error: XCircle,
  running: Zap,
};

export const StepNode = ({
  step,
  isActive,
  isDone,
  onClick,
}: {
  step: ExecutionStep;
  isActive?: boolean;
  isDone?: boolean;
  onClick?: () => void;
}) => {
  const Icon = stepIcons[step.type];
  const StatusIcon =
    statusIcons[
      step.isError ? "error" : step.isComplete ? "success" : "running"
    ];
  const statusColor = step.isError
    ? "text-destructive"
    : step.isComplete
    ? "text-green-500"
    : "text-amber-500";

  return (
    <div
      className={cn(
        "relative flex items-start gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer hover:bg-accent/50",
        isActive ? "bg-accent" : ""
      )}
      onClick={onClick}
    >
      <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

      <div
        className={cn(
          "relative z-10 shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2",
          stepColors[step.type].split(" ")[0],
          stepColors[step.type].split(" ")[1],
          "border-background"
        )}
      >
        <Icon className="w-3 h-3" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{step.name}</span>

          {/* tmp solution */}
          {!Boolean(step.output) || step.output === "Running..." ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : isDone ? (
            <CheckCircle2 className={cn("w-3.5 h-3.5", "text-green-500")} />
          ) : (
            <StatusIcon className={cn("w-3.5 h-3.5", statusColor)} />
          )}
        </div>
        {step.output && (
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
            {step.output}
          </p>
        )}
      </div>
    </div>
  );
};
