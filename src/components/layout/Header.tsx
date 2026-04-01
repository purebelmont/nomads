'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@/lib/constants'
import { MenuIcon } from '@/components/icons'
import MobileMenu from './MobileMenu'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 h-20 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-wider text-white">
            NOMADS
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.slice(0, -1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm tracking-wide transition-colors ${
                  pathname === item.href
                    ? 'text-white'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/auth"
              className="text-sm tracking-wide text-text-secondary hover:text-white transition-colors"
            >
              로그인
            </Link>
            <Link
              href="/contact"
              className="bg-accent hover:bg-accent-hover text-white text-sm font-medium px-5 py-2.5 rounded transition-colors"
            >
              견적 문의
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-white p-2"
            aria-label="메뉴 열기"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
