"use client"

import React from 'react'
import navItems from '@/Data/NavItem'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function MobileNavigation() {
    const pathname = usePathname();
    const mobileNavItems = navItems.filter((item, index) => index<2);

  return (
    <nav className="bg-background font-semibold text-center border-t">
        <div className="flex items-center justify-between">
          {mobileNavItems.map(({label, href, icon: Icon}, idx) => (
            <Link
              href={href}
              key={idx}
              prefetch={idx === 1 ? true : false}
                className={`
                p-2 w-full py-4
                  ${
                    href === pathname
                      ? "text-primary bg-accent"
                      : "hover:text-primary"
                  }
                `}
            >
              <div className='flex items-center gap-x-2'>
                {Icon && <Icon />}
                {label}
              </div>
            </Link>
          ))}
        </div>
    </nav>
  )
}

export default MobileNavigation