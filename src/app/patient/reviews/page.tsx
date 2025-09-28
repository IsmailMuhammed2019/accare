'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/supabase-auth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PatientLayout } from '@/components/patient/PatientLayout';
import { 
  Star,
  MessageSquare,
  Calendar,
  User,
  ThumbsUp,
} from 'lucide-react';

interface Review {
  id: string;
  caregiverName: string;
  rating: number;
  comment: string;
  date: string;
  serviceType: string;
}

export default function PatientReviews() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'PATIENT') {
      router.push('/auth/login');
      return;
    }
    
    fetchReviews();
  }, [user, router]);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      // Mock data for now
      const mockReviews: Review[] = [
        {
          id: '1',
          caregiverName: 'Sarah Johnson',
          rating: 5,
          comment: 'Sarah was excellent! Very professional and caring. She helped me with my medication and was very patient.',
          date: '2024-01-15',
          serviceType: 'Personal Care'
        },
        {
          id: '2',
          caregiverName: 'Michael Brown',
          rating: 4,
          comment: 'Great companion. We had wonderful conversations and he helped me with meal preparation.',
          date: '2024-01-10',
          serviceType: 'Companionship'
        },
        {
          id: '3',
          caregiverName: 'Emily Davis',
          rating: 5,
          comment: 'Emily was fantastic with mobility support. Very knowledgeable and made me feel safe.',
          date: '2024-01-05',
          serviceType: 'Mobility Support'
        }
      ];
      setReviews(mockReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <PatientLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">My Reviews</h1>
            <p className="text-primary/80">Reviews you've left for caregivers</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {reviews.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                <p className="text-gray-600 mb-4">Leave reviews for caregivers after your appointments</p>
                <Button className="bg-gradient-primary hover:shadow-colorful-lg">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{review.caregiverName}</CardTitle>
                          <CardDescription className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(review.date)}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">{review.serviceType}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Rating */}
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {review.rating} out of 5 stars
                        </span>
                      </div>

                      {/* Comment */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700">{review.comment}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Helpful
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Reply
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm">
                          Edit Review
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </PatientLayout>
  );
}

