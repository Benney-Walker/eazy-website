import { Navigate } from 'react-router-dom'
import { useSession } from './session.jsx'
import { SIGN_IN_PATH } from '../config/routes.js'

// Sends signed-out guardians to the sign-in page. Expiry is handled by SessionProvider,
// which clears the session when the token's lifetime ends.
export default function RequireSession({ children }) {
  const { session } = useSession()
  if (!session) return <Navigate to={SIGN_IN_PATH} replace />
  return children
}
