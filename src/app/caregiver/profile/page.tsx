'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/supabase-auth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CaregiverLayout } from '@/components/caregiver/CaregiverLayout';
import { 
  User,
  Save,
  Edit,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Heart,
  Award,
  Star,
  Plus,
  X,
} from 'lucide-react';
import { caregiverApi } from '@/lib/api-supabase';

interface CaregiverProfile {
  id: string;
  specialties: string[];
  experience_years: number;
  bio: string;
  location: string;
  availability: string;
  hourly_rate: number;
  certifications: string[];
  languages: string[];
  emergency_contact_name: string;
  emergency_contact_phone: string;
}

export default function CaregiverProfile() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [profile, setProfile] = useState<CaregiverProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<CaregiverProfile>>({});
  const [newSpecialty, setNewSpecialty] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'CAREGIVER') {
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
        const caregiverProfile = await caregiverApi.getProfile(user.id);
        setProfile(caregiverProfile);
        setFormData(caregiverProfile);
      } catch {
        console.log('No profile found yet');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof CaregiverProfile, value: string | number | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSpecialty = () => {
    if (newSpecialty.trim()) {
      const currentSpecialties = formData.specialties || [];
      handleInputChange('specialties', [...currentSpecialties, newSpecialty.trim()]);
      setNewSpecialty('');
    }
  };

  const removeSpecialty = (index: number) => {
    const currentSpecialties = formData.specialties || [];
    handleInputChange('specialties', currentSpecialties.filter((_, i) => i !== index));
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      const currentCertifications = formData.certifications || [];
      handleInputChange('certifications', [...currentCertifications, newCertification.trim()]);
      setNewCertification('');
    }
  };

  const removeCertification = (index: number) => {
    const currentCertifications = formData.certifications || [];
    handleInputChange('certifications', currentCertifications.filter((_, i) => i !== index));
  };

  const addLanguage = () => {
    if (newLanguage.trim()) {
      const currentLanguages = formData.languages || [];
      handleInputChange('languages', [...currentLanguages, newLanguage.trim()]);
      setNewLanguage('');
    }
  };

  const removeLanguage = (index: number) => {
    const currentLanguages = formData.languages || [];
    handleInputChange('languages', currentLanguages.filter((_, i) => i !== index));
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
    <CaregiverLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">My Profile</h1>
            <p className="text-primary/80">Manage your caregiver profile and qualifications</p>
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
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={user?.phone || ''}
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={isEditing ? formData.location || '' : profile?.location || ''}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!isEditing}
                    placeholder="City, State"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Professional Information
                </CardTitle>
                <CardDescription>
                  Your caregiving qualifications and experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={isEditing ? formData.experience_years || '' : profile?.experience_years || ''}
                    onChange={(e) => handleInputChange('experience_years', parseInt(e.target.value) || 0)}
                    disabled={!isEditing}
                    placeholder="5"
                  />
                </div>

                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={isEditing ? formData.hourly_rate || '' : profile?.hourly_rate || ''}
                    onChange={(e) => handleInputChange('hourly_rate', parseFloat(e.target.value) || 0)}
                    disabled={!isEditing}
                    placeholder="25.00"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={isEditing ? formData.bio || '' : profile?.bio || ''}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Tell patients about yourself and your caregiving approach..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Specialties & Qualifications
                </CardTitle>
                <CardDescription>
                  Your areas of expertise and certifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Specialties */}
                <div>
                  <Label>Specialties</Label>
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {(isEditing ? formData.specialties : profile?.specialties)?.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {specialty}
                          {isEditing && (
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => removeSpecialty(index)}
                            />
                          )}
                        </Badge>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Input
                          value={newSpecialty}
                          onChange={(e) => setNewSpecialty(e.target.value)}
                          placeholder="Add specialty..."
                          onKeyPress={(e) => e.key === 'Enter' && addSpecialty()}
                        />
                        <Button onClick={addSpecialty} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <Label>Certifications</Label>
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {(isEditing ? formData.certifications : profile?.certifications)?.map((cert, index) => (
                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                          {cert}
                          {isEditing && (
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => removeCertification(index)}
                            />
                          )}
                        </Badge>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Input
                          value={newCertification}
                          onChange={(e) => setNewCertification(e.target.value)}
                          placeholder="Add certification..."
                          onKeyPress={(e) => e.key === 'Enter' && addCertification()}
                        />
                        <Button onClick={addCertification} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <Label>Languages</Label>
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {(isEditing ? formData.languages : profile?.languages)?.map((language, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {language}
                          {isEditing && (
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => removeLanguage(index)}
                            />
                          )}
                        </Badge>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Input
                          value={newLanguage}
                          onChange={(e) => setNewLanguage(e.target.value)}
                          placeholder="Add language..."
                          onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                        />
                        <Button onClick={addLanguage} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                    <Input
                      id="emergencyContact"
                      value={isEditing ? formData.emergency_contact_name || '' : profile?.emergency_contact_name || ''}
                      onChange={(e) => handleInputChange('emergency_contact_name', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                    <Input
                      id="emergencyPhone"
                      value={isEditing ? formData.emergency_contact_phone || '' : profile?.emergency_contact_phone || ''}
                      onChange={(e) => handleInputChange('emergency_contact_phone', e.target.value)}
                      disabled={!isEditing}
                    />
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
                Save Profile
              </Button>
            </div>
          )}
        </div>
      </div>
    </CaregiverLayout>
  );
}
