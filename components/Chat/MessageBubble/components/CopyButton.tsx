import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

type CopyButtonProps = {
  copied: boolean;
  onCopy: () => void;
};

export function CopyButton({ copied, onCopy }: CopyButtonProps) {
  return (
    <Button variant="ghost" size="sm" onClick={onCopy} title="Copy message">
      {copied ? (
        <Check className="h-6 w-6 text-green-500" />
      ) : (
        <Copy className="h-6 w-6" />
      )}
    </Button>
  );
}
