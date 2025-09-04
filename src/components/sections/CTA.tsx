'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, Mail, Clock } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/home-sections/cta-section.jpg"
          alt="Caregiver and senior"
          fill
          className="object-cover opacity-20"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Contact us today to discuss your care needs and learn how A&C Care can 
            help your loved ones maintain independence and quality of life at home.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Card */}
          <Card className="bg-white text-gray-900 border-0 shadow-lg">
            <CardContent className="p-6 h-full">
              <div className="text-center flex flex-col h-full">
                <div className="flex-1">
                  <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Call Us Today</h3>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">(203) 904-4883</p>
                    <p className="text-lg font-medium">(203) 919-3541</p>
                  </div>
                </div>
                <Button asChild className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="tel:+12039044883">Call Now</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Email Card */}
          <Card className="bg-white text-gray-900 border-0 shadow-lg">
            <CardContent className="p-6 h-full">
              <div className="text-center flex flex-col h-full">
                <div className="flex-1">
                  <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Send a Message</h3>
                  <p className="text-gray-600">christine@thecaringservice.com</p>
                </div>
                <Button asChild variant="outline" className="mt-6 w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  <Link href="/contact">Send Email</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Availability Card */}
          <Card className="bg-white text-gray-900 border-0 shadow-lg">
            <CardContent className="p-6 h-full">
              <div className="text-center flex flex-col h-full">
                <div className="flex-1">
                  <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
                  <p className="text-gray-600">Care available whenever you need us</p>
                </div>
                <Button asChild variant="outline" className="mt-6 w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  <Link href="/contact">Get Started</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Urgency Message */}
        <div className="mt-12 text-center">
          <Card className="bg-yellow-50 border-yellow-200 text-yellow-800">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                Don&apos;t Wait - Start Your Care Journey Today
              </h3>
              <p className="text-lg">
                Every day matters when it comes to the well-being of your loved ones. 
                Contact us now for a free consultation and personalized care plan.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Contact Info */}
        <div className="mt-12 text-center text-blue-600">
          <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4">Additional Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">FAX:</p>
                <p>(475) 422-9529</p>
              </div>
              <div>
                <p className="font-medium">Service Hours:</p>
                <p>24/7 Care Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
