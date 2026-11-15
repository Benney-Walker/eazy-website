import SiteHeader from '../components/landing/SiteHeader.jsx'
import Hero from '../components/landing/Hero.jsx'
import ReportContents from '../components/landing/ReportContents.jsx'
import HowItWorks from '../components/landing/HowItWorks.jsx'
import SiteFooter from '../components/landing/SiteFooter.jsx'
import './LandingPage.css'

export default function LandingPage() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ReportContents />
        <HowItWorks />
      </main>
      <SiteFooter />
    </>
  )
}
