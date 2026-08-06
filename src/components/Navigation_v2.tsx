"use client"

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { Button } from "./ui/button";
import { AppleIcon } from "./AppleIcon";

const localNavItems = [
  { label: "Features", href: "#features" },
  { label: "Why Us", href: "#why-us" },
  { label: "Reviews", href: "#reviews" },
  { label: "Blogs", href: "/blogs" },
];

function Navigation_v2() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
    <div className="fixed top-0 left-0 right-0 w-full z-50 flex flex-col">
      <div className="w-full bg-background/90 backdrop-blur border-b">
        <nav className="container mx-auto px-4 md:px-6" aria-label="Main navigation">
          <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            aria-label="NxtLAP home page"
            className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 rounded-lg"
          >
            <Image
              src="/new-logo.jpg"
              width={40}
              height={40}
              alt="NxtLAP logo"
              className="rounded-lg border w-8 h-8 md:w-10 md:h-10"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-gradient">NxtLAP</h1>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8" role="list">
            {localNavItems.map((item, idx) => (
              <Link
                href={item.href}
                key={idx}
                className={`
                relative text-sm font-medium transition-colors hover:text-primary
                text-muted-foreground
              `}
                role="listitem"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="https://apps.apple.com/in/app/nxtlap-race-scores-widgets/id6754256034"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-full text-sm font-bold transition-all shadow-sm hover:scale-105"
            >
              <AppleIcon size={16} />
              Get on App Store
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle menu">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          </div>
        </nav>
      </div>
    </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[64px] z-40 md:hidden bg-background/95 backdrop-blur-sm animate-in slide-in-from-top-2">
          <div className="space-y-1 px-4 py-4">
            {localNavItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  block rounded-md px-3 py-2 text-base font-medium transition-colors
                  text-muted-foreground hover:bg-muted hover:text-foreground
                `}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t">
               <Link
                href="https://apps.apple.com/in/app/nxtlap-race-scores-widgets/id6754256034"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-lg text-sm font-medium hover:bg-primary/90"
              >
                <AppleIcon size={16} />
                <span>Download on App Store</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navigation_v2;
