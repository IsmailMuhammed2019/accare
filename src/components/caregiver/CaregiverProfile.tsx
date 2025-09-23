'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Save, Edit } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

interface CaregiverProfile {
  id: string;
  licenseNumber?: string;
  specializations: string[];
  experience: number;
  hourlyRate?: number;
  bio?: string;
  languages: string[];
  isVerified: boolean;
  backgroundCheck: boolean;
  cprCertified: boolean;
  firstAidCertified: boolean;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
}

export default function CaregiverProfile() {
  const [profile, setProfile] = useState<CaregiverProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    licenseNumber: '',
    experience: 0,
    hourlyRate: 0,
    bio: '',
    languages: [] as string[],
    backgroundCheck: false,
    cprCertified: false,
    firstAidCertified: false,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get('/caregivers/my-profile');
      setProfile(response.data);
      setFormData({
        licenseNumber: response.data.licenseNumber || '',
        experience: response.data.experience || 0,
        hourlyRate: response.data.hourlyRate || 0,
        bio: response.data.bio || '',
        languages: response.data.languages || [],
        backgroundCheck: response.data.backgroundCheck || false,
        cprCertified: response.data.cprCertified || false,
        firstAidCertified: response.data.firstAidCertified || false,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await api.patch('/caregivers/my-profile', formData);
      await fetchProfile();
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>Manage your caregiver profile</CardDescription>
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>Manage your caregiver profile information</CardDescription>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
            >
              {isEditing ? "Cancel" : <><Edit className="h-4 w-4 mr-2" />Edit</>}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">License Number</Label>
              <Input
                id="licenseNumber"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                disabled={!isEditing}
                placeholder="Enter your license number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
                disabled={!isEditing}
                placeholder="Years of experience"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
              <Input
                id="hourlyRate"
                type="number"
                step="0.01"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: parseFloat(e.target.value) || 0 })}
                disabled={!isEditing}
                placeholder="Hourly rate"
              />
            </div>

            <div className="space-y-2">
              <Label>Verification Status</Label>
              <div className="flex items-center space-x-2">
                {profile?.isVerified ? (
                  <Badge variant="success">Verified</Badge>
                ) : (
                  <Badge variant="warning">Pending Verification</Badge>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biography</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              disabled={!isEditing}
              placeholder="Tell us about yourself and your experience..."
              rows={4}
            />
          </div>

          <div className="space-y-4">
            <Label>Certifications</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="backgroundCheck"
                  checked={formData.backgroundCheck}
                  onChange={(e) => setFormData({ ...formData, backgroundCheck: e.target.checked })}
                  disabled={!isEditing}
                  className="rounded"
                />
                <Label htmlFor="backgroundCheck">Background Check</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="cprCertified"
                  checked={formData.cprCertified}
                  onChange={(e) => setFormData({ ...formData, cprCertified: e.target.checked })}
                  disabled={!isEditing}
                  className="rounded"
                />
                <Label htmlFor="cprCertified">CPR Certified</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="firstAidCertified"
                  checked={formData.firstAidCertified}
                  onChange={(e) => setFormData({ ...formData, firstAidCertified: e.target.checked })}
                  disabled={!isEditing}
                  className="rounded"
                />
                <Label htmlFor="firstAidCertified">First Aid Certified</Label>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setIsEditing(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
