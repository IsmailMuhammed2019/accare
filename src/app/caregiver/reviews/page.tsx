'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/supabase-auth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CaregiverLayout } from '@/components/caregiver/CaregiverLayout';
import { 
  Star,
  MessageSquare,
  Calendar,
  User,
  ThumbsUp,
  Filter,
  TrendingUp,
} from 'lucide-react';

interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
  serviceType: string;
  helpful: number;
}

export default function CaregiverReviews() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!user || user.role !== 'CAREGIVER') {
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
          patientName: 'John Smith',
          rating: 5,
          comment: 'Sarah was absolutely wonderful! She was very professional, caring, and made me feel comfortable throughout the entire visit. Highly recommended!',
          date: '2024-01-15',
          serviceType: 'Personal Care',
          helpful: 12
        },
        {
          id: '2',
          patientName: 'Mary Johnson',
          rating: 5,
          comment: 'Excellent caregiver. Very knowledgeable and patient. She helped me with my medication management and was always on time.',
          date: '2024-01-12',
          serviceType: 'Medication Management',
          helpful: 8
        },
        {
          id: '3',
          patientName: 'Robert Brown',
          rating: 4,
          comment: 'Good care provided. Very professional and friendly. Would definitely use her services again.',
          date: '2024-01-10',
          serviceType: 'Companionship',
          helpful: 5
        },
        {
          id: '4',
          patientName: 'Linda Davis',
          rating: 5,
          comment: 'Outstanding caregiver! She went above and beyond to ensure my comfort and safety. Very reliable and trustworthy.',
          date: '2024-01-08',
          serviceType: 'Mobility Support',
          helpful: 15
        },
        {
          id: '5',
          patientName: 'James Wilson',
          rating: 4,
          comment: 'Professional and caring. She helped me with meal preparation and light housekeeping. Very satisfied with the service.',
          date: '2024-01-05',
          serviceType: 'Meal Preparation',
          helpful: 7
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

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating.toString() === filter);

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

  const ratingDistribution = getRatingDistribution();

  return (
    <CaregiverLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">My Reviews</h1>
            <p className="text-primary/80">View feedback from your patients</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Rating Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Star className="h-8 w-8 text-yellow-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-yellow-600">Average Rating</p>
                    <p className="text-3xl font-bold text-yellow-600">{getAverageRating()}</p>
                    <p className="text-xs text-yellow-600/70">out of 5 stars</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-blue-600">Total Reviews</p>
                    <p className="text-3xl font-bold text-blue-600">{reviews.length}</p>
                    <p className="text-xs text-blue-600/70">patient reviews</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-600">5-Star Reviews</p>
                    <p className="text-3xl font-bold text-green-600">{ratingDistribution[5]}</p>
                    <p className="text-xs text-green-600/70">excellent ratings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Rating Distribution */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Rating Distribution</CardTitle>
                <CardDescription>
                  Breakdown of your ratings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <div className="flex items-center w-8">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium">{rating}</span>
                      </div>
                      <div className="flex-1 mx-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-primary h-2 rounded-full" 
                            style={{ 
                              width: `${reviews.length > 0 ? (ratingDistribution[rating as keyof typeof ratingDistribution] / reviews.length) * 100 : 0}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {ratingDistribution[rating as keyof typeof ratingDistribution]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews List */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Patient Reviews</CardTitle>
                      <CardDescription>
                        {filteredReviews.length} review{filteredReviews.length !== 1 ? 's' : ''}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Filter className="h-4 w-4 text-gray-500" />
                      <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Ratings</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {filteredReviews.length === 0 ? (
                      <div className="text-center py-8">
                        <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                        <p className="text-gray-600">Reviews from patients will appear here</p>
                      </div>
                    ) : (
                      filteredReviews.map((review) => (
                        <div key={review.id} className="p-4 border-b hover:bg-gray-50 transition-colors">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium text-sm">{review.patientName}</h3>
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline">{review.serviceType}</Badge>
                                  <span className="text-xs text-gray-500">{formatDate(review.date)}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center mt-1">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
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

                              <p className="text-sm text-gray-700 mt-2">{review.comment}</p>

                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center space-x-4">
                                  <Button variant="ghost" size="sm" className="text-gray-600">
                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                    Helpful ({review.helpful})
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-gray-600">
                                    <MessageSquare className="h-4 w-4 mr-1" />
                                    Reply
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </CaregiverLayout>
  );
}
