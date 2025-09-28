'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/supabase-auth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { PatientLayout } from '@/components/patient/PatientLayout';
import { 
  Search,
  Star,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Filter,
  Heart,
} from 'lucide-react';

interface Caregiver {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  specialties: string[];
  rating: number;
  experience_years: number;
  location: string;
  bio: string;
  availability: string;
}

export default function PatientCaregivers() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'PATIENT') {
      router.push('/auth/login');
      return;
    }
    
    fetchCaregivers();
  }, [user, router]);

  const fetchCaregivers = async () => {
    try {
      setIsLoading(true);
      // Mock data for now
      const mockCaregivers: Caregiver[] = [
        {
          id: '1',
          first_name: 'Sarah',
          last_name: 'Johnson',
          phone: '+1 (555) 123-4567',
          email: 'sarah.johnson@example.com',
          specialties: ['Personal Care', 'Medication Management'],
          rating: 4.8,
          experience_years: 5,
          location: 'Downtown',
          bio: 'Experienced caregiver with 5 years of experience in personal care and medication management.',
          availability: 'Available'
        },
        {
          id: '2',
          first_name: 'Michael',
          last_name: 'Brown',
          phone: '+1 (555) 234-5678',
          email: 'michael.brown@example.com',
          specialties: ['Companionship', 'Meal Preparation'],
          rating: 4.9,
          experience_years: 8,
          location: 'Midtown',
          bio: 'Compassionate caregiver specializing in companionship and meal preparation.',
          availability: 'Available'
        },
        {
          id: '3',
          first_name: 'Emily',
          last_name: 'Davis',
          phone: '+1 (555) 345-6789',
          email: 'emily.davis@example.com',
          specialties: ['Mobility Support', 'Light Housekeeping'],
          rating: 4.7,
          experience_years: 3,
          location: 'Uptown',
          bio: 'Dedicated caregiver with expertise in mobility support and light housekeeping.',
          availability: 'Busy'
        }
      ];
      setCaregivers(mockCaregivers);
    } catch (error) {
      console.error('Error fetching caregivers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCaregivers = caregivers.filter(caregiver =>
    caregiver.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caregiver.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caregiver.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading caregivers...</p>
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
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">Find Caregivers</h1>
            <p className="text-primary/80">Browse available caregivers in your area</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filters */}
          <div className="mb-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search caregivers by name or specialty..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Caregivers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCaregivers.map((caregiver) => (
              <Card key={caregiver.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{caregiver.first_name} {caregiver.last_name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {caregiver.location}
                      </CardDescription>
                    </div>
                    <Badge variant={caregiver.availability === 'Available' ? 'default' : 'secondary'}>
                      {caregiver.availability}
                    </Badge>
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
                            className={`h-4 w-4 ${
                              i < Math.floor(caregiver.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {caregiver.rating} ({caregiver.experience_years} years experience)
                      </span>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-gray-600 line-clamp-3">{caregiver.bio}</p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2">
                      {caregiver.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1 bg-gradient-primary hover:shadow-colorful-lg">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCaregivers.length === 0 && (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No caregivers found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </PatientLayout>
  );
}

