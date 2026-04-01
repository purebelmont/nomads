import type { NavItem, ServiceItem, StatItem, ProcessStep, PortfolioItem } from './types'

export const NAV_ITEMS: NavItem[] = [
  { label: '홈', href: '/' },
  { label: '회사소개', href: '/about' },
  { label: '서비스', href: '/services' },
  { label: '포트폴리오', href: '/portfolio' },
  { label: '견적 문의', href: '/contact' },
]

export const SERVICES: ServiceItem[] = [
  {
    id: 'drone',
    title: '드론 촬영',
    subtitle: 'Drone Filming',
    description: '최첨단 드론 장비로 대형 건설 현장, 조선소, 제조 시설의 스케일을 압도적인 영상으로 담아냅니다.',
    icon: 'drone',
    details: [
      '산업용 고성능 드론 촬영',
      '4K/6K 항공 영상',
      '대형 시설 조감도 촬영',
      '공정 진행 모니터링 영상',
      '항공 파노라마/타임랩스',
    ],
  },
  {
    id: 'corporate',
    title: '기업 홍보영상',
    subtitle: 'Corporate Video',
    description: '기업의 비전과 가치를 시네마틱 영상으로 전달합니다. 브랜드 스토리텔링의 새로운 기준.',
    icon: 'film',
    details: [
      '기업 브랜드 필름',
      'CEO/임원 인터뷰 영상',
      '시설 투어 영상',
      'IR/투자 유치용 영상',
      '채용 홍보 영상',
    ],
  },
  {
    id: 'product',
    title: '제품 촬영',
    subtitle: 'Product Shoot',
    description: '제품의 디테일과 품질을 극대화하는 전문 촬영. 산업 장비부터 완성품까지.',
    icon: 'camera',
    details: [
      '산업 장비/중장비 촬영',
      '제품 디테일 매크로 촬영',
      '360도 회전 촬영',
      '카탈로그/웹사이트용 이미지',
      '제품 시연 영상',
    ],
  },
  {
    id: 'commercial',
    title: '광고 영상',
    subtitle: 'Commercial Production',
    description: '임팩트 있는 광고 영상 제작. 기획부터 후반 작업까지 올인원 프로덕션.',
    icon: 'play',
    details: [
      'TV/디지털 광고 제작',
      'SNS 숏폼 콘텐츠',
      '전시회/박람회용 영상',
      '모션그래픽/CG 합성',
      '나레이션/BGM 제작',
    ],
  },
]

export const COMPANY_STATS: StatItem[] = [
  { value: 150, suffix: '+', label: '완료 프로젝트' },
  { value: 50, suffix: '+', label: '기업 클라이언트' },
  { value: 8, suffix: '년', label: '업력' },
  { value: 100, suffix: '%', label: '클라이언트 만족도' },
]

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: '기획',
    subtitle: 'Pre-production',
    description: '미팅 & 니즈 파악, 컨셉 기획, 스토리보드 작성, 촬영 일정 조율',
  },
  {
    number: '02',
    title: '촬영',
    subtitle: 'Production',
    description: '현장 촬영, 드론 촬영, 인터뷰, 조명/특수 촬영',
  },
  {
    number: '03',
    title: '편집',
    subtitle: 'Post-production',
    description: '영상 편집, 색보정/그레이딩, 모션그래픽, 사운드 디자인',
  },
  {
    number: '04',
    title: '납품',
    subtitle: 'Delivery',
    description: '최종 파일 전달, 다양한 포맷 납품, 플랫폼별 최적화',
  },
  {
    number: '05',
    title: '사후관리',
    subtitle: 'After-care',
    description: '수정 요청 대응, 추가 편집 지원, 장기 파트너십',
  },
]

export const PORTFOLIO_CATEGORIES = [
  { id: 'all' as const, label: '전체' },
  { id: 'drone' as const, label: '드론 촬영' },
  { id: 'corporate' as const, label: '기업 홍보' },
  { id: 'product' as const, label: '제품 촬영' },
  { id: 'commercial' as const, label: '광고' },
]

export const PLACEHOLDER_PORTFOLIO: PortfolioItem[] = [
  { id: '1', title: '대형 조선소 항공 촬영', client: 'HD한국조선해양', category: 'drone', thumbnail_url: 'https://images.pexels.com/photos/9083327/pexels-photo-9083327.jpeg?auto=compress&cs=tinysrgb&w=600&q=70', description: '조선소 전경 및 선박 건조 과정을 4K 항공 촬영으로 기록', year: 2025 },
  { id: '2', title: '스마트팩토리 홍보영상', client: '삼성물산', category: 'corporate', thumbnail_url: 'https://images.pexels.com/photos/28806603/pexels-photo-28806603.jpeg?auto=compress&cs=tinysrgb&w=600&q=70', description: '최첨단 스마트팩토리 시설과 자동화 공정 홍보 영상 제작', year: 2025 },
  { id: '3', title: '초대형 크레인 제품 촬영', client: '현대건설기계', category: 'product', thumbnail_url: 'https://images.pexels.com/photos/14651/pexels-photo-14651.jpeg?auto=compress&cs=tinysrgb&w=600&q=70', description: '450톤급 크레인의 스케일과 디테일을 담은 제품 촬영', year: 2025 },
  { id: '4', title: '건설 현장 타임랩스', client: '대우건설', category: 'drone', thumbnail_url: 'https://images.pexels.com/photos/14066336/pexels-photo-14066336.jpeg?auto=compress&cs=tinysrgb&w=600&q=70', description: '18개월간 초고층 건물 건설 과정을 드론 타임랩스로 기록', year: 2024 },
  { id: '5', title: '기업 브랜드 필름', client: '포스코', category: 'corporate', thumbnail_url: 'https://images.pexels.com/photos/29976478/pexels-photo-29976478.jpeg?auto=compress&cs=tinysrgb&w=600&q=70', description: '철강 산업의 미래 비전을 담은 시네마틱 브랜드 필름', year: 2024 },
  { id: '6', title: '산업 장비 카탈로그 촬영', client: '두산인프라코어', category: 'product', thumbnail_url: 'https://images.pexels.com/photos/10396410/pexels-photo-10396410.jpeg?auto=compress&cs=tinysrgb&w=600&q=70', description: '굴삭기, 휠로더 등 건설 장비 라인업 카탈로그 촬영', year: 2024 },
  { id: '7', title: 'TV 광고 제작', client: '현대중공업', category: 'commercial', thumbnail_url: 'https://images.pexels.com/photos/257700/pexels-photo-257700.jpeg?auto=compress&cs=tinysrgb&w=600&q=70', description: '글로벌 시장 대상 기업 이미지 TV 광고 제작', year: 2024 },
  { id: '8', title: '플랜트 시설 홍보영상', client: 'SK건설', category: 'corporate', thumbnail_url: 'https://images.pexels.com/photos/10407689/pexels-photo-10407689.jpeg?auto=compress&cs=tinysrgb&w=600&q=70', description: '해외 플랜트 시설의 기술력과 규모를 담은 홍보 영상', year: 2023 },
]

export const IMAGES = {
  hero: 'https://images.pexels.com/photos/929385/pexels-photo-929385.jpeg?auto=compress&cs=tinysrgb&w=1200&q=70',
  about: 'https://images.pexels.com/photos/3062545/pexels-photo-3062545.jpeg?auto=compress&cs=tinysrgb&w=600&q=70',
  services: {
    drone: 'https://images.pexels.com/photos/1506991/pexels-photo-1506991.jpeg?auto=compress&cs=tinysrgb&w=600&q=70',
    corporate: 'https://images.pexels.com/photos/6847073/pexels-photo-6847073.jpeg?auto=compress&cs=tinysrgb&w=600&q=70',
    product: 'https://images.pexels.com/photos/7648508/pexels-photo-7648508.jpeg?auto=compress&cs=tinysrgb&w=600&q=70',
    commercial: 'https://images.pexels.com/photos/11484830/pexels-photo-11484830.jpeg?auto=compress&cs=tinysrgb&w=600&q=70',
  },
} as const

export const BUDGET_OPTIONS = [
  '500만원 미만',
  '500만원~1000만원',
  '1000만원~3000만원',
  '3000만원~5000만원',
  '5000만원 이상',
  '미정',
]

export const TIMELINE_OPTIONS = [
  '1개월 이내',
  '1~3개월',
  '3~6개월',
  '6개월 이상',
  '미정',
]
