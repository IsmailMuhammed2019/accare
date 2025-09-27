'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPatientsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patients Table</CardTitle>
        <CardDescription>Patient management table will be implemented here</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-gray-600">Patients table component will be implemented here</p>
        </div>
      </CardContent>
    </Card>
  );
}
