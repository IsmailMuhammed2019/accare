'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useStore } from '@/store/useStore'
import { toast } from 'sonner'
import { Phone, Mail, Send } from 'lucide-react'

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setContactForm, resetContactForm } = useStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setContactForm(data)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast.success('Thank you for your message! We will get back to you soon.')
    reset()
    resetContactForm()
    setIsSubmitting(false)
  }

  const services = [
    'Personal Care',
    'Medication Reminders',
    'Meal Preparation',
    'Light Housekeeping',
    'Companionship',
    'Mobility Support',
    'Other'
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Get in Touch
          </CardTitle>
          <p className="text-gray-600">
            Start the conversation today. We're here to help you and your loved ones.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="Enter your full name"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  placeholder="Enter your phone number"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="Enter your email address"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Service */}
              <div className="space-y-2">
                <Label htmlFor="service">Service Interest *</Label>
                <Select onValueChange={(value) => setValue('service', value)}>
                  <SelectTrigger className={errors.service ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.service && (
                  <p className="text-red-500 text-sm">{errors.service.message}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Your Message *</Label>
              <Textarea
                id="message"
                {...register('message')}
                placeholder="Tell us about your care needs or any questions you have..."
                rows={5}
                className={errors.message ? 'border-red-500' : ''}
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-3 text-lg"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending...
                </div>
              ) : (
                <div className="flex items-center">
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </div>
              )}
            </Button>
          </form>

          {/* Contact Information */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">+1 (203) 904-4883</p>
                  <p className="text-sm text-gray-600">Primary Phone</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">+1 (203) 919-3541</p>
                  <p className="text-sm text-gray-600">Secondary Phone</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">contact@accareservice.com</p>
                  <p className="text-sm text-gray-600">Email Address</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 text-blue-600 text-center font-bold">FAX</div>
                <div>
                  <p className="font-medium text-gray-900">(475) 422-9529</p>
                  <p className="text-sm text-gray-600">Fax Number</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
