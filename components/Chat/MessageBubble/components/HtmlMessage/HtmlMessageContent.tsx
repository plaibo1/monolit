import { ArrowUpRight, Loader } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useChatStore } from "@/store/useChatStore";
import { Report } from "@/types/chat";
import { useReportGenerate } from "@/api/chat";
import { useParams } from "next/navigation";

export const HtmlMessageContent = ({
  messageBlockId,
  report,
}: {
  messageBlockId: string;
  report?: Report;
}) => {
  const { chatId } = useParams<{ chatId: string }>();

  const setChatHtmlId = useChatStore((state) => state.setChatHtmlId);
  const completedMessageIds = useChatStore(
    (state) => state.completedMessageIds
  );
  const { trigger, isLoading } = useReportGenerate(chatId, messageBlockId);

  const isCompleted = completedMessageIds.has(messageBlockId);

  if (!isCompleted) {
    return null;
  }

  const isReportCreated = report?.created;

  const handleAction = () => {
    if (isLoading) {
      return;
    }

    if (!isReportCreated) {
      trigger();
      return;
    }

    setChatHtmlId(messageBlockId);
  };

  return (
    <Card
      className="w-full h-auto min-h-[160px] p-[1px] border-0 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors cursor-pointer flex flex-col justify-center relative group overflow-hidden rounded-2xl shadow-2xl"
      onClick={handleAction}
    >
      {/* Dynamic Background Beam */}
      <div className="absolute inset-[-50%] animate-[spin_6s_linear_infinite] pointer-events-none z-0 will-change-transform opacity-10 dark:opacity-30 group-hover:opacity-20 dark:group-hover:opacity-50 transition-opacity">
        <div className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0_240deg,rgba(0,0,0,0.1)_360deg)] dark:bg-[conic-gradient(from_0deg,transparent_0_240deg,white_360deg)]" />
      </div>

      {/* Main Content Area */}
      <div className="relative w-full h-full bg-white dark:bg-zinc-950 rounded-[15px] p-6 overflow-hidden z-10 flex items-center gap-6">
        {/* State-specific Visual Element */}
        <div className="relative shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 flex items-center justify-center overflow-hidden">
          {isReportCreated ? (
            /* Aesthetic Animated Graph for "Ready" State */
            <div className="absolute inset-0 p-4 flex items-end justify-between gap-1 overflow-hidden">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-full bg-linear-to-t from-emerald-500/80 to-emerald-400 animate-pulse"
                  style={{
                    height: `${20 + Math.random() * 80}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: "2s",
                  }}
                />
              ))}
              <div className="absolute inset-0 bg-linear-to-t from-white dark:from-zinc-950 via-transparent to-transparent pointer-events-none" />
              {/* Smoothing line overlay */}
              <svg
                className="absolute inset-0 w-full h-full text-emerald-500 dark:text-emerald-400 opacity-60 dark:opacity-60 pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,80 Q25,20 50,60 T100,30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="animate-[shimmer_3s_infinite]"
                />
              </svg>
            </div>
          ) : (
            /* Option C: Technical Scanning Mesh */
            <div className="relative w-full h-full bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-center">
              {/* The Grid */}
              <div
                className="absolute inset-0 opacity-[0.15] dark:opacity-[0.2]"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                  backgroundSize: "12px 12px",
                }}
              />

              {/* Scanning Laser Line */}
              <div className="absolute inset-x-0 h-[2px] bg-linear-to-r from-transparent via-indigo-500 to-transparent dark:via-cyan-400 opacity-50 dark:opacity-80 animate-[scanning_3s_ease-in-out_infinite] z-10" />

              {/* Dynamic Processing "Bits" */}
              <div className="absolute inset-2 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-indigo-500 dark:bg-cyan-400 rounded-full animate-ping"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${2 + Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>

              {/* Focus Crosshair Corners */}
              <div className="absolute inset-4 border-t border-l border-zinc-300 dark:border-zinc-700 w-2 h-2 rounded-tl-sm" />
              <div className="absolute inset-4 left-auto border-t border-r border-zinc-300 dark:border-zinc-700 w-2 h-2 rounded-tr-sm" />
              <div className="absolute inset-4 top-auto border-b border-l border-zinc-300 dark:border-zinc-700 w-2 h-2 rounded-bl-sm" />
              <div className="absolute inset-4 top-auto left-auto border-b border-r border-zinc-300 dark:border-zinc-700 w-2 h-2 rounded-br-sm" />

              {/* Central Technical Hub */}
              <div className="relative z-20 group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-indigo-500/10 dark:bg-cyan-400/10 blur-xl animate-pulse scale-150" />
                <div className="relative bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-lg">
                  {isLoading ? (
                    <Loader className="w-6 h-6 text-zinc-600 dark:text-zinc-400 animate-spin" />
                  ) : (
                    <ArrowUpRight className="w-6 h-6 text-zinc-600 dark:text-zinc-400 animate-pulse" />
                  )}
                </div>
              </div>

              {/* Internal Keyframes Style Injector */}
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                @keyframes scanning {
                  0%, 100% { top: 0%; opacity: 0; }
                  10%, 90% { opacity: 0.5; }
                  50% { top: 100%; opacity: 0.8; }
                }
              `,
                }}
              />
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="flex-1 space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isReportCreated
                  ? "bg-emerald-500"
                  : "bg-zinc-600 dark:bg-zinc-500"
              }`}
            />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-zinc-400 dark:text-zinc-500 uppercase">
              {isReportCreated ? "STATUS: READY" : "STATUS: PENDING"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase leading-tight text-zinc-900 dark:text-white">
            {isReportCreated ? (
              <>
                VIEW <br /> DASHBOARD
              </>
            ) : (
              <>
                GENERATE <br /> REPORT
              </>
            )}
          </h2>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium max-w-[200px]">
            {isReportCreated
              ? "Comprehensive data analysis is now ready for exploration."
              : "Launch our AI engine to compile your custom metrics."}
          </p>
        </div>

        {/* Hover Action Indicator */}
        <div className="hidden sm:flex flex-col items-center justify-center py-2 px-4 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 duration-500">
          <span className="text-[10px] font-black uppercase text-zinc-500 dark:text-zinc-400 mb-1">
            Press
          </span>
          <div className="w-8 h-8 rounded-full bg-indigo-600 dark:bg-white text-white dark:text-black flex items-center justify-center shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Interactive Overlay Glow */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-indigo-500/5 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
    </Card>
  );
};
