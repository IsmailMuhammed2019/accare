'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminAppointmentsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments Table</CardTitle>
        <CardDescription>Appointment management table will be implemented here</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-gray-600">Appointments table component will be implemented here</p>
        </div>
      </CardContent>
    </Card>
  );
}