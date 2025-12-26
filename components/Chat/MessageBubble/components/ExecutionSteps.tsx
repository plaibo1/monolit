import { ExecutionSummary } from "./ExecutionSummary";
import { StepNode } from "./StepNode";
import type { ExecutionStep } from "@/types/chat";

import { useChatStore } from "@/store/useChatStore";

type ExecutionStepsProps = {
  steps: ExecutionStep[];
  messageId?: string;
};

export function ExecutionSteps({ steps, messageId }: ExecutionStepsProps) {
  const completedMessageIds = useChatStore(
    (state) => state.completedMessageIds
  );

  if (steps.length === 0) return null;

  const isDone =
    completedMessageIds.has(messageId ?? "") ||
    steps.some((step) => step.type === "html");

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
