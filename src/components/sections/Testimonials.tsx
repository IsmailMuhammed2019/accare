import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Daughter of Client',
    avatar: '/2.png',
    content: 'A&C Care has been a blessing for our family. The caregivers are professional, compassionate, and truly care about my mother\'s well-being. They\'ve helped her maintain her independence while ensuring her safety.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Son of Client',
    avatar: '/3.png',
    content: 'The medication reminder service has been invaluable. My father\'s health has improved significantly since A&C Care started helping with his medication management. Highly recommended!',
    rating: 5
  },
  {
    name: 'Patricia Williams',
    role: 'Client',
    avatar: '/4.png',
    content: 'I love having A&C Care in my home. The companionship and meal preparation services have made such a difference in my daily life. The caregivers are like family to me.',
    rating: 5
  },
  {
    name: 'Robert Davis',
    role: 'Husband of Client',
    avatar: '/5.png',
    content: 'The personal care services are exceptional. My wife feels comfortable and dignified with the caregivers. A&C Care has given us peace of mind knowing she&apos;s in good hands.',
    rating: 5
  },
  {
    name: 'Lisa Thompson',
    role: 'Daughter of Client',
    avatar: '/6.png',
    content: 'Flexible scheduling and reliable service. A&C Care has been there for us 24/7 when we needed them. The caregivers are well-trained and genuinely caring.',
    rating: 5
  },
  {
    name: 'David Rodriguez',
    role: 'Son of Client',
    avatar: '/7.png',
    content: 'The light housekeeping and meal preparation services have made my father&apos;s home much more comfortable. A&C Care goes above and beyond to ensure quality care.',
    rating: 5
  }
]

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what families are saying about 
            their experience with A&C Care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-blue-600 mr-2" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Overall Rating */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
                ))}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                5.0 Average Rating
              </h3>
              <p className="text-gray-600">
                Based on hundreds of satisfied families
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
