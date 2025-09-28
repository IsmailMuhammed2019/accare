'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/supabase-auth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CaregiverLayout } from '@/components/caregiver/CaregiverLayout';
import { 
  Clock,
  Calendar,
  Save,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface AvailabilitySettings {
  timezone: string;
  advanceBookingDays: number;
  maxAppointmentsPerDay: number;
  breakBetweenAppointments: number;
}

export default function CaregiverAvailability() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [settings, setSettings] = useState<AvailabilitySettings>({
    timezone: 'America/New_York',
    advanceBookingDays: 30,
    maxAppointmentsPerDay: 8,
    breakBetweenAppointments: 30
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  useEffect(() => {
    if (!user || user.role !== 'CAREGIVER') {
      router.push('/auth/login');
      return;
    }
    
    fetchAvailability();
  }, [user, router]);

  const fetchAvailability = async () => {
    try {
      setIsLoading(true);
      // Mock data for now
      const mockTimeSlots: TimeSlot[] = [
        { id: '1', day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { id: '2', day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { id: '3', day: 'Wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { id: '4', day: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { id: '5', day: 'Friday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { id: '6', day: 'Saturday', startTime: '10:00', endTime: '14:00', isAvailable: true },
        { id: '7', day: 'Sunday', startTime: '', endTime: '', isAvailable: false },
      ];
      setTimeSlots(mockTimeSlots);
    } catch (error) {
      console.error('Error fetching availability:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeSlotChange = (id: string, field: keyof TimeSlot, value: string | boolean) => {
    setTimeSlots(prev => 
      prev.map(slot => 
        slot.id === id ? { ...slot, [field]: value } : slot
      )
    );
  };

  const addTimeSlot = (day: string) => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      day,
      startTime: '09:00',
      endTime: '17:00',
      isAvailable: true
    };
    setTimeSlots(prev => [...prev, newSlot]);
  };

  const removeTimeSlot = (id: string) => {
    setTimeSlots(prev => prev.filter(slot => slot.id !== id));
  };

  const handleSave = async () => {
    try {
      // Here you would typically save the availability data
      console.log('Saving availability:', { timeSlots, settings });
      setIsEditing(false);
      // You could add a success toast here
    } catch (error) {
      console.error('Error saving availability:', error);
    }
  };

  const getDaySlots = (day: string) => {
    return timeSlots.filter(slot => slot.day === day);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading availability...</p>
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
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">My Availability</h1>
            <p className="text-primary/80">Set your working hours and availability</p>
          </div>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
            className={isEditing ? "" : "bg-gradient-primary hover:shadow-colorful-lg"}
          >
            {isEditing ? 'Cancel' : 'Edit Availability'}
          </Button>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Weekly Schedule */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Weekly Schedule
                  </CardTitle>
                  <CardDescription>
                    Set your availability for each day of the week
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {daysOfWeek.map((day) => {
                    const daySlots = getDaySlots(day);
                    return (
                      <div key={day} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">{day}</h3>
                          {isEditing && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => addTimeSlot(day)}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add Slot
                            </Button>
                          )}
                        </div>
                        
                        {daySlots.length === 0 ? (
                          <div className="text-center py-4 text-gray-500">
                            No availability set
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {daySlots.map((slot) => (
                              <div key={slot.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    checked={slot.isAvailable}
                                    onChange={(e) => handleTimeSlotChange(slot.id, 'isAvailable', e.target.checked)}
                                    disabled={!isEditing}
                                    className="rounded"
                                  />
                                  <span className="text-sm font-medium">Available</span>
                                </div>
                                
                                {slot.isAvailable && (
                                  <>
                                    <div className="flex items-center space-x-2">
                                      <label className="text-sm">From:</label>
                                      <input
                                        type="time"
                                        value={slot.startTime}
                                        onChange={(e) => handleTimeSlotChange(slot.id, 'startTime', e.target.value)}
                                        disabled={!isEditing}
                                        className="px-2 py-1 border rounded text-sm"
                                      />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <label className="text-sm">To:</label>
                                      <input
                                        type="time"
                                        value={slot.endTime}
                                        onChange={(e) => handleTimeSlotChange(slot.id, 'endTime', e.target.value)}
                                        disabled={!isEditing}
                                        className="px-2 py-1 border rounded text-sm"
                                      />
                                    </div>
                                  </>
                                )}
                                
                                {isEditing && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => removeTimeSlot(slot.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Settings */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Settings
                  </CardTitle>
                  <CardDescription>
                    Configure your availability preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Timezone</label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Advance Booking (days)</label>
                    <input
                      type="number"
                      value={settings.advanceBookingDays}
                      onChange={(e) => setSettings(prev => ({ ...prev, advanceBookingDays: parseInt(e.target.value) || 0 }))}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Max Appointments per Day</label>
                    <input
                      type="number"
                      value={settings.maxAppointmentsPerDay}
                      onChange={(e) => setSettings(prev => ({ ...prev, maxAppointmentsPerDay: parseInt(e.target.value) || 0 }))}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Break Between Appointments (minutes)</label>
                    <input
                      type="number"
                      value={settings.breakBetweenAppointments}
                      onChange={(e) => setSettings(prev => ({ ...prev, breakBetweenAppointments: parseInt(e.target.value) || 0 }))}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Availability Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Available Days</span>
                      <Badge variant="outline">
                        {timeSlots.filter(slot => slot.isAvailable).length} days
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Hours</span>
                      <Badge variant="outline">
                        {timeSlots
                          .filter(slot => slot.isAvailable)
                          .reduce((total, slot) => {
                            const start = new Date(`2000-01-01T${slot.startTime}`);
                            const end = new Date(`2000-01-01T${slot.endTime}`);
                            return total + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
                          }, 0).toFixed(1)}h
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-4 mt-6">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-gradient-primary hover:shadow-colorful-lg">
                <Save className="h-4 w-4 mr-2" />
                Save Availability
              </Button>
            </div>
          )}
        </div>
      </div>
    </CaregiverLayout>
  );
}
