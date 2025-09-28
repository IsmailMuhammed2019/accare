'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/supabase-auth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CaregiverLayout } from '@/components/caregiver/CaregiverLayout';
import { 
  MapPin,
  Save,
  Edit,
  Navigation,
  Home,
  Building,
  Clock,
} from 'lucide-react';

interface LocationData {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
  serviceRadius: number;
  travelMode: 'driving' | 'walking' | 'public_transport';
  maxTravelTime: number;
}

export default function CaregiverLocation() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [locationData, setLocationData] = useState<LocationData>({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    serviceRadius: 25,
    travelMode: 'driving',
    maxTravelTime: 30
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'CAREGIVER') {
      router.push('/auth/login');
      return;
    }
    
    fetchLocationData();
  }, [user, router]);

  const fetchLocationData = async () => {
    try {
      setIsLoading(true);
      // Mock data for now - in real app, fetch from API
      const mockData: LocationData = {
        address: '456 Caregiver Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10002',
        latitude: 40.7589,
        longitude: -73.9851,
        serviceRadius: 25,
        travelMode: 'driving',
        maxTravelTime: 30
      };
      setLocationData(mockData);
    } catch (error) {
      console.error('Error fetching location data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof LocationData, value: string | number) => {
    setLocationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Here you would typically save the location data
      console.log('Saving location data:', locationData);
      setIsEditing(false);
      // You could add a success toast here
    } catch (error) {
      console.error('Error saving location data:', error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading location...</p>
        </div>
      </div>
    );
  }

  return (
    <CaregiverLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">My Location</h1>
            <p className="text-primary/80">Manage your service area and location preferences</p>
          </div>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
            className={isEditing ? "" : "bg-gradient-primary hover:shadow-colorful-lg"}
          >
            {isEditing ? (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Cancel Edit
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit Location
              </>
            )}
          </Button>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home className="h-5 w-5 mr-2" />
                  Address Information
                </CardTitle>
                <CardDescription>
                  Your primary address for care services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    value={locationData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Enter your street address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={locationData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      disabled={!isEditing}
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={locationData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      disabled={!isEditing}
                      placeholder="State"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={locationData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    disabled={!isEditing}
                    placeholder="ZIP Code"
                  />
                </div>

                <div className="pt-4">
                  <Button 
                    onClick={getCurrentLocation}
                    variant="outline"
                    className="w-full"
                    disabled={!isEditing}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Use Current Location
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Service Area Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Navigation className="h-5 w-5 mr-2" />
                  Service Area Settings
                </CardTitle>
                <CardDescription>
                  Configure your service area and travel preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="serviceRadius">Service Radius (miles)</Label>
                  <Input
                    id="serviceRadius"
                    type="number"
                    value={locationData.serviceRadius}
                    onChange={(e) => handleInputChange('serviceRadius', parseInt(e.target.value) || 0)}
                    disabled={!isEditing}
                    placeholder="25"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum distance you're willing to travel for appointments
                  </p>
                </div>

                <div>
                  <Label htmlFor="travelMode">Preferred Travel Mode</Label>
                  <select
                    id="travelMode"
                    value={locationData.travelMode}
                    onChange={(e) => handleInputChange('travelMode', e.target.value as 'driving' | 'walking' | 'public_transport')}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="driving">Driving</option>
                    <option value="walking">Walking</option>
                    <option value="public_transport">Public Transport</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="maxTravelTime">Maximum Travel Time (minutes)</Label>
                  <Input
                    id="maxTravelTime"
                    type="number"
                    value={locationData.maxTravelTime}
                    onChange={(e) => handleInputChange('maxTravelTime', parseInt(e.target.value) || 0)}
                    disabled={!isEditing}
                    placeholder="30"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum time you're willing to spend traveling to appointments
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-sm text-gray-900 mb-2">Service Area Info</h4>
                  <p className="text-xs text-gray-600">
                    Your service area is calculated based on your address and service radius. 
                    Patients within this area will be able to book appointments with you.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* GPS Coordinates */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  GPS Coordinates
                </CardTitle>
                <CardDescription>
                  Your precise location coordinates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      type="number"
                      step="any"
                      value={locationData.latitude || ''}
                      onChange={(e) => handleInputChange('latitude', parseFloat(e.target.value) || 0)}
                      disabled={!isEditing}
                      placeholder="40.7128"
                    />
                  </div>
                  <div>
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      type="number"
                      step="any"
                      value={locationData.longitude || ''}
                      onChange={(e) => handleInputChange('longitude', parseFloat(e.target.value) || 0)}
                      disabled={!isEditing}
                      placeholder="-74.0060"
                    />
                  </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <h4 className="font-medium text-sm text-blue-900">Location Privacy</h4>
                      <p className="text-xs text-blue-700">
                        Your exact coordinates are only used for calculating travel distances and are not shared with patients.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-4 mt-6">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-gradient-primary hover:shadow-colorful-lg">
                <Save className="h-4 w-4 mr-2" />
                Save Location
              </Button>
            </div>
          )}
        </div>
      </div>
    </CaregiverLayout>
  );
}
