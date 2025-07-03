import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import FAQs from '../components/FAQs'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Features />
      <HowItWorks />
      <FAQs />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  )
}

export default Home
