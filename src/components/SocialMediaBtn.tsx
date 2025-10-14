import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils"; // <- assuming you have shadcn's cn utility

interface SocialMediaBtnProps {
  url: string;
  icon: React.ReactNode;
  className?: string;
}

function SocialMediaBtn({ url, icon, className }: SocialMediaBtnProps) {
  // Extract platform name from URL for aria-label
  const platformName = url.split('/')[0].split('.')[0] || 'social media';
  
  return (
    <Button
      variant="outline"
      size="icon"
      asChild
      className={cn("bg-accent/30 hover:text-primary", className)}
    >
      <a 
        href={`https://${url}`} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label={`Follow on ${platformName}`}
      >
        <span aria-hidden="true">{icon}</span>
      </a>
    </Button>
  );
}

export default SocialMediaBtn;