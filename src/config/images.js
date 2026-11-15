// Photos from Unsplash (free under the Unsplash License, no attribution required).
// They load from Unsplash's image CDN, which resizes them per screen.
// To self-host: put the files in src/assets/photos/, import them here and return
// the import from photoSrc() instead of building a CDN URL.

const UNSPLASH = 'https://images.unsplash.com/'

export const PHOTOS = {
  hero: {
    id: 'photo-1548102245-c79dbcfa9f92',
    page: 'https://unsplash.com/photos/twin-boys-jLbmY5Zp7UQ',
  },
  classroom: {
    id: 'photo-1473649085228-583485e6e4d7',
    page: 'https://unsplash.com/photos/children-sitting-on-chairs-inside-classroom-jEEYZsaxbH4',
  },
  pupils: {
    id: 'photo-1617057119499-aea7d3eaef02',
    page: 'https://unsplash.com/photos/AmKMFcROG9o',
  },
  playing: {
    id: 'photo-1459183885421-5cc683b8dbba',
    page: 'https://unsplash.com/photos/zf9_yiAekJs',
  },
}

const WIDTHS = [640, 1024, 1600, 2000]

export function photoSrc(photo, width = 1600) {
  return `${UNSPLASH}${photo.id}?auto=format&fit=crop&w=${width}&q=70`
}

export function photoSrcSet(photo) {
  return WIDTHS.map((w) => `${photoSrc(photo, w)} ${w}w`).join(', ')
}
