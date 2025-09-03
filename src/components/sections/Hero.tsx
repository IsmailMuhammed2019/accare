'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone, ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{' '}
            <span className="text-blue-600">A&C Care</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-8">
            The Home Caring Services
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Compassionate In-Home Care for Your Loved Ones. Our experienced caregivers 
            help seniors maintain independence and quality of life while staying in 
            the comfort of their own surroundings.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/contact" className="flex items-center">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="tel:+12039044883" className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">24/7</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Round-the-Clock Care</h3>
              <p className="text-gray-600">Available whenever you need us</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">✓</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Licensed & Insured</h3>
              <p className="text-gray-600">Professional and reliable service</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">❤</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Compassionate Care</h3>
              <p className="text-gray-600">Treating your family like our own</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
