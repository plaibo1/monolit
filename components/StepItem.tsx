"use client";

import type { ExecutionStep } from "@/types/chat";
import { Card } from "@/components/ui/card";
import {
  Lightbulb,
  ListChecks,
  Wrench,
  Circle,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { StepContent } from "./StepContent";

type StepItemProps = {
  step: ExecutionStep;
};

const stepIcons = {
  intention: Lightbulb,
  planning: ListChecks,
  tool: Wrench,
  other: Circle,
};

const stepColors = {
  intention: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  planning: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  tool: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  other: "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

export function StepItem({ step }: StepItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = stepIcons[step.type];

  return (
    <Card className={`p-3 ${step.isError ? "border-destructive" : ""}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-start gap-3 text-left">
            <div
              className={`p-2 rounded-md ${
                stepColors[step.type]
              } border shrink-0`}
            >
              <Icon className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{step.name}</span>
                {step.isComplete && !step.isError && (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                )}
                {step.isError && (
                  <XCircle className="w-4 h-4 text-destructive" />
                )}
              </div>
              {!isOpen && (
                <p className="text-xs text-muted-foreground truncate">
                  {step.output}
                </p>
              )}
            </div>

            <div className="shrink-0">
              {isOpen ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-3">
          {step.showInput && step.input && (
            <StepContent
              content={step.input}
              label="Input"
              language={step.language}
            />
          )}

          <StepContent
            content={step.output}
            label="Output"
            language={step.language}
          />
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
