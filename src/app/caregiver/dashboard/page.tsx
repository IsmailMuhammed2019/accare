'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  User, 
  LogOut,
  Phone,
  DollarSign,
  Award
} from 'lucide-react';
import api from '@/lib/api';

interface Appointment {
  id: string;
  serviceType: string;
  startTime: string;
  endTime: string;
  status: string;
  patient: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  notes?: string;
}

interface CaregiverProfile {
  id: string;
  licenseNumber?: string;
  specializations?: string;
  experience: number;
  hourlyRate: number;
  bio?: string;
  languages?: string;
  availability?: string;
  isVerified: boolean;
  backgroundCheck: boolean;
  cprCertified: boolean;
  firstAidCertified: boolean;
}

export default function CaregiverDashboard() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [profile, setProfile] = useState<CaregiverProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'CAREGIVER') {
      router.push('/auth/login');
      return;
    }
    
    fetchDashboardData();
  }, [user, router]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch appointments
      const appointmentsResponse = await api.get('/appointments');
      setAppointments(appointmentsResponse.data.data || []);
      
      // Fetch caregiver profile
      try {
        const profileResponse = await api.get('/caregivers/me');
        setProfile(profileResponse.data);
      } catch {
        console.log('No profile found yet');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Caregiver Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.firstName}</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today&apos;s Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {appointments.filter(apt => {
                  const today = new Date().toDateString();
                  return new Date(apt.startTime).toDateString() === today && apt.status === 'SCHEDULED';
                }).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Scheduled for today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {appointments.filter(apt => {
                  const weekFromNow = new Date();
                  weekFromNow.setDate(weekFromNow.getDate() + 7);
                  return new Date(apt.startTime) <= weekFromNow && apt.status === 'SCHEDULED';
                }).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Upcoming appointments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {appointments.filter(apt => apt.status === 'COMPLETED').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Total completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hourly Rate</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${profile?.hourlyRate || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Per hour
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="appointments">My Appointments</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
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
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
                      <p className="text-gray-600 mb-4">Complete your profile to start receiving appointment requests</p>
                      <Button>Complete Profile</Button>
                    </div>
                  ) : (
                    appointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{appointment.serviceType.replace('_', ' ')}</h3>
                            <p className="text-sm text-gray-600">
                              {formatDate(appointment.startTime)} at {formatTime(appointment.startTime)}
                            </p>
                            <p className="text-sm text-gray-600">
                              with {appointment.patient.firstName} {appointment.patient.lastName}
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
                          {appointment.status === 'SCHEDULED' && (
                            <Button variant="outline" size="sm">
                              Start
                            </Button>
                          )}
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
                  Manage your professional information and credentials
                </CardDescription>
              </CardHeader>
              <CardContent>
                {profile ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">Professional Information</h3>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Experience:</span> {profile.experience} years</p>
                          <p><span className="font-medium">Hourly Rate:</span> ${profile.hourlyRate}</p>
                          {profile.licenseNumber && (
                            <p><span className="font-medium">License:</span> {profile.licenseNumber}</p>
                          )}
                          {profile.specializations && (
                            <p><span className="font-medium">Specializations:</span> {profile.specializations}</p>
                          )}
                          {profile.languages && (
                            <p><span className="font-medium">Languages:</span> {profile.languages}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Certifications</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant={profile.backgroundCheck ? "default" : "secondary"}>
                              Background Check
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={profile.cprCertified ? "default" : "secondary"}>
                              CPR Certified
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={profile.firstAidCertified ? "default" : "secondary"}>
                              First Aid Certified
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={profile.isVerified ? "default" : "secondary"}>
                              Verified
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {profile.bio && (
                      <div>
                        <h3 className="font-medium mb-2">Bio</h3>
                        <p className="text-sm text-gray-600">{profile.bio}</p>
                      </div>
                    )}
                    
                    <Button>Edit Profile</Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Complete your profile</h3>
                    <p className="text-gray-600 mb-4">Add your professional information to start receiving appointments</p>
                    <Button>Complete Profile</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability">
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
                <CardDescription>
                  Set your working hours and availability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Availability management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>
                  Communicate with your patients
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
  );
}
