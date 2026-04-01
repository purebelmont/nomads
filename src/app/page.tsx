import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'
import ServiceCard from '@/components/ui/ServiceCard'
import StatCounter from '@/components/ui/StatCounter'
import PortfolioCard from '@/components/ui/PortfolioCard'
import { ChevronDownIcon } from '@/components/icons'
import { SERVICES, COMPANY_STATS, PLACEHOLDER_PORTFOLIO } from '@/lib/constants'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-dark-gray to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(227,5,51,0.08),transparent_70%)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-text-muted mb-4">
            NOMADS COMPANY
          </p>
          <p className="text-accent text-sm md:text-base font-medium tracking-wider mb-6">
            Premium Visual Production
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1]">
            우리가 만드는 영상은
            <br />
            단순한 영상이 아닙니다
          </h1>
          <p className="text-text-secondary text-base md:text-xl font-light mt-6 max-w-2xl mx-auto">
            건설, 제조, 조선 — 대한민국 산업의 스케일을 담는 프리미엄 영상 프로덕션
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button href="/contact" size="lg">견적 문의하기</Button>
            <Button href="/portfolio" variant="outline" size="lg">포트폴리오 보기</Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-down">
          <ChevronDownIcon className="w-6 h-6 text-text-muted" />
        </div>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <AnimatedSection>
            <SectionHeading badge="SERVICES" title="무엇을 하는가" />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => (
              <AnimatedSection key={service.id} delay={i * 100}>
                <ServiceCard service={service} />
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="text-center mt-10">
            <Button href="/services" variant="ghost">서비스 자세히 보기 →</Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-dark-gray">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <AnimatedSection>
            <p className="text-center text-2xl md:text-3xl font-bold mb-12">
              더 나은 영상, 더 큰 신뢰
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {COMPANY_STATS.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <AnimatedSection>
            <SectionHeading badge="PORTFOLIO" title="최근 프로젝트" />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PLACEHOLDER_PORTFOLIO.slice(0, 3).map((item, i) => (
              <AnimatedSection key={item.id} delay={i * 100}>
                <PortfolioCard item={item} />
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="text-center mt-10">
            <Button href="/portfolio" variant="ghost">전체 포트폴리오 보기 →</Button>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-accent-dark to-accent">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold">
            프로젝트를 시작할 준비가 되셨나요?
          </h2>
          <p className="text-white/80 text-lg mt-4">
            견적 문의부터 프로젝트 완료까지, 노마드컴퍼니가 함께합니다
          </p>
          <div className="mt-8">
            <Button href="/contact" variant="white" size="lg">견적 문의하기</Button>
          </div>
        </div>
      </section>
    </>
  )
}
