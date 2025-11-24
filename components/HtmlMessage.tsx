import { ChartArea, PanelRightOpen } from "lucide-react";
import { CodeLoader } from "./CodeLoader";
import { Card } from "./ui/card";

export const HtmlMessage = ({
  html,
  isLoading,
  onHtmlClick,
}: {
  html: string;
  isLoading: boolean;
  onHtmlClick?: (html: string) => void;
}) => {
  if (isLoading) {
    return <CodeLoader />;
  }

  console.log(html);

  return (
    <Card
      className="p-3 cursor-pointer hover:bg-background transition-colors"
      onClick={() => onHtmlClick?.(html)}
    >
      <div className="flex items-start gap-3 text-left">
        <div
          className={`p-2 rounded-md bg-green-500/10 text-green-500 border-green-500/20 border shrink-0`}
        >
          <ChartArea className="w-8 h-8" />
        </div>
        <div className="flex-1 font-medium">Generated Dashboard</div>

        <div className="shrink-0">
          <PanelRightOpen className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </Card>
  );
};
