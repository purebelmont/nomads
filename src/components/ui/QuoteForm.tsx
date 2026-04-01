'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { SERVICES, BUDGET_OPTIONS, TIMELINE_OPTIONS } from '@/lib/constants'
import { CheckIcon, SpinnerIcon } from '@/components/icons'

export default function QuoteForm() {
  const searchParams = useSearchParams()
  const preselectedService = searchParams.get('service') || ''

  const [pending, setPending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    setError('')

    const form = new FormData(e.currentTarget)
    const data = {
      company_name: form.get('company_name') as string,
      contact_name: form.get('contact_name') as string,
      email: form.get('email') as string,
      phone: form.get('phone') as string,
      service_type: form.get('service_type') as string,
      budget_range: form.get('budget_range') as string || null,
      timeline: form.get('timeline') as string || null,
      project_description: form.get('project_description') as string,
    }

    const { error: dbError } = await supabase.from('quote_requests').insert([data])

    setPending(false)
    if (dbError) {
      setError('제출 중 오류가 발생했습니다. 다시 시도해주세요.')
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mb-6">
          <CheckIcon className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold mb-2">견적 요청 완료</h3>
        <p className="text-text-secondary">
          견적 요청이 성공적으로 접수되었습니다.
          <br />
          빠른 시일 내에 연락드리겠습니다.
        </p>
      </div>
    )
  }

  const inputClass = 'w-full bg-dark-gray border border-border rounded-lg px-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-2">회사명 *</label>
          <input name="company_name" type="text" required placeholder="회사명을 입력하세요" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">담당자명 *</label>
          <input name="contact_name" type="text" required placeholder="담당자 이름" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-2">이메일 *</label>
          <input name="email" type="email" required placeholder="email@company.com" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">연락처 *</label>
          <input name="phone" type="tel" required placeholder="010-0000-0000" className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">서비스 유형 *</label>
        <select name="service_type" required defaultValue={preselectedService} className={inputClass}>
          <option value="">선택해주세요</option>
          {SERVICES.map((s) => (
            <option key={s.id} value={s.id}>{s.title}</option>
          ))}
          <option value="other">기타</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-2">예산 범위</label>
          <select name="budget_range" className={inputClass}>
            <option value="">선택해주세요</option>
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">희망 일정</label>
          <select name="timeline" className={inputClass}>
            <option value="">선택해주세요</option>
            {TIMELINE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">프로젝트 설명 *</label>
        <textarea
          name="project_description"
          required
          rows={5}
          placeholder="프로젝트에 대해 자유롭게 설명해주세요"
          className={inputClass}
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-accent hover:bg-accent-hover disabled:opacity-50 text-white font-medium py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {pending ? (
          <>
            <SpinnerIcon className="w-5 h-5" />
            제출 중...
          </>
        ) : (
          '견적 요청하기'
        )}
      </button>
    </form>
  )
}
