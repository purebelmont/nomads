import { PlayIcon } from '@/components/icons'

interface VideoPlaceholderProps {
  label?: string
  aspectRatio?: string
  className?: string
}

export default function VideoPlaceholder({
  label,
  aspectRatio = 'aspect-video',
  className = '',
}: VideoPlaceholderProps) {
  return (
    <div className={`${aspectRatio} bg-dark-gray rounded-lg border border-border flex flex-col items-center justify-center gap-3 ${className}`}>
      <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center">
        <PlayIcon className="w-6 h-6 text-white/40" />
      </div>
      {label && <p className="text-text-muted text-sm">{label}</p>}
    </div>
  )
}
