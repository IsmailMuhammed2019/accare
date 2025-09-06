'use client'

import { Heart, Shield, Clock, Users, Award, Home, Star, CheckCircle, Phone } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const reasons = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "Our caregivers treat your loved ones with the same care and respect they would give their own family members.",
    details: [
      "Empathetic and understanding approach",
      "Respect for individual dignity and preferences",
      "Emotional support and companionship",
      "Cultural sensitivity and awareness"
    ],
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "All our caregivers are thoroughly screened, licensed, and insured for your peace of mind and protection.",
    details: [
      "Comprehensive background checks",
      "Professional licensing and certifications",
      "Liability and workers' compensation insurance",
      "Ongoing training and education requirements"
    ],
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "We provide round-the-clock care services, available whenever you need us, day or night.",
    details: [
      "Emergency care response",
      "Flexible scheduling options",
      "Holiday and weekend availability",
      "Last-minute care arrangements"
    ],
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: Users,
    title: "Experienced Team",
    description: "Our caregivers have years of experience in senior care and receive ongoing training and support.",
    details: [
      "Minimum 2+ years of care experience",
      "Specialized training in senior care",
      "Continuous professional development",
      "Supervision and support systems"
    ],
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "We maintain the highest standards of care quality with regular monitoring and client feedback.",
    details: [
      "Regular quality assessments",
      "Client satisfaction surveys",
      "Care plan reviews and updates",
      "Performance monitoring and feedback"
    ],
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
  {
    icon: Home,
    title: "Home Comfort",
    description: "Care provided in the familiar comfort of your own home, maintaining independence and dignity.",
    details: [
      "Familiar environment and routines",
      "Maintained independence and privacy",
      "Family involvement and support",
      "Personalized care environment"
    ],
    color: "text-teal-600",
    bgColor: "bg-teal-50"
  }
]

const testimonials = [
  {
    name: "Margaret Thompson",
    location: "Bridgeport, CT",
    rating: 5,
    text: "A&C Care has been a blessing for our family. The caregivers are professional, compassionate, and truly care about my mother's well-being. I can finally have peace of mind knowing she's in good hands.",
    service: "Personal Care & Companionship"
  },
  {
    name: "Robert Chen",
    location: "New Haven, CT",
    rating: 5,
    text: "The quality of care my father receives is exceptional. The team is responsive, reliable, and goes above and beyond to ensure his comfort and safety. Highly recommended!",
    service: "24/7 Care Services"
  },
  {
    name: "Sarah Williams",
    location: "Hartford, CT",
    rating: 5,
    text: "We've been with A&C Care for over a year now, and the consistency and quality of care has been outstanding. The caregivers become like family to us.",
    service: "Medication Management & Housekeeping"
  }
]

const certifications = [
  "Licensed Home Care Agency",
  "Medicare Certified",
  "Medicaid Approved",
  "Joint Commission Accredited",
  "Better Business Bureau A+ Rating",
  "State Department of Health Licensed"
]

export default function WhyChooseUsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/3.png')`
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-purple-700/80"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose A&C Care?
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover why families across Connecticut trust us with their loved ones&apos; care needs.
          </p>
        </div>
      </section>

      {/* Main Reasons */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand that choosing the right care provider is one of the most important decisions you&apos;ll make. 
              Here&apos;s why families consistently choose A&C Care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                <CardContent className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${reason.bgColor} mb-6 ${reason.color}`}>
                    <reason.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {reason.description}
                  </p>
                  <ul className="space-y-2">
                    {reason.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Families Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what families across Connecticut have to say about their experience with A&C Care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.service}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Accreditations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Certifications & Accreditations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence is reflected in our certifications and accreditations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <Award className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-900">{cert}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              A&C Care vs. Other Providers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we compare to other care providers in the region.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-900">Licensed and insured caregivers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-900">24/7 emergency care availability</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-900">Personalized care plans</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-900">Regular quality assessments</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-900">Family communication updates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-900">Flexible scheduling options</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-900">Comprehensive service areas</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Our Commitment to You</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Quality Guarantee</h4>
                    <p className="text-blue-100 text-sm">We guarantee the quality of our care services</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Satisfaction Promise</h4>
                    <p className="text-blue-100 text-sm">Your satisfaction is our top priority</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Transparent Pricing</h4>
                    <p className="text-blue-100 text-sm">No hidden fees or surprise charges</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Ongoing Support</h4>
                    <p className="text-blue-100 text-sm">We&apos;re here for you every step of the way</p>
                  </div>
                </div>
              </div>
              <Button asChild size="lg" className="w-full bg-white text-gray-900 hover:bg-gray-100">
                <Link href="/contact" className="flex items-center justify-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Get Started Today
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Experience the A&C Care Difference?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Contact us today to learn more about our services and how we can help your family 
            maintain independence and quality of life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              <Link href="/contact">Contact Us Today</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-blue-600 hover:bg-white hover:text-gray-900">
              <Link href="tel:+12039044883">Call Now: (203) 904-4883</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
