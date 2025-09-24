'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
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
  LogOut,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Activity,
  Clock
} from 'lucide-react';
import api from '@/lib/api';
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

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
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
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      router.push('/auth/login');
      return;
    }
    
    fetchDashboardData();
  }, [user, router]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch users
      const usersResponse = await api.get('/users');
      setUsers(usersResponse.data.data || []);
      
      // Calculate stats
      const allUsers = usersResponse.data.data || [];
      const caregivers = allUsers.filter((u: User) => u.role === 'CAREGIVER');
      const patients = allUsers.filter((u: User) => u.role === 'PATIENT');
      const pendingVerifications = allUsers.filter((u: User) => u.status === 'PENDING_VERIFICATION');
      const activeUsers = allUsers.filter((u: User) => u.status === 'ACTIVE');
      const suspendedUsers = allUsers.filter((u: User) => u.status === 'SUSPENDED');
      
      // Fetch appointments if endpoint exists
      let appointmentsData = { total: 0, pending: 0, completed: 0 };
      try {
        const appointmentsResponse = await api.get('/appointments');
        const appointments = appointmentsResponse.data.data || [];
        appointmentsData = {
          total: appointments.length,
          pending: appointments.filter((a: { status: string }) => a.status === 'PENDING').length,
          completed: appointments.filter((a: { status: string }) => a.status === 'COMPLETED').length,
        };
      } catch {
        console.log('Appointments endpoint not available yet');
      }
      
      setStats({
        totalUsers: allUsers.length,
        totalCaregivers: caregivers.length,
        totalPatients: patients.length,
        totalAppointments: appointmentsData.total,
        pendingAppointments: appointmentsData.pending,
        completedAppointments: appointmentsData.completed,
        pendingVerifications: pendingVerifications.length,
        activeUsers: activeUsers.length,
        suspendedUsers: suspendedUsers.length,
        averageRating: 4.8, // Placeholder - can be calculated from reviews
        totalRevenue: 0, // Placeholder - can be calculated from completed appointments
      });
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
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-800';
      case 'SUSPENDED':
        return 'bg-red-100 text-red-800';
      case 'PENDING_VERIFICATION':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome back, {user?.firstName}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeUsers} active, {stats.pendingVerifications} pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Caregivers</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCaregivers}</div>
              <p className="text-xs text-muted-foreground">
                Professional caregivers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPatients}</div>
              <p className="text-xs text-muted-foreground">
                Registered patients
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAppointments}</div>
              <p className="text-xs text-muted-foreground">
                {stats.pendingAppointments} pending, {stats.completedAppointments} completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-800">Pending Verifications</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-800">{stats.pendingVerifications}</div>
              <p className="text-xs text-yellow-600">
                Users awaiting approval
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Active Users</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{stats.activeUsers}</div>
              <p className="text-xs text-green-600">
                Verified and active
              </p>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-800">Suspended Users</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-800">{stats.suspendedUsers}</div>
              <p className="text-xs text-red-600">
                Temporarily suspended
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{stats.averageRating}</div>
              <p className="text-xs text-blue-600">
                Out of 5.0 stars
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="caregivers">Caregivers</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="text-yellow-800 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Pending Approvals
                  </CardTitle>
                  <CardDescription className="text-yellow-600">
                    {stats.pendingVerifications} users need verification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Review Pending Users
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-800 flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Appointments
                  </CardTitle>
                  <CardDescription className="text-blue-600">
                    {stats.pendingAppointments} appointments pending
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Activity className="h-4 w-4 mr-2" />
                    Manage Appointments
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    System Health
                  </CardTitle>
                  <CardDescription className="text-green-600">
                    {stats.activeUsers} active users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Activity className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UserGrowthChart />
              <AppointmentTrendsChart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <UserStatusChart />
              <RevenueChart />
              <ActivityChart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TopCaregiversChart />
              <Card>
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                  <CardDescription>Recent system notifications and alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-800">Pending User Approvals</p>
                        <p className="text-sm text-yellow-600">{stats.pendingVerifications} users awaiting verification</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-800">Scheduled Maintenance</p>
                        <p className="text-sm text-blue-600">System maintenance scheduled for tomorrow at 2 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">System Health</p>
                        <p className="text-sm text-green-600">All systems operating normally</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent User Registrations</CardTitle>
                  <CardDescription>Latest users who joined the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-sm">
                              {user.firstName[0]}{user.lastName[0]}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{user.firstName} {user.lastName}</p>
                            <p className="text-xs text-gray-600">{user.email}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                  <CardDescription>Important notifications and alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.pendingVerifications > 0 && (
                      <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <div>
                          <p className="font-medium text-yellow-800">
                            {stats.pendingVerifications} users need approval
                          </p>
                          <p className="text-sm text-yellow-600">Review pending registrations</p>
                        </div>
                      </div>
                    )}
                    {stats.suspendedUsers > 0 && (
                      <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                        <XCircle className="h-5 w-5 text-red-600" />
                        <div>
                          <p className="font-medium text-red-800">
                            {stats.suspendedUsers} users are suspended
                          </p>
                          <p className="text-sm text-red-600">Review suspended accounts</p>
                        </div>
                      </div>
                    )}
                    {stats.pendingAppointments > 0 && (
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-800">
                            {stats.pendingAppointments} appointments pending
                          </p>
                          <p className="text-sm text-blue-600">Review appointment requests</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <AdminUsersTable />
          </TabsContent>

          <TabsContent value="caregivers">
            <AdminCaregiversTable />
          </TabsContent>

          <TabsContent value="patients">
            <AdminPatientsTable />
          </TabsContent>

          <TabsContent value="appointments">
            <AdminAppointmentsTable />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
