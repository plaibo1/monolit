import { LiquidGlassIframe } from "@/components/LiquidGlassIframe";
import { getHtmlReportUrl } from "@/lib/api";

type PageProps = {
  params: Promise<{ chatId: string; messageId: string }>;
};

export default async function ChatPage({ params }: PageProps) {
  const { chatId, messageId } = await params;

  const url = getHtmlReportUrl({ chatId, messageId });

  return (
    <div className="relative w-full h-screen px-16 py-8">
      <LiquidGlassIframe>
        <iframe src={url} style={{ width: "100%", height: "100%" }} />
      </LiquidGlassIframe>
    </div>
  );
}
