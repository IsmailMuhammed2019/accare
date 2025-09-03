'use client'

import Image from 'next/image'
import { Heart, Shield, Users, Award, Clock, Home } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "/images/team/sarah.jpg",
    bio: "With over 15 years of experience in healthcare, Sarah founded A&C Care with a vision to provide compassionate, personalized care to seniors in their own homes.",
    email: "sarah@accare.com"
  },
  {
    name: "Michael Chen",
    role: "Director of Care Services",
    image: "/images/team/michael.jpg",
    bio: "Michael oversees all care operations, ensuring the highest standards of service delivery and caregiver training across our organization.",
    email: "michael@accare.com"
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Medical Director",
    image: "/images/team/emily.jpg",
    bio: "Dr. Rodriguez provides medical oversight and ensures our care protocols meet the highest medical standards and best practices.",
    email: "emily@accare.com"
  }
]

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We treat every client with the same care and respect we would give our own family members."
  },
  {
    icon: Shield,
    title: "Trust",
    description: "We build lasting relationships based on reliability, transparency, and consistent quality care."
  },
  {
    icon: Users,
    title: "Community",
    description: "We're committed to supporting our local communities and helping families stay together."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards of care quality and professional development."
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About A&C Care
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Dedicated to providing exceptional in-home care services that enhance the quality of life 
            for seniors and provide peace of mind for their families.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At A&C Care, our mission is to provide compassionate, professional in-home care services 
                that allow seniors to maintain their independence and dignity while living in the comfort 
                of their own homes.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe that every individual deserves personalized care that respects their unique 
                needs, preferences, and life experiences. Our team of dedicated caregivers works tirelessly 
                to ensure that each client receives the highest quality of care possible.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">24/7 Care Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-gray-600">Licensed & Insured</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Vision</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                To be the leading provider of in-home care services in Connecticut, known for our 
                exceptional quality, compassionate care, and unwavering commitment to our clients' 
                well-being.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Home className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Home-Based Care</h4>
                    <p className="text-sm text-gray-600">Keeping families together in familiar surroundings</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Professional Team</h4>
                    <p className="text-sm text-gray-600">Experienced, trained, and compassionate caregivers</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="h-6 w-6 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Quality Standards</h4>
                    <p className="text-sm text-gray-600">Maintaining the highest standards of care</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape the way we care for our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16" id="team">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated professionals who lead our organization and ensure the highest 
              quality of care for our clients.
            </p>
          </div>
          
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {teamMembers.map((member, index) => (
               <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                 <div className="relative h-64 bg-gray-200">
                   <Image
                     src={member.image}
                     alt={member.name}
                     fill
                     className="object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                 </div>
                 <CardContent className="p-8 text-center">
                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
                     {member.name}
                   </h3>
                   <p className="text-blue-600 font-medium mb-4">
                     {member.role}
                   </p>
                   <p className="text-gray-600 leading-relaxed mb-4">
                     {member.bio}
                   </p>
                   <a 
                     href={`mailto:${member.email}`}
                     className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                   >
                     {member.email}
                   </a>
                 </CardContent>
               </Card>
             ))}
           </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-xl text-blue-100">
              Making a difference in the lives of families across Connecticut
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-200">Families Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">5+</div>
              <div className="text-blue-200">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-200">Caregivers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-200">Care Available</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
