"use client"

import navItems from "@/Data/NavItem";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="glass-effect p-2 px-2 md:px-8 shadow-lg" aria-label="Main navigation">
      <div className="flex justify-between items-center">
        <Link 
          href="/"
          aria-label="NxtLAP home page"
          className="focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              width={50}
              height={50}
              alt="NxtLAP logo"
              className="rounded-lg border w-10"
            />
            <h1 className="text-3xl font-bold text-gradient">NxtLAP</h1>
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-10" role="list">
            {navItems.map((item, idx) => (
              <Link
                href={item.href}
                key={idx}
                prefetch={idx === 1 ? true : false}
                aria-current={item.href === pathname ? "page" : undefined}
                className={`
                relative overflow-hidden rounded-sm p-2
                focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4
                transition-colors duration-200
                ${
                  item.href === pathname
                    ? "text-primary underline underline-offset-6"
                    : "hover:text-primary"
                }
              `}
                role="listitem"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="https://apps.apple.com/in/app/nxtlap-race-scores-widgets/id6754256034"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-3 py-1.5 rounded-full text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Get App</span>
            <span className="sm:hidden">App</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
