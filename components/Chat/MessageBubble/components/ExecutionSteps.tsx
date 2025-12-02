import { ExecutionSummary } from "./ExecutionSummary";
import { StepNode } from "./StepNode";
import type { ExecutionStep } from "@/types/chat";

type ExecutionStepsProps = {
  steps: ExecutionStep[];
};

export function ExecutionSteps({ steps }: ExecutionStepsProps) {
  if (steps.length === 0) return null;

  const isDone = steps.some((step) => step.type === "html");

  if (isDone) {
    return <ExecutionSummary steps={steps} />;
  }

  return (
    <div className="w-full space-y-2 mb-6">
      <div className="text-xs font-medium text-muted-foreground px-2">
        Execution Steps
      </div>
      {steps.map((step) => (
        <StepNode key={step.id} step={step} />
      ))}
    </div>
  );
}
