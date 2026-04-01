import type { Metadata } from 'next'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import { ServiceIcon } from '@/components/icons'
import { SERVICES, PROCESS_STEPS, IMAGES } from '@/lib/constants'

export const metadata: Metadata = {
  title: '서비스 | NOMADS COMPANY',
  description: '드론 촬영, 기업 홍보영상, 제품 촬영, 광고 영상 — 기획부터 납품까지 올인원 프로덕션',
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-gray to-black" />
        <div className="relative z-10 text-center px-6">
          <p className="text-accent text-sm font-medium uppercase tracking-[0.2em] mb-4">SERVICES</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight">서비스 안내</h1>
          <p className="text-text-secondary text-lg mt-4">기획부터 납품까지, 올인원 영상 프로덕션</p>
        </div>
      </section>

      {/* Service Details */}
      {SERVICES.map((service, i) => (
        <section key={service.id} className={`py-24 md:py-32 ${i % 2 === 1 ? 'bg-dark-gray' : ''}`}>
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
              i % 2 === 1 ? 'lg:direction-rtl' : ''
            }`}>
              {/* Image side */}
              <AnimatedSection className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="aspect-video relative rounded-lg overflow-hidden border border-border">
                  <Image
                    src={IMAGES.services[service.id as keyof typeof IMAGES.services] || IMAGES.hero}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </AnimatedSection>

              {/* Text side */}
              <AnimatedSection delay={200} className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <div>
                  <span className="text-7xl md:text-8xl font-black text-white/5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-3 mt-2 mb-2">
                    <ServiceIcon name={service.icon} className="w-8 h-8 text-accent" />
                    <h2 className="text-3xl md:text-4xl font-bold">{service.title}</h2>
                  </div>
                  <p className="text-text-muted text-sm uppercase tracking-wider mb-6">{service.subtitle}</p>
                  <p className="text-text-secondary leading-relaxed mb-8">{service.description}</p>

                  <ul className="space-y-3 mb-8">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-3 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  <Button href={`/contact?service=${service.id}`}>견적 문의하기</Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      {/* Process */}
      <section className="py-24 md:py-32 bg-dark-gray">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <AnimatedSection>
            <SectionHeading badge="PROCESS" title="작업 프로세스" />
          </AnimatedSection>

          {/* Desktop timeline */}
          <div className="hidden lg:grid grid-cols-5 gap-4 relative">
            {/* Line */}
            <div className="absolute top-8 left-[10%] right-[10%] h-px bg-border" />

            {PROCESS_STEPS.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 100} className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-mid-gray border-2 border-accent flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="text-accent font-bold text-sm">{step.number}</span>
                </div>
                <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                <p className="text-text-muted text-xs uppercase tracking-wider mb-3">{step.subtitle}</p>
                <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
              </AnimatedSection>
            ))}
          </div>

          {/* Mobile steps */}
          <div className="lg:hidden space-y-6">
            {PROCESS_STEPS.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 80}>
                <div className="flex gap-4 p-5 rounded-xl border border-border bg-mid-gray/50">
                  <div className="w-12 h-12 rounded-full bg-dark border-2 border-accent flex items-center justify-center shrink-0">
                    <span className="text-accent font-bold text-sm">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="font-bold">{step.title}</h3>
                    <p className="text-text-muted text-xs uppercase tracking-wider mb-1">{step.subtitle}</p>
                    <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-accent-dark to-accent">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold">프로젝트를 시작할 준비가 되셨나요?</h2>
          <p className="text-white/80 text-lg mt-4">견적 문의부터 프로젝트 완료까지, 노마드컴퍼니가 함께합니다</p>
          <div className="mt-8">
            <Button href="/contact" variant="white" size="lg">견적 문의하기</Button>
          </div>
        </div>
      </section>
    </>
  )
}
