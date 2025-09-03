import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Users, Shield, Clock } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Compassionate Care',
    description: 'We treat every client with the same love and respect we would give our own family members.'
  },
  {
    icon: Users,
    title: 'Professional Team',
    description: 'Our caregivers are trained, licensed, and experienced in providing quality in-home care.'
  },
  {
    icon: Shield,
    title: 'Trust & Safety',
    description: 'We prioritize the safety and well-being of your loved ones with thorough background checks.'
  },
  {
    icon: Clock,
    title: 'Reliable Service',
    description: 'We understand the importance of punctuality and consistency in care services.'
  }
]

export function About() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About A&C Care
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                At A&C Care, we bring dedicated professionals right into your home. 
                Our skilled caregivers are there to support as well as enhance your 
                loved one's independence.
              </p>
              <p>
                We provide a wide range of services, from personal care and companionship 
                to meal preparation, medication reminders, and light housekeeping, all 
                designed to promote comfort and safety at home.
              </p>
              <p>
                With flexible scheduling and a compassionate approach, we are committed 
                to meeting the unique needs of each individual, offering peace of mind 
                to families and quality care for those that matter most.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-600">Care Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                <div className="text-gray-600">Licensed Caregivers</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/home-sections/about-section.jpg"
                alt="Caregiver helping senior"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Values Cards - Full Width */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Our Mission
              </h3>
              <p className="text-xl leading-relaxed max-w-4xl mx-auto">
                To provide exceptional in-home care services that enhance the quality of life 
                for seniors and their families, while maintaining the highest standards of 
                professionalism, compassion, and reliability.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
