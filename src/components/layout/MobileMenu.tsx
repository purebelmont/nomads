'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@/lib/constants'
import { CloseIcon } from '@/components/icons'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  return (
    <div
      className={`fixed inset-0 z-[60] transition-all duration-300 ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Panel */}
      <div
        className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-dark border-l border-border transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <span className="text-lg font-bold tracking-wider">NOMADS</span>
          <button onClick={onClose} className="text-text-secondary hover:text-white p-2" aria-label="메뉴 닫기">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col p-6 gap-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`text-lg py-3 px-4 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'text-white bg-light-gray'
                  : 'text-text-secondary hover:text-white hover:bg-mid-gray'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
