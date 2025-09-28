'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/supabase-auth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  Star, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Activity,
  Clock
} from 'lucide-react';
import { profileApi, appointmentApi } from '@/lib/api-supabase';
import { AdminLayout } from '@/components/admin/AdminLayout';
import AdminUsersTable from '@/components/admin/AdminUsersTable';
import AdminCaregiversTable from '@/components/admin/AdminCaregiversTable';
import AdminPatientsTable from '@/components/admin/AdminPatientsTable';
import AdminAppointmentsTable from '@/components/admin/AdminAppointmentsTable';
import {
  UserGrowthChart,
  AppointmentTrendsChart,
  UserStatusChart,
  RevenueChart,
  ActivityChart,
  TopCaregiversChart
} from '@/components/admin/AdminCharts';

interface DashboardStats {
  totalUsers: number;
  totalCaregivers: number;
  totalPatients: number;
  totalAppointments: number;
  pendingAppointments: number;
  completedAppointments: number;
  pendingVerifications: number;
  activeUsers: number;
  suspendedUsers: number;
  averageRating: number;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalCaregivers: 0,
    totalPatients: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    pendingVerifications: 0,
    activeUsers: 0,
    suspendedUsers: 0,
    averageRating: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        if (!user) {
          router.push('/auth/login');
          return;
        }

        if (user.role !== 'ADMIN') {
          router.push('/');
          return;
        }

        // Load dashboard stats
        const [usersResponse, appointmentsResponse] = await Promise.all([
          profileApi.getAll(),
          appointmentApi.getAll()
        ]);

        const users = usersResponse.data || [];
        const appointments = appointmentsResponse.data || [];

        // Calculate stats
        const totalUsers = users.length;
        const totalCaregivers = users.filter(u => u.role === 'CAREGIVER').length;
        const totalPatients = users.filter(u => u.role === 'PATIENT').length;
        const totalAppointments = appointments.length;
        const pendingAppointments = appointments.filter(a => a.status === 'PENDING').length;
        const completedAppointments = appointments.filter(a => a.status === 'COMPLETED').length;
        const pendingVerifications = users.filter(u => u.status === 'PENDING_VERIFICATION').length;
        const activeUsers = users.filter(u => u.status === 'ACTIVE').length;
        const suspendedUsers = users.filter(u => u.status === 'SUSPENDED').length;

        setStats({
          totalUsers,
          totalCaregivers,
          totalPatients,
          totalAppointments,
          pendingAppointments,
          completedAppointments,
          pendingVerifications,
          activeUsers,
          suspendedUsers,
          averageRating: 4.7, // Mock data
          totalRevenue: 45678, // Mock data
        });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [user, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">Dashboard Overview</h1>
            <p className="text-primary/80">Welcome back, {user?.first_name}</p>
          </div>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-primary/70">
                {stats.activeUsers} active, {stats.pendingVerifications} pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Caregivers</CardTitle>
              <UserCheck className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCaregivers}</div>
              <p className="text-xs text-primary/70">
                Professional caregivers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Patients</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPatients}</div>
              <p className="text-xs text-primary/70">
                Registered patients
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20 border-warning-200 dark:border-warning-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-warning-700 dark:text-warning-300">Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-warning-600 dark:text-warning-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning-600 dark:text-warning-400">{stats.totalAppointments}</div>
              <p className="text-xs text-warning-600/70 dark:text-warning-400/70">
                {stats.completedAppointments} completed, {stats.pendingAppointments} pending
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                          {user.first_name?.[0]}{user.last_name?.[0]}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">New user registered</p>
                        <p className="text-xs text-primary/70">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Appointment completed</p>
                        <p className="text-xs text-primary/70">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Caregiver verification needed</p>
                        <p className="text-xs text-primary/70">10 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <Users className="h-6 w-6 mb-2" />
                      <span className="text-sm">Manage Users</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <Calendar className="h-6 w-6 mb-2" />
                      <span className="text-sm">Schedule</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <Star className="h-6 w-6 mb-2" />
                      <span className="text-sm">Reviews</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <Activity className="h-6 w-6 mb-2" />
                      <span className="text-sm">Analytics</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <AdminUsersTable />
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <AdminAppointmentsTable />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>Monthly user registration trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <UserGrowthChart />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Appointment Trends</CardTitle>
                  <CardDescription>Weekly appointment scheduling patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <AppointmentTrendsChart />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
