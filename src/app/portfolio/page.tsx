import type { Metadata } from 'next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import PortfolioFilter from '@/components/ui/PortfolioFilter'
import { PLACEHOLDER_PORTFOLIO } from '@/lib/constants'

export const metadata: Metadata = {
  title: '포트폴리오 | NOMADS COMPANY',
  description: '노마드컴퍼니가 제작한 프리미엄 영상 포트폴리오',
}

export default function PortfolioPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-gray to-black" />
        <div className="relative z-10 text-center px-6">
          <p className="text-accent text-sm font-medium uppercase tracking-[0.2em] mb-4">PORTFOLIO</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight">포트폴리오</h1>
          <p className="text-text-secondary text-lg mt-4">노마드컴퍼니가 만든 영상들</p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <AnimatedSection>
            <PortfolioFilter items={PLACEHOLDER_PORTFOLIO} />
          </AnimatedSection>
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
