'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, Edit, Trash2, UserCheck, Star } from 'lucide-react';
import api from '@/lib/api';

interface Caregiver {
  id: string;
  licenseNumber?: string;
  specializations: string[];
  experience: number;
  hourlyRate?: number;
  bio?: string;
  languages: string[];
  isVerified: boolean;
  backgroundCheck: boolean;
  cprCertified: boolean;
  firstAidCertified: boolean;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    avatar?: string;
    status: string;
  };
  _count: {
    appointments: number;
    reviews: number;
  };
}

export default function AdminCaregiversTable() {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCaregivers();
  }, [page]);

  const fetchCaregivers = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/caregivers?page=${page}&limit=10`);
      setCaregivers(response.data.caregivers);
      setTotalPages(response.data.pagination.pages);
    } catch (error) {
      console.error('Error fetching caregivers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (caregiverId: string) => {
    try {
      await api.patch(`/caregivers/${caregiverId}/verify`);
      fetchCaregivers();
    } catch (error) {
      console.error('Error verifying caregiver:', error);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Caregivers</CardTitle>
          <CardDescription>Manage all caregivers in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="text-sm text-muted-foreground">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Caregivers</CardTitle>
        <CardDescription>Manage all caregivers in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Caregiver</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Appointments</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {caregivers.map((caregiver) => (
              <TableRow key={caregiver.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={caregiver.user.avatar} />
                      <AvatarFallback>
                        {caregiver.user.firstName[0]}{caregiver.user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {caregiver.user.firstName} {caregiver.user.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {caregiver.user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{caregiver.experience} years</TableCell>
                <TableCell>
                  {caregiver.hourlyRate ? `$${caregiver.hourlyRate}/hr` : 'N/A'}
                </TableCell>
                <TableCell>
                  {caregiver.isVerified ? (
                    <Badge variant="success">Verified</Badge>
                  ) : (
                    <Badge variant="warning">Pending</Badge>
                  )}
                </TableCell>
                <TableCell>{caregiver._count.appointments}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    {!caregiver.isVerified && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVerify(caregiver.id)}
                      >
                        <UserCheck className="h-4 w-4" />
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
