import type { Metadata } from 'next'
import { Suspense } from 'react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import QuoteForm from '@/components/ui/QuoteForm'
import { EmailIcon, PhoneIcon, LocationIcon, ClockIcon } from '@/components/icons'

export const metadata: Metadata = {
  title: '견적요청 | NOMADS COMPANY',
  description: '프로젝트 견적 문의 — 빠르고 정확한 상담을 약속합니다',
}

const CONTACT_INFO = [
  { icon: LocationIcon, label: '주소', value: '추후 업데이트' },
  { icon: EmailIcon, label: '이메일', value: 'info@nomadscompany.co.kr' },
  { icon: PhoneIcon, label: '전화', value: '추후 업데이트' },
  { icon: ClockIcon, label: '업무시간', value: '평일 09:00 ~ 18:00' },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-gray to-black" />
        <div className="relative z-10 text-center px-6">
          <p className="text-accent text-sm font-medium uppercase tracking-[0.2em] mb-4">CONTACT</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight">문의 / 견적요청</h1>
          <p className="text-text-secondary text-lg mt-4">프로젝트에 대해 말씀해주세요. 빠르게 답변드리겠습니다.</p>
        </div>
      </section>

      {/* Form + Contact */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Form */}
            <AnimatedSection className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-8">견적 요청서</h2>
              <Suspense fallback={<div className="text-text-secondary">로딩 중...</div>}>
                <QuoteForm />
              </Suspense>
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection delay={200}>
              <h2 className="text-2xl font-bold mb-8">연락처</h2>
              <div className="space-y-6">
                {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-dark-gray border border-border flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-text-muted text-sm">{label}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
