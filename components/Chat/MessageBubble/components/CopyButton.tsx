import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

type CopyButtonProps = {
  copied: boolean;
  onCopy: () => void;
};

export function CopyButton({ copied, onCopy }: CopyButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
      onClick={onCopy}
      title="Copy message"
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
}
