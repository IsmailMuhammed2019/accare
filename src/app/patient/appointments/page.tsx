'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/supabase-auth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PatientLayout } from '@/components/patient/PatientLayout';
import { 
  Calendar, 
  Clock, 
  Plus,
  Phone,
  MapPin,
  User,
} from 'lucide-react';
import { appointmentApi } from '@/lib/api-supabase';

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

export default function PatientAppointments() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'PATIENT') {
      router.push('/auth/login');
      return;
    }
    
    fetchAppointments();
  }, [user, router]);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      
      if (!user?.id) return;
      
      const appointments = await appointmentApi.getUserAppointments(user.id, 'PATIENT');
      const transformedAppointments = appointments.map(apt => ({
        id: apt.id,
        serviceType: apt.service_type,
        startTime: apt.start_time,
        endTime: apt.end_time,
        status: apt.status,
        caregiver: { first_name: '', last_name: '', phone: '' },
        notes: apt.notes || undefined
      }));
      setAppointments(transformedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setIsLoading(false);
    }
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
          <p className="mt-4 text-gray-600">Loading appointments...</p>
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
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">My Appointments</h1>
            <p className="text-primary/80">Manage your care appointments</p>
          </div>
          <Button className="bg-gradient-primary hover:shadow-colorful-lg">
            <Plus className="h-4 w-4 mr-2" />
            Book New Appointment
          </Button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Appointment History</CardTitle>
              <CardDescription>
                View and manage all your appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
                    <p className="text-gray-600 mb-4">Book your first appointment to get started</p>
                    <Button className="bg-gradient-primary hover:shadow-colorful-lg">
                      <Plus className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Button>
                  </div>
                ) : (
                  appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{appointment.serviceType.replace('_', ' ')}</h3>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatDate(appointment.startTime)} at {formatTime(appointment.startTime)}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <User className="h-4 w-4 mr-1" />
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
        </div>
      </div>
    </PatientLayout>
  );
}

