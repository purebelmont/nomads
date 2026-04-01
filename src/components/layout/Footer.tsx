import Link from 'next/link'
import { NAV_ITEMS } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company */}
          <div>
            <h3 className="text-xl font-bold tracking-wider mb-4">NOMADS</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              건설, 제조, 조선 — 대한민국 산업의 스케일을 담는 프리미엄 영상 프로덕션
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">Navigation</h4>
            <nav className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-text-secondary hover:text-white text-sm transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-text-secondary">
              <p>평일 09:00 ~ 18:00</p>
              <p>info@nomadscompany.co.kr</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-text-muted text-xs">
          © 2026 NOMADS COMPANY. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
