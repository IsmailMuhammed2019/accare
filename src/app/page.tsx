import { HeroSlider } from '@/components/sections/HeroSlider'
import { Services } from '@/components/sections/Services'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { About } from '@/components/sections/About'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTA } from '@/components/sections/CTA'

export default function Home() {
  return (
    <>
      <HeroSlider />
      <Services />
      <WhyChooseUs />
      <About />
      <Testimonials />
      <CTA />
    </>
  )
}
