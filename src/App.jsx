import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import { HOME_PATH } from './config/routes.js'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_PATH} element={<LandingPage />} />
        <Route path="*" element={<Navigate to={HOME_PATH} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
