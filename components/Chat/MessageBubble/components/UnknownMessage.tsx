import { HelpCircle } from "lucide-react";

type UnknownMessageProps = {
  content: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawData?: any;
};

export function UnknownMessage({ content, rawData }: UnknownMessageProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3 text-amber-600 dark:text-amber-500">
        <HelpCircle className="w-4 h-4" />
        <span className="text-xs font-medium">Unknown Message</span>
      </div>

      <p className="text-sm text-amber-800 dark:text-amber-300">{content}</p>

      {rawData && (
        <div className="mt-2">
          <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">
            Raw message data:
          </p>
          <pre className="bg-amber-100 dark:bg-amber-950/40 rounded p-2 text-xs overflow-x-auto border border-amber-200 dark:border-amber-900">
            <code className="text-amber-900 dark:text-amber-300">
              {JSON.stringify(rawData, null, 2)}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}
