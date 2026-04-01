import { ServiceIcon } from '@/components/icons'
import type { ServiceItem } from '@/lib/types'

interface ServiceCardProps {
  service: ServiceItem
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group p-6 md:p-8 rounded-xl border border-border bg-dark-gray/50 hover:border-accent/50 transition-all duration-300">
      <ServiceIcon name={service.icon} className="w-10 h-10 text-accent mb-5" />
      <h3 className="text-xl font-bold mb-1">{service.title}</h3>
      <p className="text-text-muted text-xs uppercase tracking-wider mb-4">{service.subtitle}</p>
      <p className="text-text-secondary text-sm leading-relaxed">{service.description}</p>
    </div>
  )
}
