import Link from 'next/link'

interface ButtonProps {
  href?: string
  variant?: 'primary' | 'outline' | 'ghost' | 'white'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}

const variants = {
  primary: 'bg-accent hover:bg-accent-hover text-white',
  outline: 'border border-white/30 hover:border-white text-white hover:bg-white/5',
  ghost: 'text-text-secondary hover:text-white',
  white: 'bg-white hover:bg-white/90 text-black',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 font-medium rounded transition-colors ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={base} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
