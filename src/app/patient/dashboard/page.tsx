'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/store/supabase-auth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PatientLayout } from '@/components/patient/PatientLayout';
import { 
  Calendar, 
  Clock, 
  User, 
  Plus,
  Phone,
} from 'lucide-react';
import { appointmentApi, patientApi } from '@/lib/api-supabase';

interface Appointment {
  id: string;
  serviceType: string;
  startTime: string;
  endTime: string;
  status: string;
  caregiver: {
    first_name: string;
    last_name: string;
    phone: string;
  };
  notes?: string;
}

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

export default function PatientDashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      
      if (!user?.id) return;
      
      // Fetch appointments
      const appointments = await appointmentApi.getUserAppointments(user.id, 'PATIENT');
      // Transform the data to match the interface
      const transformedAppointments = appointments.map(apt => ({
        id: apt.id,
        serviceType: apt.service_type,
        startTime: apt.start_time,
        endTime: apt.end_time,
        status: apt.status,
        caregiver: { first_name: '', last_name: '', phone: '' }, // Default empty caregiver
        notes: apt.notes || undefined
      }));
      setAppointments(transformedAppointments);
      
      // Fetch patient profile
      try {
        const patientProfile = await patientApi.getProfile(user.id);
        // Transform the data to match the interface
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
      } catch {
        console.log('No profile found yet');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user || user.role !== 'PATIENT') {
      router.push('/auth/login');
      return;
    }
    
    fetchDashboardData();
  }, [user, router, fetchDashboardData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
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
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">Dashboard</h1>
            <p className="text-primary/80">Welcome back, {user?.first_name}</p>
          </div>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-info-50 to-info-100 dark:from-info-900/20 dark:to-info-800/20 border-info-200 dark:border-info-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-info-700 dark:text-info-300">Upcoming Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-info-600 dark:text-info-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-info-600 dark:text-info-400">
                {appointments.filter(apt => apt.status === 'SCHEDULED').length}
              </div>
              <p className="text-xs text-info-600/70 dark:text-info-400/70">
                Scheduled appointments
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 border-success-200 dark:border-success-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-success-700 dark:text-success-300">Completed Sessions</CardTitle>
              <Clock className="h-4 w-4 text-success-600 dark:text-success-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success-600 dark:text-success-400">
                {appointments.filter(apt => apt.status === 'COMPLETED').length}
              </div>
              <p className="text-xs text-success-600/70 dark:text-success-400/70">
                Total completed
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20 border-warning-200 dark:border-warning-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-warning-700 dark:text-warning-300">Profile Status</CardTitle>
              <User className="h-4 w-4 text-warning-600 dark:text-warning-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning-600 dark:text-warning-400">
                {profile ? 'Complete' : 'Incomplete'}
              </div>
              <p className="text-xs text-warning-600/70 dark:text-warning-400/70">
                {profile ? 'Profile is complete' : 'Complete your profile'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="appointments">My Appointments</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="caregivers">Find Caregivers</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>My Appointments</CardTitle>
                    <CardDescription>
                      Manage your care appointments
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
                      <p className="text-gray-600 mb-4">Book your first appointment to get started</p>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Book Appointment
                      </Button>
                    </div>
                  ) : (
                    appointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{appointment.serviceType.replace('_', ' ')}</h3>
                            <p className="text-sm text-gray-600">
                              {formatDate(appointment.startTime)} at {formatTime(appointment.startTime)}
                            </p>
                            <p className="text-sm text-gray-600">
                              with {appointment.caregiver?.first_name} {appointment.caregiver?.last_name}
                            </p>
                            {appointment.notes && (
                              <p className="text-sm text-gray-500 mt-1">{appointment.notes}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>
                  Manage your personal information and care preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                {profile ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">Personal Information</h3>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Date of Birth:</span> {profile.dateOfBirth}</p>
                          <p><span className="font-medium">Gender:</span> {profile.gender}</p>
                          <p><span className="font-medium">Address:</span> {profile.address}</p>
                          <p><span className="font-medium">City:</span> {profile.city}, {profile.state} {profile.zipCode}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Emergency Contact</h3>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Name:</span> {profile.emergencyContact}</p>
                          <p><span className="font-medium">Phone:</span> {profile.emergencyPhone}</p>
                        </div>
                      </div>
                    </div>
                    
                    {profile.medicalHistory && (
                      <div>
                        <h3 className="font-medium mb-2">Medical History</h3>
                        <p className="text-sm text-gray-600">{profile.medicalHistory}</p>
                      </div>
                    )}
                    
                    {profile.allergies && (
                      <div>
                        <h3 className="font-medium mb-2">Allergies</h3>
                        <p className="text-sm text-gray-600">{profile.allergies}</p>
                      </div>
                    )}
                    
                    {profile.medications && (
                      <div>
                        <h3 className="font-medium mb-2">Current Medications</h3>
                        <p className="text-sm text-gray-600">{profile.medications}</p>
                      </div>
                    )}
                    
                    <Button>Edit Profile</Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Complete your profile</h3>
                    <p className="text-gray-600 mb-4">Add your personal information to get better care recommendations</p>
                    <Button>Complete Profile</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="caregivers">
            <Card>
              <CardHeader>
                <CardTitle>Find Caregivers</CardTitle>
                <CardDescription>
                  Browse available caregivers in your area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Caregiver search coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>
                  Communicate with your caregivers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Messages coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      </div>
    </PatientLayout>
  );
}
