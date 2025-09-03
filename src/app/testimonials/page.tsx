'use client'

import { Star, Quote, Heart, Shield, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const testimonials = [
  {
    id: 1,
    name: "Margaret Thompson",
    location: "Bridgeport, CT",
    rating: 5,
    service: "Personal Care & Companionship",
    duration: "2 years",
    image: "/images/testimonials/margaret.jpg",
    quote: "A&C Care has been a blessing for our family. The caregivers are professional, compassionate, and truly care about my mother's well-being. I can finally have peace of mind knowing she's in good hands.",
    highlights: ["Professional staff", "Compassionate care", "Peace of mind"]
  },
  {
    id: 2,
    name: "Robert Chen",
    location: "New Haven, CT",
    rating: 5,
    service: "24/7 Care Services",
    duration: "1.5 years",
    image: "/images/testimonials/robert.jpg",
    quote: "The quality of care my father receives is exceptional. The team is responsive, reliable, and goes above and beyond to ensure his comfort and safety. Highly recommended!",
    highlights: ["Exceptional quality", "Responsive team", "Reliable service"]
  },
  {
    id: 3,
    name: "Sarah Williams",
    location: "Hartford, CT",
    rating: 5,
    service: "Medication Management & Housekeeping",
    duration: "1 year",
    image: "/images/testimonials/sarah.jpg",
    quote: "We've been with A&C Care for over a year now, and the consistency and quality of care has been outstanding. The caregivers become like family to us.",
    highlights: ["Consistent care", "Family-like relationship", "Outstanding quality"]
  },
  {
    id: 4,
    name: "David Rodriguez",
    location: "Stamford, CT",
    rating: 5,
    service: "Dementia Care",
    duration: "8 months",
    image: "/images/testimonials/david.jpg",
    quote: "The specialized care for my wife's dementia has been incredible. The caregivers are patient, understanding, and know exactly how to handle challenging situations.",
    highlights: ["Specialized care", "Patient staff", "Expert handling"]
  },
  {
    id: 5,
    name: "Linda Johnson",
    location: "Waterbury, CT",
    rating: 5,
    service: "Respite Care",
    duration: "6 months",
    image: "/images/testimonials/linda.jpg",
    quote: "As a family caregiver, I was exhausted. A&C Care's respite services gave me the break I needed while ensuring my husband received excellent care.",
    highlights: ["Respite support", "Family relief", "Excellent care"]
  },
  {
    id: 6,
    name: "Michael Brown",
    location: "Norwalk, CT",
    rating: 5,
    service: "Post-Surgery Care",
    duration: "3 months",
    image: "/images/testimonials/michael.jpg",
    quote: "After my surgery, I needed help with daily activities. A&C Care provided exactly what I needed - professional, caring support that helped me recover faster.",
    highlights: ["Post-surgery support", "Faster recovery", "Professional care"]
  }
]

const stats = [
  {
    number: "500+",
    label: "Families Served",
    icon: Heart
  },
  {
    number: "98%",
    label: "Client Satisfaction",
    icon: Star
  },
  {
    number: "24/7",
    label: "Care Available",
    icon: Clock
  },
  {
    number: "100%",
    label: "Licensed Staff",
    icon: Shield
  }
]

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Client Testimonials
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Hear from families across Connecticut about their experience with A&C Care. 
            Our commitment to quality care speaks for itself.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Families Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real families who have experienced the A&C Care difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="mb-6">
                    <Quote className="h-8 w-8 text-blue-600 mb-3" />
                    <p className="text-gray-600 italic leading-relaxed">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {testimonial.highlights.map((highlight, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <span className="text-sm text-gray-500">{testimonial.duration}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{testimonial.location}</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.service}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 md:p-12 text-white">
            <div className="text-center mb-8">
              <Quote className="h-12 w-12 text-white/80 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">
                &ldquo;A&C Care Changed Our Lives&rdquo;
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-xl leading-relaxed mb-6">
                  &ldquo;When my mother was diagnosed with Alzheimer&apos;s, our family was overwhelmed. 
                  A&C Care stepped in and provided not just care, but compassion, understanding, 
                  and support for our entire family. The caregivers became like family members, 
                  and my mother&apos;s quality of life improved significantly.&rdquo;
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold">J</span>
                  </div>
                  <div>
                    <p className="font-semibold">Jennifer Martinez</p>
                    <p className="text-blue-200">Daughter of Alzheimer&apos;s Patient</p>
                    <p className="text-blue-200">Fairfield, CT</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Specialized dementia care training</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Family support and education</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>24/7 emergency support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Consistent, reliable care</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Experience the A&C Care Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join hundreds of families who trust A&C Care with their loved ones. 
            Contact us today to learn how we can help your family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">Get Started Today</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="tel:+12039044883">Call Now: (203) 904-4883</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Learn More About Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how our comprehensive care services can benefit your family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Services</h3>
                <p className="text-gray-600 mb-6">
                  Explore our comprehensive range of in-home care services designed to meet your family&apos;s needs.
                </p>
                <Button asChild variant="outline">
                  <Link href="/services">View Services</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Us</h3>
                <p className="text-gray-600 mb-6">
                  Learn what sets A&C Care apart and why families trust us with their loved ones.
                </p>
                <Button asChild variant="outline">
                  <Link href="/why-choose-us">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h3>
                <p className="text-gray-600 mb-6">
                  Ready to get started? Contact us today for a free consultation and personalized care plan.
                </p>
                <Button asChild variant="outline">
                  <Link href="/contact">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
