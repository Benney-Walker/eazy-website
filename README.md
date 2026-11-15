# EazyManage Guardians (website)

Guardian-facing website for checking children's term results. It talks to the same EazyManage Spring Boot backend as the desktop and mobile apps (`/api/portal/**`).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint
```

The API base URL defaults to production (`https://schoolmanagement.api.bynexlabs.com/api`). To point at a local backend, create `.env.local` with `VITE_API_BASE_URL=http://localhost:8080/api` (the backend allows `http://localhost:5173` outside production).

Deploying: this is a single-page app, so the host must serve `index.html` for unknown paths (e.g. `/sign-in`).

## Structure

```
src/
├── main.jsx              Fonts, design tokens, global styles, mounts <App/>
├── App.jsx               Router: / (landing), /sign-in, /children (signed-in only)
├── api/                  client.js (fetch wrapper, ApiError), portalAuth.js (request/verify code)
├── auth/                 session.jsx (SessionProvider, useSession), RequireSession.jsx, phone.js
├── config/routes.js      Shared paths
├── config/images.js      Photo IDs and URL helpers (Unsplash)
├── styles/
│   ├── tokens.css        Palette "Sage and peach", type scale, spacing, radii
│   └── global.css        Reset, .container, .btn, focus styles
├── components/
│   ├── Logo.jsx/.css
│   ├── Photo.jsx         Responsive decorative photo (srcset from config/images.js)
│   ├── landing/          SiteHeader, Hero, ReportContents, HowItWorks, SiteFooter
│   └── auth/             PhoneStep, CodeStep, CodeInput
└── pages/
    ├── LandingPage.jsx/.css
    ├── SignInPage.jsx/.css   Phone → SMS code, photo with bottom sheet (card on desktop)
    └── ChildrenPage.jsx      Temporary signed-in page until the results pages are built
```

## Conventions

- Colours, spacing and type sizes come from `styles/tokens.css`. Don't hardcode hex values in components.
- Grade colours (`--grade-top-*`, `--grade-mid-*`, `--grade-fail-*`) are for results only; the brand colour is never red so it can't be confused with a fail.
- The guardian session (token from verify-code) lives in memory and sessionStorage, never localStorage, and is cleared when it expires (2 h).
- Mobile-first: base styles target phones, `min-width` media queries add the wider layouts.
- Fonts (DM Sans) and icons (Tabler) are bundled from npm, with no third-party requests at runtime.

## Photos

Four free photos from Unsplash (Unsplash License), listed with their pages in `src/config/images.js`. They currently load from Unsplash's image CDN. To self-host, add the files under `src/assets/photos/` and return the imports from `photoSrc()`.
