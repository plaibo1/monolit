import type { ExecutionStep } from "@/types/chat";
import { StepItem } from "./StepItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";

type StepsPanelProps = {
  steps: ExecutionStep[];
  isProcessing: boolean;
};

export function StepsPanel({ steps, isProcessing }: StepsPanelProps) {
  if (steps.length === 0 && !isProcessing) {
    return null;
  }

  return (
    <Card className="w-full lg:w-80 xl:w-96 border-l h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          <h3 className="font-semibold">Execution Steps</h3>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Follow the AI&apos;s reasoning process
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {steps.map((step) => (
            <StepItem key={step.id} step={step} />
          ))}
          {isProcessing && steps.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}
