'use client'

import { Heart, Shield, Clock, Users, Award, MapPin, DollarSign, Calendar, Phone, Mail } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Pay",
    description: "Above-market wages with opportunities for raises and bonuses"
  },
  {
    icon: Shield,
    title: "Health Benefits",
    description: "Comprehensive health, dental, and vision insurance"
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Work schedules that fit your lifestyle and availability"
  },
  {
    icon: Award,
    title: "Professional Development",
    description: "Ongoing training and career advancement opportunities"
  },
  {
    icon: Heart,
    title: "Meaningful Work",
    description: "Make a real difference in people's lives every day"
  },
  {
    icon: Users,
    title: "Supportive Team",
    description: "Work with a caring, professional team that supports your success"
  }
]

const positions = [
  {
    title: "Certified Nursing Assistant (CNA)",
    location: "Connecticut - Multiple Locations",
    type: "Full-time & Part-time",
    experience: "1+ years experience",
    description: "Provide direct care to clients in their homes, including personal care, medication reminders, and companionship.",
    requirements: [
      "Valid CNA certification",
      "1+ years of caregiving experience",
      "Reliable transportation",
      "Compassionate and patient demeanor",
      "Strong communication skills"
    ]
  },
  {
    title: "Home Health Aide (HHA)",
    location: "Connecticut - Multiple Locations",
    type: "Full-time & Part-time",
    experience: "Entry level to experienced",
    description: "Assist clients with daily living activities, provide companionship, and support their independence at home.",
    requirements: [
      "HHA certification preferred",
      "Compassionate and caring nature",
      "Reliable transportation",
      "Flexible schedule availability",
      "Strong work ethic"
    ]
  },
  {
    title: "Companion Caregiver",
    location: "Connecticut - Multiple Locations",
    type: "Part-time & Flexible",
    experience: "Entry level",
    description: "Provide companionship, conversation, and light assistance to seniors in their homes.",
    requirements: [
      "Compassionate and friendly personality",
      "Reliable transportation",
      "Flexible schedule",
      "Good communication skills",
      "Patience and understanding"
    ]
  },
  {
    title: "Live-in Caregiver",
    location: "Connecticut - Multiple Locations",
    type: "Full-time",
    experience: "2+ years experience",
    description: "Provide 24/7 care for clients who need round-the-clock assistance in their homes.",
    requirements: [
      "2+ years of caregiving experience",
      "CNA or HHA certification preferred",
      "Ability to live in client's home",
      "Strong physical stamina",
      "Excellent problem-solving skills"
    ]
  }
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Our Care Team
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Make a difference in people&apos;s lives while building a rewarding career. 
            Join A&C Care and become part of a team that truly cares.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Work With A&C Care?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We value our caregivers and provide the support, training, and benefits 
              you need to succeed in your career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
                    <benefit.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Current Openings
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;re always looking for compassionate, qualified caregivers to join our team. 
              Browse our current openings and find the perfect fit for you.
            </p>
          </div>

          <div className="space-y-8">
            {positions.map((position, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                        {position.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {position.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {position.type}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {position.experience}
                        </div>
                      </div>
                    </div>
                    <Button asChild className="mt-4 md:mt-0">
                      <Link href="/contact">Apply Now</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {position.description}
                  </p>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                    <ul className="space-y-2">
                      {position.requirements.map((requirement, reqIndex) => (
                        <li key={reqIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How to Apply
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our application process is simple and straightforward. 
              Here&apos;s what you can expect when applying to join our team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Us</h3>
              <p className="text-gray-600">
                Call us or fill out our contact form to express your interest
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Initial Interview</h3>
              <p className="text-gray-600">
                We&apos;ll schedule a phone or video interview to discuss your experience and goals
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Background Check</h3>
              <p className="text-gray-600">
                Complete our screening process including background and reference checks
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Training</h3>
              <p className="text-gray-600">
                Begin orientation and training to prepare for your first assignment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Join Our Team?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Contact us today to learn more about career opportunities at A&C Care 
              and start your journey toward a rewarding career in caregiving.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-2">(203) 904-4883</p>
              <p className="text-gray-600">(203) 919-3541</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-2">christine@thecaringservice.com</p>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/contact">Apply Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="tel:+12039044883">Call to Apply</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Details */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Benefits Package
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in taking care of our caregivers. That&apos;s why we offer a comprehensive 
              benefits package designed to support your health, well-being, and career growth.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Health & Wellness</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <span className="font-semibold text-gray-900">Health Insurance</span>
                    <p className="text-gray-600 text-sm">Comprehensive medical, dental, and vision coverage</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <span className="font-semibold text-gray-900">Paid Time Off</span>
                    <p className="text-gray-600 text-sm">Generous vacation, sick, and personal days</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <span className="font-semibold text-gray-900">Mental Health Support</span>
                    <p className="text-gray-600 text-sm">Employee assistance program and counseling services</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Career Development</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <span className="font-semibold text-gray-900">Training Programs</span>
                    <p className="text-gray-600 text-sm">Ongoing education and skill development opportunities</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <span className="font-semibold text-gray-900">Career Advancement</span>
                    <p className="text-gray-600 text-sm">Clear pathways for promotion and leadership roles</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <span className="font-semibold text-gray-900">Certification Support</span>
                    <p className="text-gray-600 text-sm">Financial assistance for professional certifications</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
