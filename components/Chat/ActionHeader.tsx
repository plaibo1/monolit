import { GitBranch } from "lucide-react";

export const ActionHeader = () => {
  return (
    <div className="w-full flex items-center gap-4 mb-4 mt-6">
      <div className="flex items-center gap-2 text-zinc-500">
        <GitBranch className="w-[14px] h-[14px]" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
          EXPLORE
        </span>
      </div>
      <div className="h-px flex-1 bg-zinc-800" />
      <span className="text-[9px] text-zinc-700 font-mono">CLICK OR HOLD</span>
    </div>
  );
};
