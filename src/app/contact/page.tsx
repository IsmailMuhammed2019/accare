'use client'

import { ContactForm } from '@/components/forms/ContactForm'
import { GoogleMap } from '@/components/GoogleMap'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Get in touch with us today to learn more about our in-home care services 
            and how we can help your family.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">(203) 904-4883</p>
              <p className="text-gray-600">(203) 919-3541</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">info@accare.com</p>
              <p className="text-gray-600">contact@accareservice.com</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">Connecticut, USA</p>
              <p className="text-gray-600">Serving local communities</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Hours</h3>
              <p className="text-gray-600">24/7 Care Available</p>
              <p className="text-gray-600">Emergency support</p>
            </div>
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we&apos;ll get back to you as soon as possible. 
                For urgent care needs, please call us directly.
              </p>
              <ContactForm />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Service Area
              </h2>
              <p className="text-gray-600 mb-8">
                We provide in-home care services throughout Connecticut and surrounding areas. 
                Contact us to confirm service availability in your location.
              </p>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <GoogleMap />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How quickly can you start providing care?
              </h3>
              <p className="text-gray-600">
                We can typically begin care services within 24-48 hours of your initial contact, 
                depending on your specific needs and location.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Do you provide emergency care services?
              </h3>
              <p className="text-gray-600">
                Yes, we offer 24/7 emergency care services. Our team is always available 
                to respond to urgent care needs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What areas do you serve?
              </h3>
              <p className="text-gray-600">
                We provide services throughout Connecticut and surrounding areas. 
                Contact us to confirm availability in your specific location.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How do you screen your caregivers?
              </h3>
              <p className="text-gray-600">
                All our caregivers undergo thorough background checks, reference verification, 
                and skills assessments before joining our team.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
