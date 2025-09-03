'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const navigation = {
  services: [
    { name: 'Personal Care', href: '/services#personal-care' },
    { name: 'Companionship', href: '/services#companionship' },
    { name: 'Medication Management', href: '/services#medication' },
    { name: 'Meal Preparation', href: '/services#meals' },
    { name: 'Housekeeping', href: '/services#housekeeping' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Why Choose Us', href: '/why-choose-us' },
    { name: 'Our Team', href: '/about#team' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Careers', href: '/careers' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Emergency Care', href: '/emergency' },
    { name: 'Resources', href: '/resources' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: Facebook,
    },
    {
      name: 'Instagram',
      href: '#',
      icon: Instagram,
    },
    {
      name: 'Twitter',
      href: '#',
      icon: Twitter,
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: Linkedin,
    },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center">
              <Image
                src="/AC_logo_transparent.webp"
                alt="A&C Care Logo"
                width={240}
                height={150}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-sm leading-6 text-gray-300">
              Providing compassionate in-home care services to help seniors maintain independence and quality of life in the comfort of their own homes.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <Link key={item.name} href={item.href} className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Services</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Contact Info</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="tel:+12039044883" className="flex items-center text-sm leading-6 text-gray-300 hover:text-white">
                      <Phone className="mr-2 h-4 w-4" />
                      (203) 904-4883
                    </Link>
                  </li>
                  <li>
                    <Link href="mailto:info@accare.com" className="flex items-center text-sm leading-6 text-gray-300 hover:text-white">
                      <Mail className="mr-2 h-4 w-4" />
                      info@accare.com
                    </Link>
                  </li>
                  <li className="flex items-start text-sm leading-6 text-gray-300">
                    <MapPin className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Connecticut, USA</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} A&C Care. All rights reserved. Licensed and insured home care services.
          </p>
        </div>
      </div>
    </footer>
  )
}
