import Image from 'next/image'
import { PlayIcon } from '@/components/icons'
import type { PortfolioItem } from '@/lib/types'
import { PORTFOLIO_CATEGORIES } from '@/lib/constants'

interface PortfolioCardProps {
  item: PortfolioItem
}

export default function PortfolioCard({ item }: PortfolioCardProps) {
  const categoryLabel = PORTFOLIO_CATEGORIES.find((c) => c.id === item.category)?.label || item.category

  return (
    <div className="group cursor-pointer">
      {/* Thumbnail */}
      <div className="aspect-video bg-dark-gray rounded-lg border border-border overflow-hidden relative">
        {item.thumbnail_url ? (
          <>
            <Image
              src={item.thumbnail_url}
              alt={item.title}
              fill
              loading="lazy"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
              <div className="w-14 h-14 rounded-full border-2 border-white/40 flex items-center justify-center group-hover:border-accent group-hover:scale-110 transition-all">
                <PlayIcon className="w-5 h-5 text-white/60 group-hover:text-accent" />
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-mid-gray">
            <div className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center">
              <PlayIcon className="w-5 h-5 text-white/40" />
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs px-2 py-1 rounded bg-accent/10 text-accent">{categoryLabel}</span>
          <span className="text-xs text-text-muted">{item.year}</span>
        </div>
        <h3 className="font-semibold group-hover:text-accent transition-colors">{item.title}</h3>
        <p className="text-text-secondary text-sm mt-1">{item.client}</p>
      </div>
    </div>
  )
}
