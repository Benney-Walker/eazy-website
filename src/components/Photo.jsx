import { photoSrc, photoSrcSet } from '../config/images.js'

// Decorative photo that fills its parent. Pass eager for the first photo on the page.
export default function Photo({ photo, className = '', sizes = '100vw', eager = false }) {
  return (
    <img
      className={className}
      src={photoSrc(photo)}
      srcSet={photoSrcSet(photo)}
      sizes={sizes}
      alt=""
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
    />
  )
}
