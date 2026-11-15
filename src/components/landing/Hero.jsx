import { Link } from 'react-router-dom'
import { IconArrowRight } from '@tabler/icons-react'
import Photo from '../Photo.jsx'
import { PHOTOS } from '../../config/images.js'
import { SIGN_IN_PATH } from '../../config/routes.js'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Photo photo={PHOTOS.hero} className="hero__photo" eager />
      <div className="hero__shade" aria-hidden="true" />
      <div className="container hero__content">
        <h1 id="hero-title" className="hero__title">
          Your child&rsquo;s results, straight from school
        </h1>
        <p className="hero__lead">View the term report card on your phone and download it.</p>
        <Link to={SIGN_IN_PATH} className="btn btn--primary">
          Check results
          <IconArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
