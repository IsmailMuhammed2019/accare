'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';

// Sample data for charts
const userGrowthData = [
  { month: 'Jan', users: 45, caregivers: 12, patients: 33 },
  { month: 'Feb', users: 52, caregivers: 15, patients: 37 },
  { month: 'Mar', users: 48, caregivers: 18, patients: 30 },
  { month: 'Apr', users: 61, caregivers: 22, patients: 39 },
  { month: 'May', users: 55, caregivers: 25, patients: 30 },
  { month: 'Jun', users: 67, caregivers: 28, patients: 39 },
];

const appointmentData = [
  { day: 'Mon', scheduled: 12, completed: 10, cancelled: 2 },
  { day: 'Tue', scheduled: 15, completed: 13, cancelled: 2 },
  { day: 'Wed', scheduled: 18, completed: 16, cancelled: 2 },
  { day: 'Thu', scheduled: 14, completed: 12, cancelled: 2 },
  { day: 'Fri', scheduled: 20, completed: 18, cancelled: 2 },
  { day: 'Sat', scheduled: 8, completed: 7, cancelled: 1 },
  { day: 'Sun', scheduled: 5, completed: 4, cancelled: 1 },
];

const statusData = [
  { name: 'Active', value: 156, color: '#10b981' },
  { name: 'Pending', value: 12, color: '#f59e0b' },
  { name: 'Suspended', value: 3, color: '#ef4444' },
  { name: 'Inactive', value: 8, color: '#6b7280' },
];

const revenueData = [
  { month: 'Jan', revenue: 4500, expenses: 3200 },
  { month: 'Feb', revenue: 5200, expenses: 3400 },
  { month: 'Mar', revenue: 4800, expenses: 3100 },
  { month: 'Apr', revenue: 6100, expenses: 3800 },
  { month: 'May', revenue: 5500, expenses: 3500 },
  { month: 'Jun', revenue: 6700, expenses: 4200 },
];

export function UserGrowthChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardDescription>Monthly user registration trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#3b82f6" name="Total Users" />
            <Bar dataKey="caregivers" fill="#10b981" name="Caregivers" />
            <Bar dataKey="patients" fill="#f59e0b" name="Patients" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function AppointmentTrendsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointment Trends</CardTitle>
        <CardDescription>Weekly appointment statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={appointmentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="scheduled" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Scheduled"
            />
            <Line 
              type="monotone" 
              dataKey="completed" 
              stroke="#10b981" 
              strokeWidth={2}
              name="Completed"
            />
            <Line 
              type="monotone" 
              dataKey="cancelled" 
              stroke="#ef4444" 
              strokeWidth={2}
              name="Cancelled"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function UserStatusChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Status Distribution</CardTitle>
        <CardDescription>Current user status breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue & Expenses</CardTitle>
        <CardDescription>Monthly financial overview</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stackId="1"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.6}
              name="Revenue"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stackId="2"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.6}
              name="Expenses"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function ActivityChart() {
  const activityData = [
    { time: '00:00', activity: 2 },
    { time: '04:00', activity: 1 },
    { time: '08:00', activity: 8 },
    { time: '12:00', activity: 15 },
    { time: '16:00', activity: 12 },
    { time: '20:00', activity: 6 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Activity</CardTitle>
        <CardDescription>User activity throughout the day</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="activity"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function TopCaregiversChart() {
  const topCaregivers = [
    { name: 'Sarah Johnson', rating: 4.9, appointments: 45 },
    { name: 'Michael Chen', rating: 4.8, appointments: 42 },
    { name: 'Emily Davis', rating: 4.7, appointments: 38 },
    { name: 'David Wilson', rating: 4.6, appointments: 35 },
    { name: 'Lisa Brown', rating: 4.5, appointments: 32 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Caregivers</CardTitle>
        <CardDescription>Highest rated caregivers this month</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topCaregivers} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip />
            <Bar dataKey="appointments" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
