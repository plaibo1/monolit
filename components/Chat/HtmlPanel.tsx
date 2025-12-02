import {
  CheckCircle,
  FullscreenIcon,
  Share2,
  Upload,
  XIcon,
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
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

interface HtmlPanelProps {
  messageId: string;
  chatId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HtmlPanel({
  messageId,
  chatId,
  open,
  onOpenChange,
}: HtmlPanelProps) {
  const [title, setTitle] = useState("Dashboard");

  const [publishState, setPublishState] = useState({
    shared: false,
    can_read: false,
    can_modify: false,
  });
  const [loading, setLoading] = useState(false);

  const url = getHtmlReportUrl({ chatId, messageId });

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (open) {
      // fetch publish status
      setLoading(true);
      getDashboardPublishStatus({ chatId, messageId })
        .then((data) => {
          if (data?.status === 200) {
            setPublishState(data.data);
            return;
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [chatId, messageId, open]);

  const handlePublish = () => {
    setLoading(true);
    publishDashboard({
      chatId,
      messageId,
      shareStatus: !publishState.shared,
    })
      .then((response) => {
        if (response?.status === 200) {
          setPublishState((prev) => ({
            ...prev,
            shared: response.data.shared,
          }));
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
          icon: <CheckCircle className="ml-2 h-4 w-4 text-red-500" />,
          position: "top-center",
        });
      }
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className="w-full sm:max-w-full md:w-[70%] md:max-w-[70%] p-0 gap-0"
        side="right"
        customClose
      >
        <SheetHeader className="px-4 py-2  flex flex-row items-center justify-between space-y-0">
          <SheetTitle className="truncate w-[50%] text-left ml-2">
            {title}
          </SheetTitle>

          <div className="flex items-center gap-2">
            {publishState.shared && (
              <Button variant="ghost" disabled={loading} onClick={handleShare}>
                Link <Share2 className="w-4 h-4 ml-2" />
              </Button>
            )}

            {publishState.can_modify && (
              <Button
                variant="ghost"
                disabled={loading}
                onClick={handlePublish}
              >
                {publishState.shared ? "Unpublish" : "Publish"}{" "}
                <Upload className="w-4 h-4 ml-2" />
              </Button>
            )}

            <Link href={`/${chatId}/${messageId}`}>
              <Button variant="ghost" disabled={loading} size="icon">
                <FullscreenIcon className="w-4 h-4" />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="ml-4"
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 h-full">
          <div className="relative w-full h-[calc(100vh-60px)] md:px-6">
            <LiquidGlassIframe>
              <iframe
                ref={iframeRef}
                src={url}
                style={{ width: "100%", height: "100%", border: "none" }}
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
      </SheetContent>
    </Sheet>
  );
}
