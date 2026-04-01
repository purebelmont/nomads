export interface QuoteRequest {
  id?: string
  created_at?: string
  company_name: string
  contact_name: string
  email: string
  phone: string
  service_type: ServiceType
  budget_range?: BudgetRange
  timeline?: Timeline
  project_description: string
  is_read?: boolean
  status?: QuoteStatus
}

export type ServiceType = 'drone' | 'corporate' | 'product' | 'commercial' | 'other'
export type BudgetRange = '500만원 미만' | '500만원~1000만원' | '1000만원~3000만원' | '3000만원~5000만원' | '5000만원 이상' | '미정'
export type Timeline = '1개월 이내' | '1~3개월' | '3~6개월' | '6개월 이상' | '미정'
export type QuoteStatus = 'new' | 'in_progress' | 'completed' | 'archived'

export type PortfolioCategory = 'all' | 'drone' | 'corporate' | 'product' | 'commercial'

export interface PortfolioItem {
  id: string
  title: string
  client: string
  category: Exclude<PortfolioCategory, 'all'>
  thumbnail_url: string
  video_url?: string
  description: string
  year: number
}

export interface NavItem {
  label: string
  href: string
}

export interface ServiceItem {
  id: ServiceType
  title: string
  subtitle: string
  description: string
  icon: string
  details: string[]
}

export interface StatItem {
  value: number
  suffix: string
  label: string
}

export interface ProcessStep {
  number: string
  title: string
  subtitle: string
  description: string
}
