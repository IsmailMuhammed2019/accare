'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import api from '@/lib/api';

interface Caregiver {
  id: string;
  specializations: string[];
  experience: number;
  hourlyRate?: number;
  bio?: string;
  languages: string[];
  isVerified: boolean;
  user: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  _count: {
    appointments: number;
    reviews: number;
  };
}

export default function PatientCaregivers() {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaregivers();
  }, []);

  const fetchCaregivers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/caregivers?verified=true');
      setCaregivers(response.data.caregivers);
    } catch (error) {
      console.error('Error fetching caregivers:', error);
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
          <CardTitle>Available Caregivers</CardTitle>
          <CardDescription>Browse and select your preferred caregiver</CardDescription>
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
      <Card>
        <CardHeader>
          <CardTitle>Available Caregivers</CardTitle>
          <CardDescription>Browse and select your preferred caregiver</CardDescription>
        </CardHeader>
        <CardContent>
          {caregivers.length === 0 ? (
            <div className="text-center py-8">
              <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No caregivers available</h3>
              <p className="text-muted-foreground">
                There are no verified caregivers available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caregivers.map((caregiver) => (
                <Card key={caregiver.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={caregiver.user.avatar} />
                        <AvatarFallback>
                          {caregiver.user.firstName[0]}{caregiver.user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">
                            {caregiver.user.firstName} {caregiver.user.lastName}
                          </h3>
                          {caregiver.isVerified && (
                            <Badge variant="default">Verified</Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-1 mt-1">
                          {renderStars(4.8)} {/* Mock rating */}
                          <span className="text-sm text-muted-foreground ml-1">(4.8)</span>
                        </div>

                        <div className="mt-2 space-y-1">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {caregiver.experience} years experience
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {caregiver.hourlyRate ? `$${caregiver.hourlyRate}/hr` : 'Rate not set'}
                          </div>
                        </div>

                        {caregiver.bio && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {caregiver.bio}
                          </p>
                        )}

                        <div className="mt-3">
                          <div className="flex flex-wrap gap-1">
                            {caregiver.specializations.slice(0, 3).map((spec, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {spec.replace('_', ' ')}
                              </Badge>
                            ))}
                            {caregiver.specializations.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{caregiver.specializations.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex space-x-2 mt-4">
                          <Button size="sm" className="flex-1">
                            Book Appointment
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
