import { Button } from "@/components/ui/button";
import { Copy, Download, Share2 } from "lucide-react";
import { SiWhatsapp, SiX } from "react-icons/si";
import { toast } from "sonner";
import type { Phone } from "../data/phones";

interface ShareButtonsProps {
  phones: Phone[];
  context: "compare" | "single";
}

export function ShareButtons({ phones, context }: ShareButtonsProps) {
  const phoneNames = phones.map((p) => p.name).join(" vs ");
  const url = window.location.href;

  const waText =
    context === "compare"
      ? `Check out this comparison on OmniSphere: ${phoneNames}! ${url}`
      : `Check out ${phoneNames} on OmniSphere! ${url}`;

  const tweetText =
    context === "compare"
      ? `${phoneNames} comparison on OmniSphere — which one would you pick? ${url}`
      : `${phoneNames} review on OmniSphere ${url}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied! 🔗");
    } catch {
      toast.error("Could not copy link");
    }
  };

  const handleDownload = () => {
    toast.info(
      "Screenshot ready! Use your device's screenshot tool or print to PDF 📸",
    );
    setTimeout(() => window.print(), 300);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodeURIComponent(waText)}`}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="share.button"
      >
        <Button
          size="sm"
          className="bg-[#25D366] hover:bg-[#20bd5a] text-white gap-1.5 text-xs"
        >
          <SiWhatsapp size={13} />
          WhatsApp
        </Button>
      </a>
      {/* Twitter/X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="share.button"
      >
        <Button
          size="sm"
          className="bg-foreground hover:bg-foreground/80 text-background gap-1.5 text-xs"
        >
          <SiX size={11} />
          Share
        </Button>
      </a>
      {/* Copy link */}
      <Button
        size="sm"
        variant="outline"
        className="gap-1.5 text-xs"
        onClick={handleCopy}
        data-ocid="share.button"
      >
        <Copy size={13} />
        Copy Link
      </Button>
      {/* Download */}
      <Button
        size="sm"
        variant="outline"
        className="gap-1.5 text-xs"
        onClick={handleDownload}
        data-ocid="share.button"
      >
        <Download size={13} />📸 Download
      </Button>
      <Share2 size={14} className="text-muted-foreground" />
    </div>
  );
}
