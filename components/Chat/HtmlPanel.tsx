import { X } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

interface HtmlPanelProps {
  html: string;
  onClose: () => void;
}

export function HtmlPanel({ html, onClose }: HtmlPanelProps) {
  return (
    <div className="w-[900px] border-l bg-background flex flex-col h-full animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">HTML Preview</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1 p-4 h-[500px]">
        <div
          // className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </ScrollArea>
    </div>
  );
}
