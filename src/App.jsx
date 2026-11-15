import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SessionProvider } from './auth/session.jsx'
import RequireSession from './auth/RequireSession.jsx'
import LandingPage from './pages/LandingPage.jsx'
import SignInPage from './pages/SignInPage.jsx'
import ChildrenPage from './pages/ChildrenPage.jsx'
import { CHILDREN_PATH, HOME_PATH, SIGN_IN_PATH } from './config/routes.js'

export default function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path={HOME_PATH} element={<LandingPage />} />
          <Route path={SIGN_IN_PATH} element={<SignInPage />} />
          <Route
            path={CHILDREN_PATH}
            element={
              <RequireSession>
                <ChildrenPage />
              </RequireSession>
            }
          />
          <Route path="*" element={<Navigate to={HOME_PATH} replace />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  )
}
