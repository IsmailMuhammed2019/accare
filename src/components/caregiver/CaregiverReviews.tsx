'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import api from '@/lib/api';

interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  patient: {
    user: {
      firstName: string;
      lastName: string;
      avatar?: string;
    };
  };
}

interface ReviewsData {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export default function CaregiverReviews() {
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      // Get caregiver profile first
      const profileResponse = await api.get('/caregivers/my-profile');
      const caregiverId = profileResponse.data.id;
      
      // Get reviews for this caregiver
      const reviewsResponse = await api.get(`/reviews/caregiver/${caregiverId}`);
      setReviewsData(reviewsResponse.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
          <CardDescription>Patient feedback and ratings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="text-sm text-muted-foreground">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Review Summary</CardTitle>
          <CardDescription>Your overall rating and feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-4xl font-bold">
                {reviewsData?.averageRating.toFixed(1) || '0.0'}
              </div>
              <div className="flex items-center justify-center space-x-1">
                {renderStars(Math.round(reviewsData?.averageRating || 0))}
              </div>
              <div className="text-sm text-muted-foreground">
                {reviewsData?.totalReviews || 0} reviews
              </div>
            </div>
            <div className="flex-1">
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = reviewsData?.reviews.filter(r => r.rating === rating).length || 0;
                  const percentage = reviewsData?.totalReviews 
                    ? (count / reviewsData.totalReviews) * 100 
                    : 0;
                  
                  return (
                    <div key={rating} className="flex items-center space-x-2">
                      <span className="text-sm w-4">{rating}</span>
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
          <CardDescription>Latest feedback from patients</CardDescription>
        </CardHeader>
        <CardContent>
          {reviewsData?.reviews.length === 0 ? (
            <div className="text-center py-8">
              <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No reviews yet</h3>
              <p className="text-muted-foreground">
                You haven't received any reviews from patients yet.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviewsData?.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.patient.user.avatar} />
                      <AvatarFallback>
                        {review.patient.user.firstName[0]}{review.patient.user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">
                            {review.patient.user.firstName} {review.patient.user.lastName}
                          </h4>
                          <div className="flex items-center space-x-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      {review.comment && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          {review.comment}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
