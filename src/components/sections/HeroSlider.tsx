'use client'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone, ArrowRight, Heart, Shield, Clock, Users } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

const slides = [
  {
    id: 1,
    title: "Professional In-Home Care",
    subtitle: "Compassionate Care for Your Loved Ones",
    description: "Our experienced caregivers provide personalized care in the comfort of your own home, helping seniors maintain independence and quality of life.",
    backgroundImage: "/1.png",
    cta: "Get Started Today",
    ctaLink: "/contact",
    icon: Heart,
    feature: "Compassionate Care"
  },
  {
    id: 2,
    title: "Licensed & Insured Caregivers",
    subtitle: "Trusted Professionals You Can Rely On",
    description: "All our caregivers are thoroughly screened, licensed, and insured. We provide peace of mind with professional, reliable care services.",
    backgroundImage: "/2.png",
    cta: "Learn About Our Team",
    ctaLink: "/about",
    icon: Shield,
    feature: "Licensed & Insured"
  },
  {
    id: 3,
    title: "24/7 Care Available",
    subtitle: "Round-the-Clock Support When You Need It",
    description: "Whether you need occasional help or round-the-clock care, our flexible services are available 24/7 to meet your family's needs.",
    backgroundImage: "/3.png",
    cta: "Call Now",
    ctaLink: "tel:+12039044883",
    icon: Clock,
    feature: "24/7 Availability"
  },
  {
    id: 4,
    title: "Personalized Care Plans",
    subtitle: "Tailored to Your Family's Needs",
    description: "Every client receives a customized care plan designed around their specific needs, preferences, and lifestyle for the best possible care experience.",
    backgroundImage: "/4.png",
    cta: "Learn More",
    ctaLink: "/services",
    icon: Users,
    feature: "Personalized Care"
  },
  {
    id: 5,
    title: "Family Peace of Mind",
    subtitle: "Trusted Care for Your Loved Ones",
    description: "Give your family the peace of mind they deserve. Our reliable, compassionate caregivers treat your loved ones like family.",
    backgroundImage: "/5.png",
    cta: "Contact Us",
    ctaLink: "/contact",
    icon: Heart,
    feature: "Peace of Mind"
  }
]

export function HeroSlider() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional In-Home Care
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Compassionate Care for Your Loved Ones
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-screen">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '"></span>';
          },
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        loop={true}
        speed={1000}
        allowTouchMove={true}
        className="h-full"

      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full flex items-center" style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
              </div>
              
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center text-white">
                  <div className="mb-8">
                    <slide.icon className="h-16 w-16 mx-auto mb-4 text-white/80" />
                    <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
                      {slide.feature}
                    </span>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  
                  <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-white/90">
                    {slide.subtitle}
                  </h2>
                  
                  <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-white/80">
                    {slide.description}
                  </p>
                  
                                     <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                     <Button asChild size="lg" className="text-lg px-8 py-6 bg-white text-gray-900 hover:bg-gray-100 border-white">
                       <Link href={slide.ctaLink} className="flex items-center">
                         {slide.cta}
                         <ArrowRight className="ml-2 h-5 w-5" />
                       </Link>
                     </Button>
                     <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-white text-blue-600 hover:bg-white hover:text-gray-900">
                       <Link href="tel:+12039044883" className="flex items-center">
                         <Phone className="mr-2 h-5 w-5" />
                         Call Now
                       </Link>
                     </Button>
                   </div>
                                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      
      {/* Custom Navigation Buttons */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none z-10">
        {/* Previous Button */}
        <button 
          className="swiper-button-prev-custom pointer-events-auto bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 rounded-full p-3 md:p-4 shadow-lg hidden sm:block"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Next Button */}
        <button 
          className="swiper-button-next-custom pointer-events-auto bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 rounded-full p-3 md:p-4 shadow-lg hidden sm:block"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Swipe Indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 pointer-events-none z-10 sm:hidden">
        <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-2">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span className="text-white text-xs font-medium">Swipe</span>
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
      
      {/* Custom pagination styles */}
      <style jsx global>{`
        /* Hide default navigation buttons */
        .swiper-button-next,
        .swiper-button-prev {
          display: none !important;
        }
        
        /* Enhanced pagination styles */
        .swiper-pagination {
          bottom: 20px !important;
        }
        
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          width: 12px;
          height: 12px;
          margin: 0 6px;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active {
          background: white;
          transform: scale(1.2);
        }
        
        /* Mobile-specific pagination */
        @media (max-width: 768px) {
          .swiper-pagination {
            bottom: 15px !important;
          }
          
          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            margin: 0 4px;
          }
          
          .swiper-pagination-bullet-active {
            transform: scale(1.3);
          }
        }
        
        /* Custom navigation button styles */
        .swiper-button-prev-custom,
        .swiper-button-next-custom {
          position: static !important;
          margin: 0 !important;
          width: auto !important;
          height: auto !important;
        }
        
        .swiper-button-prev-custom:after,
        .swiper-button-next-custom:after {
          display: none !important;
        }
        
        /* Mobile navigation positioning */
        @media (max-width: 640px) {
          .swiper-button-prev-custom,
          .swiper-button-next-custom {
            padding: 8px !important;
          }
          
          .swiper-button-prev-custom svg,
          .swiper-button-next-custom svg {
            width: 20px !important;
            height: 20px !important;
          }
        }
      `}</style>
    </section>
  )
}
