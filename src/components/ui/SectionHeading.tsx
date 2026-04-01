interface SectionHeadingProps {
  badge: string
  title: string
  subtitle?: string
  center?: boolean
}

export default function SectionHeading({ badge, title, subtitle, center = true }: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? 'text-center' : ''}`}>
      <span className="text-accent text-sm font-medium uppercase tracking-[0.2em]">
        {badge}
      </span>
      <h2 className="text-3xl md:text-5xl font-bold mt-3 whitespace-pre-line">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-lg md:text-xl font-light mt-4 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
