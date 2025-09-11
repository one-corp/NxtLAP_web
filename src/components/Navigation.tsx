"use client"

import navItems from "@/Data/NavItem";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="glass-effect p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              width={50}
              height={50}
              alt="Motorsports AI Logo"
              className="rounded-lg border"
            />
            <h1 className="text-3xl font-bold text-gradient">Motorsports AI</h1>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item, idx) => (
            <Link
              href={item.href}
              key={idx}
              prefetch={idx === 1 ? true : false}
                className={`
                  relative overflow-hidden rounded-sm p-2
                  ${
                    item.href === pathname
                      ? "text-primary underline underline-offset-6"
                      : "hover:text-primary"
                  }
                `}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
