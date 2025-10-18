"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Share2, X, Copy } from "lucide-react";
import { Input } from "./ui/input";
import { usePathname } from "next/navigation";

interface SharePopupProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

function SharePopup({ onClose }: SharePopupProps) {
  const [copied, setCopied] = useState(false);
  const SITE_URL = "https://www.nxtlap.com";
  const pathname = usePathname();
  const shareLink = SITE_URL+pathname;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareLink;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Fallback failed: ", err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-secondary/70 backdrop-blur-xs">
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl bg-gradient-to-bl from-background to-accent  shadow-2xl transition-all border"
        style={{ width: "450px", maxWidth: "90vw" }} // Set a max-width for better control
      >
        {/* Header Section (The Black Bar) */}
        <div className="flex items-center justify-between px-6 py-3 bg-secondary text-secondary-foreground border-b">
          <h2 className="text-lg font-semibold">Share this post</h2>
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onClose(false)}
            className="hover:bg-transparent text-foreground/80 hover:text-foreground p-0 h-auto"
            aria-label="Close share popup"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content Section - Centered Link Box */}
        {/* Added padding-y for spacing from header/footer and flex to center vertically */}
        <div className="p-8 flex flex-col justify-center items-center min-h-[150px]">
          {/* Copy Link Container - Flex layout for input and button */}
          <div className="flex w-full space-x-2">
            {/* Input Field for the Link */}
            <Input
              type="text"
              value={shareLink}
              readOnly
              className="flex-grow min-w-0"
              aria-label="Share link"
            />

            {/* Copy Button */}
            <Button
              onClick={handleCopy}
              className="flex-shrink-0"
              disabled={copied} // Optional: Disable while showing 'Copied'
            >
              <Copy className="mr-2 h-4 w-4" />
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShareButton() {
  const [showSharePopup, setShowSharePopup] = useState<boolean>(false);
  
  return (
    <>
    <Button
      variant="outline"
      className="ml-auto inline-flex items-center gap-2 px-4 py-2"
      onClick={() => setShowSharePopup(true)}
    >
      <Share2 className="w-4 h-4" />
      <span className="hidden sm:inline">Share</span>
    </Button>

    {showSharePopup && <SharePopup onClose={setShowSharePopup} />}
    </>
  );
}

export default ShareButton;
