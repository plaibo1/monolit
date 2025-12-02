import { ExecutionStep } from "@/types/chat";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CheckCircle2, ListChecks, Clock, ChevronRight } from "lucide-react";
import { StepNode } from "./StepNode";

export const ExecutionSummary = ({ steps }: { steps: ExecutionStep[] }) => {
  const [duration, setDuration] = useState<string>("");

  useEffect(() => {
    if (steps.length > 0) {
      const start = new Date(steps[0].timestamp).getTime();
      const end = new Date(steps[steps.length - 1].timestamp).getTime();
      const diff = end - start;
      const seconds = Math.floor(diff / 1000);
      setDuration(seconds > 0 ? `${seconds}s` : "< 1s");
    }
  }, [steps]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="group relative flex w-full items-center gap-3 cursor-pointer overflow-hidden rounded-xl border bg-card p-4 text-left shadow-sm transition-all hover:shadow-md hover:border-primary/50 mb-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
            <CheckCircle2 className="h-5 w-5" />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm">Generation Complete</h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
              <span className="flex items-center gap-1">
                <ListChecks className="h-3 w-3" />
                {steps.length} steps
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {duration}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
            View Process
            <ChevronRight className="h-3 w-3" />
          </div>
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto px-2">
        <SheetHeader className="mb-6">
          <SheetTitle>Execution Process</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 pb-8">
          {steps.map((step) => (
            <StepNode key={step.id} step={step} isDone={true} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
