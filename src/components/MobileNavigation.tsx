"use client"

import React from 'react'
import navItems from '@/Data/NavItem'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function MobileNavigation() {
    const pathname = usePathname();
    const mobileNavItems = navItems.filter((item, index) => index<2);

  return (
    <nav className="bg-background font-semibold text-center border-t" aria-label="Mobile navigation">
        <div className="flex items-center justify-between" role="list">
          {mobileNavItems.map(({label, href, icon: Icon}, idx) => (
            <Link
              href={href}
              key={idx}
              prefetch={idx === 1 ? true : false}
              aria-current={href === pathname ? "page" : undefined}
              aria-label={label}
              className={`
                p-2 w-full py-4
                focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
                transition-colors duration-200
                ${
                  href === pathname
                    ? "text-primary bg-accent"
                    : "hover:text-primary"
                }
              `}
              role="listitem"
            >
              <div className='flex items-center gap-x-2' aria-hidden="true">
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