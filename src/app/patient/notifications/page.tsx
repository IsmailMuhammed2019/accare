'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/supabase-auth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { PatientLayout } from '@/components/patient/PatientLayout';
import { 
  Bell,
  Calendar,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Settings,
  Trash2,
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'message' | 'reminder' | 'system';
  isRead: boolean;
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
}

export default function PatientNotifications() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    appointmentReminders: true,
    messageAlerts: true,
    systemUpdates: true
  });

  useEffect(() => {
    if (!user || user.role !== 'PATIENT') {
      router.push('/auth/login');
      return;
    }
    
    fetchNotifications();
  }, [user, router]);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      // Mock data for now
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'Appointment Reminder',
          message: 'You have an appointment with Sarah Johnson tomorrow at 2:00 PM',
          type: 'appointment',
          isRead: false,
          timestamp: '2024-01-15T10:00:00Z',
          priority: 'high'
        },
        {
          id: '2',
          title: 'New Message',
          message: 'You received a message from Michael Brown about your care plan',
          type: 'message',
          isRead: false,
          timestamp: '2024-01-15T09:30:00Z',
          priority: 'medium'
        },
        {
          id: '3',
          title: 'Medication Reminder',
          message: 'Don\'t forget to take your morning medication',
          type: 'reminder',
          isRead: true,
          timestamp: '2024-01-15T08:00:00Z',
          priority: 'high'
        },
        {
          id: '4',
          title: 'System Update',
          message: 'Your profile has been updated successfully',
          type: 'system',
          isRead: true,
          timestamp: '2024-01-14T16:45:00Z',
          priority: 'low'
        }
      ];
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="h-5 w-5" />;
      case 'message':
        return <MessageSquare className="h-5 w-5" />;
      case 'reminder':
        return <AlertCircle className="h-5 w-5" />;
      case 'system':
        return <Settings className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'appointment':
        return 'text-blue-600 bg-blue-100';
      case 'message':
        return 'text-green-600 bg-green-100';
      case 'reminder':
        return 'text-yellow-600 bg-yellow-100';
      case 'system':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <PatientLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">Notifications</h1>
            <p className="text-primary/80">Manage your notifications and alerts</p>
          </div>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline">
                <MarkAsRead className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
            )}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Notifications List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Notifications</CardTitle>
                      <CardDescription>
                        {unreadCount} unread notifications
                      </CardDescription>
                    </div>
                    {unreadCount > 0 && (
                      <Badge variant="default" className="bg-red-500">
                        {unreadCount}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {notifications.length === 0 ? (
                      <div className="text-center py-8">
                        <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                        <p className="text-gray-600">You're all caught up!</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b hover:bg-gray-50 transition-colors ${
                            !notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                              {getTypeIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium text-sm">{notification.title}</h3>
                                <div className="flex items-center space-x-2">
                                  <Badge className={getPriorityColor(notification.priority)}>
                                    {notification.priority}
                                  </Badge>
                                  <div className="flex items-center space-x-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => markAsRead(notification.id)}
                                      className="h-6 w-6 p-0"
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => deleteNotification(notification.id)}
                                      className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatDate(notification.timestamp)} at {formatTime(notification.timestamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notification Settings */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Customize how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email">Email Notifications</Label>
                      <Switch
                        id="email"
                        checked={notificationSettings.email}
                        onCheckedChange={(checked) => 
                          setNotificationSettings(prev => ({ ...prev, email: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="push">Push Notifications</Label>
                      <Switch
                        id="push"
                        checked={notificationSettings.push}
                        onCheckedChange={(checked) => 
                          setNotificationSettings(prev => ({ ...prev, push: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms">SMS Notifications</Label>
                      <Switch
                        id="sms"
                        checked={notificationSettings.sms}
                        onCheckedChange={(checked) => 
                          setNotificationSettings(prev => ({ ...prev, sms: checked }))
                        }
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-sm text-gray-900 mb-3">Notification Types</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="appointmentReminders">Appointment Reminders</Label>
                        <Switch
                          id="appointmentReminders"
                          checked={notificationSettings.appointmentReminders}
                          onCheckedChange={(checked) => 
                            setNotificationSettings(prev => ({ ...prev, appointmentReminders: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="messageAlerts">Message Alerts</Label>
                        <Switch
                          id="messageAlerts"
                          checked={notificationSettings.messageAlerts}
                          onCheckedChange={(checked) => 
                            setNotificationSettings(prev => ({ ...prev, messageAlerts: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="systemUpdates">System Updates</Label>
                        <Switch
                          id="systemUpdates"
                          checked={notificationSettings.systemUpdates}
                          onCheckedChange={(checked) => 
                            setNotificationSettings(prev => ({ ...prev, systemUpdates: checked }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-primary hover:shadow-colorful-lg">
                    Save Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}

