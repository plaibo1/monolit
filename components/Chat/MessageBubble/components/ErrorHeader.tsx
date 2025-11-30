import { AlertCircle } from "lucide-react";

type ErrorHeaderProps = {
  show: boolean;
};

export function ErrorHeader({ show }: ErrorHeaderProps) {
  if (!show) return null;

  return (
    <div className="flex items-center gap-2 mb-2 text-destructive">
      <AlertCircle className="w-4 h-4" />
      <span className="text-xs font-medium">Error</span>
    </div>
  );
}
