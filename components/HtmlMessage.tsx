import { ChartArea, PanelLeftOpen } from "lucide-react";
import { CodeLoader } from "./CodeLoader";
import { Card } from "./ui/card";

export const HtmlMessage = ({
  html,
  isLoading,
}: {
  html: string;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <CodeLoader />;
  }

  return (
    <Card className="p-3 cursor-pointer hover:bg-background">
      <div className="flex items-start gap-3 text-left">
        <div
          className={`p-2 rounded-md bg-green-500/10 text-green-500 border-green-500/20 border shrink-0`}
        >
          <ChartArea className="w-8 h-8" />
        </div>
        <div className="flex-1 font-medium">Generated Dashboard</div>

        <div className="shrink-0">
          <PanelLeftOpen className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </Card>
  );
};
