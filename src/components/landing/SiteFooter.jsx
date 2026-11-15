import { Link } from 'react-router-dom'
import Logo from '../Logo.jsx'
import Photo from '../Photo.jsx'
import { PHOTOS } from '../../config/images.js'
import { SIGN_IN_PATH } from '../../config/routes.js'

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <section className="cta-band" aria-labelledby="cta-title">
        <Photo photo={PHOTOS.playing} className="cta-band__photo" />
        <div className="cta-band__shade" aria-hidden="true" />
        <div className="container cta-band__content">
          <h2 id="cta-title" className="cta-band__title">
            Results appear as soon as the school publishes them
          </h2>
          <Link to={SIGN_IN_PATH} className="btn btn--primary">
            Check results
          </Link>
        </div>
      </section>
      <div className="container site-footer">
        <Logo />
        <p className="site-footer__legal">&copy; {year} Bynex Labs</p>
      </div>
    </footer>
  )
}
