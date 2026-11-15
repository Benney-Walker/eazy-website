import Photo from '../Photo.jsx'
import { PHOTOS } from '../../config/images.js'

const STEPS = ['Enter your phone number', 'Type the code we text you', 'Open or download the report card']

export default function HowItWorks() {
  return (
    <section className="section section--surface" aria-labelledby="how-title">
      <div className="container split split--reverse">
        <div className="split__media">
          <Photo photo={PHOTOS.pupils} className="split__photo" sizes="(min-width: 900px) 50vw, 100vw" />
        </div>
        <div>
          <h2 id="how-title" className="section__title">
            No password needed
          </h2>
          <ol className="steps">
            {STEPS.map((step, index) => (
              <li key={step} className="step">
                <span className="step__number" aria-hidden="true">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <p className="section__note">
            Use the number the school texts for attendance and fee receipts.
          </p>
        </div>
      </div>
    </section>
  )
}
