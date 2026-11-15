import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

// Guardian session. Kept in memory and mirrored to sessionStorage so a page refresh
// keeps the guardian signed in; it disappears when the tab is closed. Never localStorage.
const STORAGE_KEY = 'eazy.guardian.session'

const SessionContext = createContext(null)

function readStoredSession() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const session = JSON.parse(raw)
    if (!session?.token || Date.now() >= session.expiresAt) {
      sessionStorage.removeItem(STORAGE_KEY)
      return null
    }
    return session
  } catch {
    return null
  }
}

export function SessionProvider({ children }) {
  const [session, setSession] = useState(readStoredSession)

  const signIn = useCallback(({ token, expiresIn, guardianName, children: kids }) => {
    // The contract doesn't fix expiresIn's unit: values above a day are taken as
    // milliseconds (the backend property is 7200000 ms), smaller ones as seconds.
    // Missing or invalid → the 2-hour default.
    const raw = Number(expiresIn)
    const lifetimeMs = raw > 86400 ? raw : raw > 0 ? raw * 1000 : 7200 * 1000
    const next = { token, guardianName, children: kids ?? [], expiresAt: Date.now() + lifetimeMs }
    setSession(next)
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Storage can be unavailable (private mode); the in-memory session still works.
    }
  }, [])

  const signOut = useCallback(() => {
    setSession(null)
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  // Sign out automatically when the token expires (the backend issues no refresh token).
  useEffect(() => {
    if (!session) return undefined
    const timer = setTimeout(signOut, Math.max(0, session.expiresAt - Date.now()))
    return () => clearTimeout(timer)
  }, [session, signOut])

  const value = useMemo(() => ({ session, signIn, signOut }), [session, signIn, signOut])
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSession() {
  const context = useContext(SessionContext)
  if (!context) throw new Error('useSession must be used inside SessionProvider')
  return context
}
