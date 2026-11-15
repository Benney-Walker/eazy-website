import { Link } from 'react-router-dom'
import Logo from '../Logo.jsx'
import { SIGN_IN_PATH } from '../../config/routes.js'

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__home" aria-label="EazyManage Guardians home">
          <Logo inverse />
        </Link>
        <Link to={SIGN_IN_PATH} className="btn btn--light btn--small">
          Sign in
        </Link>
      </div>
    </header>
  )
}
