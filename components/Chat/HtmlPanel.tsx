import {
  CheckCircle,
  FullscreenIcon,
  Share2,
  Upload,
  X,
  XCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  getDashboardPublishStatus,
  getHtmlReportUrl,
  publishDashboard,
} from "@/lib/api";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { LiquidGlassIframe } from "../LiquidGlassIframe";

interface HtmlPanelProps {
  messageId: string;
  chatId: string;
  onClose: () => void;
}

export function HtmlPanel({ messageId, chatId, onClose }: HtmlPanelProps) {
  const url = getHtmlReportUrl({ chatId, messageId });
  const [publishStatus, setPublishStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("Dashboard");

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setLoading(true);
    getDashboardPublishStatus({ chatId, messageId })
      .then((data) => {
        if (data?.status === 200) {
          setPublishStatus(data.data.shared);
          return;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handlePublish = () => {
    setLoading(true);
    publishDashboard({
      chatId,
      messageId,
      shareStatus: !publishStatus,
    })
      .then((response) => {
        if (response?.status === 200) {
          setPublishStatus(response.data.shared);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleShare = async () => {
    // copy current url to clipboard
    if (navigator.clipboard) {
      try {
        const origin = window.location.origin;
        const result = new URL(`${origin}/${chatId}/${messageId}`).toString();
        await navigator.clipboard.writeText(result);

        toast("Copied", {
          description: "URL copied to clipboard",
          icon: <CheckCircle className="ml-2 h-4 w-4 text-green-500" />,
          position: "top-center",
        });
      } catch (error) {
        console.error("Failed to copy URL to clipboard", error);
        toast("Error", {
          description: "Failed to copy URL to clipboard",
          icon: <XCircle className="ml-2 h-4 w-4 text-red-500" />,
          position: "top-center",
        });
      }
    }
  };

  return (
    <div className="w-full md:w-1/2 border-l bg-background flex flex-col h-full animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between px-4 py-2">
        <h3 className="font-semibold">{title}</h3>

        <div className="flex items-center gap-2">
          {publishStatus && (
            <Button variant="ghost" disabled={loading} onClick={handleShare}>
              Link <Share2 />
            </Button>
          )}

          <Button variant="ghost" disabled={loading} onClick={handlePublish}>
            {publishStatus ? "Unpublish" : "Publish"} <Upload />
          </Button>

          <Link href={`/${chatId}/${messageId}`}>
            <Button variant="ghost" disabled={loading} size="icon">
              <FullscreenIcon />
            </Button>
          </Link>

          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4 h-[900px]">
        <div className="relative rounded-lg overflow-hidden h-[700px]">
          <LiquidGlassIframe>
            <iframe
              ref={iframeRef}
              src={url}
              style={{ width: "100%", height: "100%" }}
              onLoad={() => {
                const iframe = iframeRef.current;
                if (iframe) {
                  const title = iframe.contentDocument?.title;
                  if (title) {
                    setTitle(title);
                  }
                }
              }}
            />
          </LiquidGlassIframe>
        </div>
      </ScrollArea>
    </div>
  );
}
