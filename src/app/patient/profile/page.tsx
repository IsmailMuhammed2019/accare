'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/supabase-auth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PatientLayout } from '@/components/patient/PatientLayout';
import { 
  User,
  Save,
  Edit,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Heart,
} from 'lucide-react';
import { patientApi } from '@/lib/api-supabase';

interface PatientProfile {
  id: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContact: string;
  emergencyPhone: string;
  medicalHistory?: string | undefined;
  allergies?: string | undefined;
  medications?: string | undefined;
  mobilityLevel?: string | undefined;
  careNeeds?: string | undefined;
  insuranceInfo?: string | undefined;
}

export default function PatientProfile() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<PatientProfile>>({});

  useEffect(() => {
    if (!user || user.role !== 'PATIENT') {
      router.push('/auth/login');
      return;
    }
    
    fetchProfile();
  }, [user, router]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      
      if (!user?.id) return;
      
      try {
        const patientProfile = await patientApi.getProfile(user.id);
        const transformedProfile = patientProfile ? {
          id: patientProfile.id,
          dateOfBirth: patientProfile.date_of_birth || '',
          gender: patientProfile.gender || '',
          address: patientProfile.address || '',
          city: patientProfile.city || '',
          state: patientProfile.state || '',
          zipCode: patientProfile.zip_code || '',
          emergencyContact: patientProfile.emergency_contact_name || '',
          emergencyPhone: patientProfile.emergency_contact_phone || '',
          medicalHistory: patientProfile.medical_history || undefined,
          allergies: patientProfile.allergies || undefined,
          medications: patientProfile.current_medications || undefined,
          mobilityLevel: patientProfile.mobility_level || undefined,
          careNeeds: Array.isArray(patientProfile.care_needs) ? patientProfile.care_needs.join(', ') : patientProfile.care_needs || undefined,
          insuranceInfo: patientProfile.insurance_info || undefined
        } : null;
        setProfile(transformedProfile);
        setFormData(transformedProfile || {});
      } catch {
        console.log('No profile found yet');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof PatientProfile, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Here you would typically save the profile data
      console.log('Saving profile:', formData);
      setIsEditing(false);
      // You could add a success toast here
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
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
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">My Profile</h1>
            <p className="text-primary/80">Manage your personal information and care preferences</p>
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
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Your basic personal details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={user?.first_name || ''}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={user?.last_name || ''}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={isEditing ? formData.dateOfBirth || '' : profile?.dateOfBirth || ''}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Input
                    id="gender"
                    value={isEditing ? formData.gender || '' : profile?.gender || ''}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Male, Female, Other"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Your address and emergency contacts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={isEditing ? formData.address || '' : profile?.address || ''}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Street address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={isEditing ? formData.city || '' : profile?.city || ''}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={isEditing ? formData.state || '' : profile?.state || ''}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={isEditing ? formData.zipCode || '' : profile?.zipCode || ''}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                  <Input
                    id="emergencyContact"
                    value={isEditing ? formData.emergencyContact || '' : profile?.emergencyContact || ''}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                  <Input
                    id="emergencyPhone"
                    value={isEditing ? formData.emergencyPhone || '' : profile?.emergencyPhone || ''}
                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Health Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Health Information
                </CardTitle>
                <CardDescription>
                  Important health details for your caregivers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="medicalHistory">Medical History</Label>
                  <Textarea
                    id="medicalHistory"
                    value={isEditing ? formData.medicalHistory || '' : profile?.medicalHistory || ''}
                    onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Describe any relevant medical history..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="allergies">Allergies</Label>
                  <Textarea
                    id="allergies"
                    value={isEditing ? formData.allergies || '' : profile?.allergies || ''}
                    onChange={(e) => handleInputChange('allergies', e.target.value)}
                    disabled={!isEditing}
                    placeholder="List any allergies..."
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="medications">Current Medications</Label>
                  <Textarea
                    id="medications"
                    value={isEditing ? formData.medications || '' : profile?.medications || ''}
                    onChange={(e) => handleInputChange('medications', e.target.value)}
                    disabled={!isEditing}
                    placeholder="List current medications..."
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="careNeeds">Care Needs</Label>
                  <Textarea
                    id="careNeeds"
                    value={isEditing ? formData.careNeeds || '' : profile?.careNeeds || ''}
                    onChange={(e) => handleInputChange('careNeeds', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Describe your care needs..."
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="insuranceInfo">Insurance Information</Label>
                  <Textarea
                    id="insuranceInfo"
                    value={isEditing ? formData.insuranceInfo || '' : profile?.insuranceInfo || ''}
                    onChange={(e) => handleInputChange('insuranceInfo', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Insurance provider and policy details..."
                    rows={2}
                  />
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
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
    </PatientLayout>
  );
}

