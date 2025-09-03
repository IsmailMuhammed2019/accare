'use client'

import Image from 'next/image'
import { Heart, Shield, Clock, Users, Home, Pill, Utensils, Sparkles, Activity, Phone } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const services = [
  {
    id: 'personal-care',
    icon: Heart,
    title: 'Personal Care',
    description: 'Assistance with daily personal hygiene and grooming needs.',
    image: '/images/activities/personal-care.jpg',
    features: [
      'Bathing and showering assistance',
      'Dressing and grooming help',
      'Toileting and incontinence care',
      'Mobility assistance',
      'Skin care and monitoring'
    ],
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    id: 'companionship',
    icon: Users,
    title: 'Companionship',
    description: 'Meaningful social interaction and emotional support.',
    image: '/images/activities/companionship.jpg',
    features: [
      'Conversation and social interaction',
      'Reading and entertainment',
      'Accompaniment to appointments',
      'Holiday and birthday celebrations',
      'Family communication support'
    ],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'medication',
    icon: Pill,
    title: 'Medication Management',
    description: 'Safe and timely medication administration and monitoring.',
    image: '/images/activities/medication.jpg',
    features: [
      'Medication reminders',
      'Prescription pickup',
      'Medication organization',
      'Side effect monitoring',
      'Communication with healthcare providers'
    ],
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    id: 'meals',
    icon: Utensils,
    title: 'Meal Preparation',
    description: 'Nutritious meal planning, preparation, and feeding assistance.',
    image: '/images/activities/meal-prep.jpg',
    features: [
      'Meal planning and grocery shopping',
      'Healthy meal preparation',
      'Special dietary requirements',
      'Feeding assistance',
      'Hydration monitoring'
    ],
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    id: 'housekeeping',
    icon: Sparkles,
    title: 'Light Housekeeping',
    description: 'Maintaining a clean, safe, and comfortable living environment.',
    image: '/images/activities/housekeeping.jpg',
    features: [
      'General cleaning and tidying',
      'Laundry and linen care',
      'Kitchen and bathroom cleaning',
      'Bed making and room organization',
      'Safety hazard identification'
    ],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    id: 'mobility',
    icon: Activity,
    title: 'Mobility Support',
    description: 'Assistance with movement, exercise, and physical therapy.',
    image: '/images/activities/mobility.jpg',
    features: [
      'Walking and transfer assistance',
      'Exercise and stretching support',
      'Physical therapy exercises',
      'Fall prevention strategies',
      'Mobility aid assistance'
    ],
    color: 'text-teal-600',
    bgColor: 'bg-teal-50'
  }
]

const careLevels = [
  {
    title: 'Respite Care',
    description: 'Short-term relief for family caregivers',
    duration: '2-8 hours',
    frequency: 'As needed'
  },
  {
    title: 'Part-Time Care',
    description: 'Regular support for daily activities',
    duration: '4-8 hours',
    frequency: 'Daily or weekly'
  },
  {
    title: 'Full-Time Care',
    description: 'Comprehensive daily care and support',
    duration: '8-12 hours',
    frequency: 'Daily'
  },
  {
    title: '24/7 Care',
    description: 'Round-the-clock care and monitoring',
    duration: '24 hours',
    frequency: 'Continuous'
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Care Services
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive in-home care services designed to meet the unique needs of each individual 
            and provide peace of mind for families.
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Care Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a full range of in-home care services to support seniors in maintaining 
              their independence and quality of life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className={`absolute top-4 right-4 inline-flex items-center justify-center w-12 h-12 rounded-full ${service.bgColor} ${service.color}`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {service.title}
                  </CardTitle>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Care Levels */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Flexible Care Options
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand that every family&apos;s needs are different. That&apos;s why we offer 
              flexible care schedules to accommodate your specific situation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careLevels.map((level, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {level.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {level.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium text-gray-900">{level.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Frequency:</span>
                      <span className="font-medium text-gray-900">{level.frequency}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Our Services?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Licensed & Insured Caregivers
                    </h3>
                    <p className="text-gray-600">
                      All our caregivers are thoroughly screened, licensed, and insured for your peace of mind.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      24/7 Availability
                    </h3>
                    <p className="text-gray-600">
                      Emergency care services available around the clock when you need us most.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Personalized Care Plans
                    </h3>
                    <p className="text-gray-600">
                      Customized care plans tailored to each individual&apos;s unique needs and preferences.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Home className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      In-Home Comfort
                    </h3>
                    <p className="text-gray-600">
                      Care provided in the familiar comfort of your own home, maintaining independence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Ready to Get Started?</h3>
              <p className="text-blue-100 mb-8">
                Contact us today to discuss your care needs and learn how we can help 
                your family maintain independence and quality of life.
              </p>
              <div className="space-y-4">
                <Button asChild size="lg" className="w-full bg-white text-gray-900 hover:bg-gray-100">
                  <Link href="/contact" className="flex items-center justify-center">
                    <Phone className="mr-2 h-5 w-5" />
                    Contact Us Today
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full border-white text-gray-400 hover:bg-white hover:text-gray-900">
                  <Link href="tel:+12039044883">
                    Call Now: (203) 904-4883
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Service Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide in-home care services throughout Connecticut and surrounding areas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Connecticut</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Fairfield County</li>
                <li>Hartford County</li>
                <li>New Haven County</li>
                <li>Litchfield County</li>
                <li>Middlesex County</li>
                <li>New London County</li>
                <li>Tolland County</li>
                <li>Windham County</li>
              </ul>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Major Cities</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Bridgeport</li>
                <li>New Haven</li>
                <li>Hartford</li>
                <li>Stamford</li>
                <li>Waterbury</li>
                <li>Norwalk</li>
                <li>Danbury</li>
                <li>New Britain</li>
              </ul>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Surrounding Areas</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Westchester County, NY</li>
                <li>Putnam County, NY</li>
                <li>Dutchess County, NY</li>
                <li>Berkshire County, MA</li>
                <li>Hampden County, MA</li>
                <li>Worcester County, MA</li>
                <li>Providence County, RI</li>
                <li>Kent County, RI</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
