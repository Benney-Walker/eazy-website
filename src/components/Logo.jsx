import './Logo.css'

// inverse: white text, for use on top of photos.
export default function Logo({ inverse = false }) {
  return (
    <span className={inverse ? 'logo logo--inverse' : 'logo'}>
      <svg className="logo__mark" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="var(--color-brand)" />
        <path
          d="M9 16.5l4.5 4.5L23 11.5"
          fill="none"
          stroke="var(--color-on-brand)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="25" cy="25" r="3" fill="var(--color-peach)" />
      </svg>
      <span className="logo__text">
        EazyManage
        <span className="logo__tag">Guardians</span>
      </span>
    </span>
  )
}
