import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import Photo from '../components/Photo.jsx'
import PhoneStep from '../components/auth/PhoneStep.jsx'
import CodeStep from '../components/auth/CodeStep.jsx'
import { PHOTOS } from '../config/images.js'
import { CHILDREN_PATH, HOME_PATH } from '../config/routes.js'
import { useSession } from '../auth/session.jsx'
import './SignInPage.css'

export default function SignInPage() {
  const { session, signIn } = useSession()
  const navigate = useNavigate()
  const [phone, setPhone] = useState(null)

  if (session) return <Navigate to={CHILDREN_PATH} replace />

  return (
    <div className="sign-in">
      <Photo photo={PHOTOS.pupils} className="sign-in__photo" eager />
      <div className="sign-in__shade" aria-hidden="true" />

      <header className="sign-in__header">
        <Link to={HOME_PATH} aria-label="EazyManage Guardians home">
          <Logo inverse />
        </Link>
      </header>

      <main className="sheet">
        <span className="sheet__handle" aria-hidden="true" />
        {phone ? (
          <CodeStep
            key={phone}
            phone={phone}
            onChangeNumber={() => setPhone(null)}
            onVerified={(result) => {
              signIn(result)
              navigate(CHILDREN_PATH, { replace: true })
            }}
          />
        ) : (
          <PhoneStep onCodeSent={setPhone} />
        )}
      </main>
    </div>
  )
}
