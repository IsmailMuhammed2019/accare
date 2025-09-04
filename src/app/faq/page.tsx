'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, Phone, Mail, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const faqCategories = [
  {
    title: "Getting Started",
    icon: HelpCircle,
    questions: [
      {
        question: "How do I get started with A&C Care services?",
        answer: "Getting started is easy! Simply contact us by phone at (203) 904-4883 or fill out our online contact form. We'll schedule a free consultation to discuss your needs, create a personalized care plan, and match you with the right caregiver."
      },
      {
        question: "How quickly can you start providing care?",
        answer: "We can typically begin care services within 24-48 hours of your initial contact, depending on your specific needs and location. For urgent situations, we can often arrange care the same day."
      },
      {
        question: "What areas do you serve?",
        answer: "We provide services throughout Connecticut and surrounding areas including Fairfield, Hartford, New Haven, and other counties. Contact us to confirm availability in your specific location."
      },
      {
        question: "Do you provide emergency care services?",
        answer: "Yes, we offer 24/7 emergency care services. Our team is always available to respond to urgent care needs, and we can quickly arrange for a caregiver to assist you."
      }
    ]
  },
  {
    title: "Our Caregivers",
    icon: HelpCircle,
    questions: [
      {
        question: "How do you screen your caregivers?",
        answer: "All our caregivers undergo thorough background checks, reference verification, and skills assessments before joining our team. We also require professional licensing and ongoing training."
      },
      {
        question: "Are your caregivers licensed and insured?",
        answer: "Yes, all our caregivers are licensed, bonded, and insured. We maintain comprehensive liability and workers' compensation insurance for your protection and peace of mind."
      },
      {
        question: "What training do your caregivers receive?",
        answer: "Our caregivers receive specialized training in senior care, including safety protocols, medical procedures, and communication skills. They also participate in ongoing education and professional development."
      },
      {
        question: "Can I meet the caregiver before services begin?",
        answer: "Absolutely! We encourage families to meet with their assigned caregiver before services begin. This helps ensure a good match and allows you to discuss specific care needs and preferences."
      }
    ]
  },
  {
    title: "Services & Care",
    icon: HelpCircle,
    questions: [
      {
        question: "What services do you provide?",
        answer: "We offer a comprehensive range of services including personal care, companionship, medication management, meal preparation, light housekeeping, and mobility support. All services are customized to meet individual needs."
      },
      {
        question: "Do you provide 24/7 care?",
        answer: "Yes, we offer round-the-clock care services including overnight care, weekend care, and holiday care. We can provide continuous care or scheduled visits based on your needs."
      },
      {
        question: "Can you help with medication management?",
        answer: "Yes, our caregivers can assist with medication reminders, prescription pickup, medication organization, and monitoring for side effects. They also communicate with healthcare providers as needed."
      },
      {
        question: "Do you provide specialized care for conditions like dementia or Alzheimer's?",
        answer: "Yes, our caregivers receive specialized training in dementia and Alzheimer's care. We provide compassionate, patient-centered care that focuses on safety, comfort, and maintaining quality of life."
      }
    ]
  },
  {
    title: "Pricing & Payment",
    icon: HelpCircle,
    questions: [
      {
        question: "How much do your services cost?",
        answer: "Our pricing varies based on the type and frequency of services needed. We offer competitive rates and provide transparent pricing with no hidden fees. Contact us for a personalized quote."
      },
      {
        question: "Do you accept insurance or Medicare?",
        answer: "We work with various insurance providers and can help you understand your coverage options. We also accept long-term care insurance and can assist with claims processing."
      },
      {
        question: "Do you offer payment plans or financial assistance?",
        answer: "We offer flexible payment options and can work with you to find a solution that fits your budget. We also provide information about available financial assistance programs."
      },
      {
        question: "Is there a minimum commitment or contract required?",
        answer: "We offer flexible arrangements with no long-term contracts required. You can start with a trial period and adjust services as needed. We're committed to finding the right solution for your family."
      }
    ]
  },
  {
    title: "Quality & Safety",
    icon: HelpCircle,
    questions: [
      {
        question: "How do you ensure quality of care?",
        answer: "We maintain high standards through regular quality assessments, client satisfaction surveys, and ongoing caregiver supervision. We also have a dedicated quality assurance team that monitors care delivery."
      },
      {
        question: "What happens if I'm not satisfied with my caregiver?",
        answer: "Your satisfaction is our priority. If you're not completely satisfied, we'll work quickly to find a better match. We have a large pool of qualified caregivers and can make changes as needed."
      },
      {
        question: "How do you handle emergencies or medical situations?",
        answer: "Our caregivers are trained in emergency response and can quickly assess situations. They know when to call 911, contact family members, or reach out to healthcare providers. We also have 24/7 support staff available."
      },
      {
        question: "Do you provide backup caregivers?",
        answer: "Yes, we maintain a pool of backup caregivers to ensure continuity of care. If your regular caregiver is unavailable, we'll arrange for a qualified substitute to maintain your care schedule."
      }
    ]
  }
]

export default function FAQPage() {
  const [openQuestions, setOpenQuestions] = useState<{ [key: string]: boolean }>({})

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`
    setOpenQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Find answers to common questions about our in-home care services. 
            Can&apos;t find what you&apos;re looking for? Contact us directly.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center mb-8">
                  <category.icon className="h-8 w-8 text-blue-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">{category.title}</h2>
                </div>
                
                <div className="space-y-4">
                  {category.questions.map((faq, questionIndex) => {
                    const key = `${categoryIndex}-${questionIndex}`
                    const isOpen = openQuestions[key]
                    
                    return (
                      <Card key={questionIndex} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader 
                          className="cursor-pointer"
                          onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        >
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold text-gray-900 pr-4">
                              {faq.question}
                            </CardTitle>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-blue-600 flex-shrink-0" />
                            )}
                          </div>
                        </CardHeader>
                        {isOpen && (
                          <CardContent className="pt-0">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </CardContent>
                        )}
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our care specialists are here to help. Contact us today for personalized assistance 
              and to learn more about how we can help your family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 mb-2">Emergency care available</p>
              <p className="text-gray-600">Round-the-clock assistance</p>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/contact">Contact Us Today</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="tel:+12039044883">Call Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Additional Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn more about our services and how we can help your family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Care Services</h3>
                <p className="text-gray-600 mb-6">
                  Explore our comprehensive range of in-home care services designed to meet your family&apos;s needs.
                </p>
                <Button asChild variant="outline">
                  <Link href="/services">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About Our Team</h3>
                <p className="text-gray-600 mb-6">
                  Meet our experienced caregivers and learn about our commitment to quality care.
                </p>
                <Button asChild variant="outline">
                  <Link href="/about">Meet Our Team</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Us</h3>
                <p className="text-gray-600 mb-6">
                  Discover what sets A&C Care apart and why families trust us with their loved ones.
                </p>
                <Button asChild variant="outline">
                  <Link href="/why-choose-us">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
