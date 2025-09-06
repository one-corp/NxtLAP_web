import React from "react";
import { Button } from "./ui/button";

interface SocialMediaBtnProps {
  url: string;
  icon: React.ReactNode;
}

function SocialMediaBtn({ url, icon }: SocialMediaBtnProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      asChild
      className="bg-accent/30 hover:text-primary"
    >
      <a href={`https://${url}`} target="_blank" rel="noopener noreferrer">
       {icon}
      </a>
    </Button>
  );
}

export default SocialMediaBtn;
