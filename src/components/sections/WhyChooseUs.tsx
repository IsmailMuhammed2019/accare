'use client'

import { Heart, Shield, Clock, Users, Award, Home } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const reasons = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "Our caregivers treat your loved ones with the same care and respect they would give their own family members.",
    color: "text-red-600"
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "All our caregivers are thoroughly screened, licensed, and insured for your peace of mind and protection.",
    color: "text-blue-600"
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "We provide round-the-clock care services, available whenever you need us, day or night.",
    color: "text-green-600"
  },
  {
    icon: Users,
    title: "Experienced Team",
    description: "Our caregivers have years of experience in senior care and receive ongoing training and support.",
    color: "text-purple-600"
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "We maintain the highest standards of care quality with regular monitoring and client feedback.",
    color: "text-orange-600"
  },
  {
    icon: Home,
    title: "Home Comfort",
    description: "Care provided in the familiar comfort of your own home, maintaining independence and dignity.",
    color: "text-teal-600"
  }
]

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose A&C Care?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We understand that choosing the right care provider for your loved ones is one of the most important decisions you&apos;ll make. 
            Here&apos;s why families trust us with their care needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
              <CardContent className="p-8 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6 ${reason.color}`}>
                  <reason.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Personalized Care Plans
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Every client receives a customized care plan tailored to their specific needs, preferences, and lifestyle. 
              We work closely with families to ensure the best possible care experience.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Individualized care assessments
              </li>
              <li className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Flexible scheduling options
              </li>
              <li className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Regular care plan reviews
              </li>
              <li className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Family communication updates
              </li>
            </ul>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
              </div>
              <div className="relative z-10">
                <h4 className="text-xl font-semibold mb-4">Our Commitment</h4>
                <p className="text-blue-100 mb-6">
                  We are committed to providing the highest quality of care while maintaining the dignity, 
                  independence, and comfort of your loved ones in their own home.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-blue-200">Families Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">5+</div>
                    <div className="text-blue-200">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-blue-200">Care Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-blue-200">Licensed Staff</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
