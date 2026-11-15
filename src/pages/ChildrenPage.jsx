import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import { useSession } from '../auth/session.jsx'
import { HOME_PATH } from '../config/routes.js'

// Temporary landing spot after sign-in. The children → terms → report card pages
// replace this once their design is chosen.
export default function ChildrenPage() {
  const { session, signOut } = useSession()
  const navigate = useNavigate()

  return (
    <div className="container" style={{ paddingBlock: 'var(--space-6)' }}>
      <Logo />
      <h1 style={{ marginTop: 'var(--space-6)', fontSize: 'var(--text-2xl)' }}>
        Signed in{session.guardianName ? ` as ${session.guardianName}` : ''}
      </h1>
      <p style={{ marginTop: 'var(--space-2)', color: 'var(--color-ink-muted)' }}>
        Your children&rsquo;s results page is coming next.
      </p>
      <button
        type="button"
        className="btn btn--secondary"
        style={{ marginTop: 'var(--space-5)' }}
        onClick={() => {
          signOut()
          navigate(HOME_PATH, { replace: true })
        }}
      >
        Sign out
      </button>
    </div>
  )
}
