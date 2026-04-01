import type { Metadata } from 'next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import VideoPlaceholder from '@/components/ui/VideoPlaceholder'
import StatCounter from '@/components/ui/StatCounter'
import { ServiceIcon } from '@/components/icons'
import { COMPANY_STATS } from '@/lib/constants'

export const metadata: Metadata = {
  title: '회사소개 | NOMADS COMPANY',
  description: '건설, 제조, 조선 산업의 스케일을 담는 영상 제작 전문 기업',
}

const EQUIPMENT = [
  { icon: 'drone', title: '드론 플릿', description: 'DJI Inspire, Matrice 시리즈 등 산업용 고성능 드론 장비' },
  { icon: 'camera', title: '시네마 카메라', description: 'RED, ARRI, Sony Cinema Line 등 영화급 촬영 장비' },
  { icon: 'film', title: '안정화 장비', description: 'DJI Ronin, 차량 마운트 등 동적 촬영을 위한 짐벌/스태디캠' },
  { icon: 'play', title: '후반 작업', description: 'DaVinci Resolve, After Effects, 4K+ 편집 환경' },
]

const VALUES = [
  { title: '전문성', subtitle: 'Expertise', description: '산업 현장에 대한 깊은 이해와 영상 제작 노하우' },
  { title: '품질', subtitle: 'Quality', description: '타협 없는 최고 품질의 영상, 모든 프로젝트에' },
  { title: '신뢰', subtitle: 'Trust', description: '대기업이 선택하는 이유, 약속한 결과를 반드시 전달' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-gray to-black" />
        <div className="relative z-10 text-center px-6">
          <p className="text-accent text-sm font-medium uppercase tracking-[0.2em] mb-4">ABOUT US</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
            노마드컴퍼니를
            <br />
            소개합니다
          </h1>
          <p className="text-text-secondary text-lg mt-4">대한민국 산업의 현장을 영상으로 기록합니다</p>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection>
              <VideoPlaceholder label="촬영 현장" />
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  대한민국 핵심 산업의
                  <br />
                  <span className="text-accent">스케일을 담다</span>
                </h2>
                <div className="space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    노마드컴퍼니는 건설, 제조, 조선 등 대한민국 핵심 산업 분야의 기업을 위한
                    프리미엄 영상을 제작합니다.
                  </p>
                  <p>
                    최첨단 드론 장비와 시네마급 촬영 장비를 활용하여, 기업의 스케일과
                    기술력을 가장 임팩트 있게 전달합니다.
                  </p>
                </div>
                <ul className="mt-8 space-y-3">
                  {[
                    '대형 산업 현장 촬영 전문',
                    '드론 + 지상 촬영 동시 운용',
                    '기획부터 납품까지 원스톱 프로덕션',
                    '8년간 150+ 프로젝트 수행 경험',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="py-24 md:py-32 bg-dark-gray">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <AnimatedSection>
            <SectionHeading badge="EQUIPMENT" title="프리미엄 장비와 기술력" />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EQUIPMENT.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 100}>
                <div className="p-6 rounded-xl border border-border bg-mid-gray/50">
                  <ServiceIcon name={item.icon} className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <AnimatedSection>
            <SectionHeading badge="VALUES" title="우리의 가치" />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 100}>
                <div className="text-center p-8">
                  <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                  <p className="text-text-muted text-xs uppercase tracking-wider mb-4">{item.subtitle}</p>
                  <p className="text-text-secondary leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-dark-gray">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {COMPANY_STATS.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
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
