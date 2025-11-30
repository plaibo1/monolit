import { StepItem } from "../../StepItem";
import type { ExecutionStep } from "@/types/chat";

type ExecutionStepsProps = {
  steps: ExecutionStep[];
};

export function ExecutionSteps({ steps }: ExecutionStepsProps) {
  if (steps.length === 0) return null;

  return (
    <div className="w-full space-y-2 mt-2">
      <div className="text-xs font-medium text-muted-foreground px-2">
        Execution Steps
      </div>
      {steps.map((step) => (
        <StepItem key={step.id} step={step} />
      ))}
    </div>
  );
}
