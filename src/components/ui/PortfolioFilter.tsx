'use client'

import { useState } from 'react'
import { PORTFOLIO_CATEGORIES } from '@/lib/constants'
import type { PortfolioCategory, PortfolioItem } from '@/lib/types'
import PortfolioCard from './PortfolioCard'

interface PortfolioFilterProps {
  items: PortfolioItem[]
}

export default function PortfolioFilter({ items }: PortfolioFilterProps) {
  const [active, setActive] = useState<PortfolioCategory>('all')

  const filtered = active === 'all' ? items : items.filter((item) => item.category === active)

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-10">
        {PORTFOLIO_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
              active === cat.id
                ? 'bg-accent text-white'
                : 'border border-border text-text-secondary hover:text-white hover:border-white/50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
