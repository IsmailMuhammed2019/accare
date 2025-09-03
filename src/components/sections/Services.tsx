'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Heart, 
  Pill, 
  Utensils, 
  Home, 
  Users, 
  Activity,
  CheckCircle
} from 'lucide-react'

const services = [
  {
    icon: Heart,
    title: 'Personal Care',
    description: 'Assistance with bathing, dressing, and grooming to maintain personal hygiene and dignity.',
    image: '/images/activities/personal-care-new.jpg',
    features: ['Bathing assistance', 'Dressing help', 'Grooming support', 'Personal hygiene']
  },
  {
    icon: Pill,
    title: 'Medication Reminders',
    description: 'Ensuring proper adherence to prescriptions with timely reminders and monitoring.',
    image: '/images/activities/medication-new.jpg',
    features: ['Medication scheduling', 'Dosage monitoring', 'Prescription management', 'Health tracking']
  },
  {
    icon: Utensils,
    title: 'Meal Preparation',
    description: 'Healthy, personalized meal planning and cooking tailored to dietary needs.',
    image: '/images/activities/meal-prep-new.jpg',
    features: ['Nutritional planning', 'Dietary restrictions', 'Fresh meal preparation', 'Hydration monitoring']
  },
  {
    icon: Home,
    title: 'Light Housekeeping',
    description: 'Helping with cleaning, laundry, and organizing to maintain a comfortable living environment.',
    image: '/images/activities/housekeeping-new.jpg',
    features: ['General cleaning', 'Laundry assistance', 'Organization help', 'Maintenance support']
  },
  {
    icon: Users,
    title: 'Companionship',
    description: 'Friendly conversation and emotional support to combat loneliness and isolation.',
    image: '/images/activities/companionship-new.jpg',
    features: ['Social interaction', 'Emotional support', 'Activity companionship', 'Family communication']
  },
  {
    icon: Activity,
    title: 'Mobility Support',
    description: 'Assistance with walking, exercising, and getting around safely in the home.',
    image: '/images/activities/mobility-new.jpg',
    features: ['Walking assistance', 'Exercise support', 'Fall prevention', 'Safety monitoring']
  }
]

export function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our In-Home Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our experienced caregivers help seniors maintain independence and quality of life 
            while staying in the comfort of their own surroundings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-600 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    console.log('Image failed to load:', service.image);
                    // Hide the image and show gradient background
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2 text-left">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Choose A&C Care?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Home className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Comfort of Home</h4>
                <p className="text-gray-600 text-sm">Care delivered where your loved ones feel most comfortable.</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Personalized Attention</h4>
                <p className="text-gray-600 text-sm">Services tailored to individual needs and preferences.</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Qualified Caregivers</h4>
                <p className="text-gray-600 text-sm">Professional, trained, and compassionate team members.</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Flexible Scheduling</h4>
                <p className="text-gray-600 text-sm">Care available when you need it, including 24/7 options.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
