import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useChatStore } from "@/store/useChatStore";
import { Report } from "@/types/chat";

export const HtmlMessageContent = ({
  messageBlockId,
  report,
}: {
  messageBlockId: string;
  report: Report;
}) => {
  const setChatHtmlId = useChatStore((state) => state.setChatHtmlId);
  const completedMessageIds = useChatStore(
    (state) => state.completedMessageIds
  );
  const isCompleted = completedMessageIds.has(messageBlockId);

  if (!isCompleted) {
    return null;
  }

  const isReportCreated = report.created;

  return (
    <Card
      className="w-full h-auto min-h-[100px] p-[1px] border-0 bg-zinc-800 hover:bg-zinc-700 transition-colors cursor-pointer flex flex-col justify-center relative group overflow-hidden rounded-xl"
      onClick={() => {
        if (!isReportCreated) {
          return;
        }
        setChatHtmlId(messageBlockId);
      }}
    >
      {/* Border Beam Animation - Behind the content */}
      <div className="absolute inset-[-50%] animate-[spin_4s_linear_infinite] pointer-events-none z-0 will-change-transform">
        <div className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0_300deg,white_360deg)] opacity-40" />
      </div>

      {/* Inner Surface - Masks the center of the beam */}
      <div className="relative w-full h-full bg-background rounded-[11px] p-6 overflow-hidden z-10">
        {/* Obvious Collectible Shimmer Effect */}
        <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-50">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]" />
        </div>

        {/* Inner Glow for Depth */}
        <div className="absolute inset-0 rounded-[11px] border border-white/5 pointer-events-none z-0" />

        {/* Action Trigger */}
        {isReportCreated && (
          <div className="absolute top-4 right-4 text-zinc-600 group-hover:text-white transition-colors z-20">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        )}

        {/* Header (Title) */}
        <h2 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase mb-2 relative z-10">
          {isReportCreated ? "DASHBOARD" : "GENERATE"}
          <br />
          REPORT
        </h2>

        {/* Subheader (Metadata) */}
        <div className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-wider relative z-10">
          {isReportCreated
            ? "ANALYSIS WAS COMPLETED"
            : "REPORT IS BEING GENERATED"}
        </div>
      </div>
    </Card>
  );
};
