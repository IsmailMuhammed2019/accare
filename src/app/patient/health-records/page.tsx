'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/supabase-auth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PatientLayout } from '@/components/patient/PatientLayout';
import { 
  FileText,
  Upload,
  Download,
  Eye,
  Plus,
  Calendar,
  User,
  Heart,
} from 'lucide-react';

interface HealthRecord {
  id: string;
  title: string;
  type: string;
  date: string;
  doctor: string;
  description: string;
  fileUrl?: string;
}

export default function PatientHealthRecords() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'PATIENT') {
      router.push('/auth/login');
      return;
    }
    
    fetchRecords();
  }, [user, router]);

  const fetchRecords = async () => {
    try {
      setIsLoading(true);
      // Mock data for now
      const mockRecords: HealthRecord[] = [
        {
          id: '1',
          title: 'Annual Physical Exam',
          type: 'Medical Report',
          date: '2024-01-15',
          doctor: 'Dr. Sarah Wilson',
          description: 'Complete annual physical examination with blood work and vital signs.',
          fileUrl: '/documents/physical-exam-2024.pdf'
        },
        {
          id: '2',
          title: 'Blood Test Results',
          type: 'Lab Results',
          date: '2024-01-10',
          doctor: 'Dr. Michael Chen',
          description: 'Complete blood count and metabolic panel results.',
          fileUrl: '/documents/blood-test-2024.pdf'
        },
        {
          id: '3',
          title: 'X-Ray Report',
          type: 'Imaging',
          date: '2024-01-05',
          doctor: 'Dr. Emily Rodriguez',
          description: 'Chest X-ray examination results.',
          fileUrl: '/documents/xray-chest-2024.pdf'
        }
      ];
      setRecords(mockRecords);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Medical Report':
        return 'bg-blue-100 text-blue-800';
      case 'Lab Results':
        return 'bg-green-100 text-green-800';
      case 'Imaging':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading health records...</p>
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
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">Health Records</h1>
            <p className="text-primary/80">Manage your health information and medical documents</p>
          </div>
          <Button className="bg-gradient-primary hover:shadow-colorful-lg">
            <Upload className="h-4 w-4 mr-2" />
            Upload Record
          </Button>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {records.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No health records yet</h3>
                <p className="text-gray-600 mb-4">Upload your medical documents to keep them organized</p>
                <Button className="bg-gradient-primary hover:shadow-colorful-lg">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload First Record
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-blue-600">Total Records</p>
                        <p className="text-2xl font-bold text-blue-600">{records.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <Calendar className="h-8 w-8 text-green-600" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-600">This Month</p>
                        <p className="text-2xl font-bold text-green-600">
                          {records.filter(r => new Date(r.date).getMonth() === new Date().getMonth()).length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <Heart className="h-8 w-8 text-purple-600" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-purple-600">Recent</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {records.filter(r => {
                            const recordDate = new Date(r.date);
                            const thirtyDaysAgo = new Date();
                            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                            return recordDate >= thirtyDaysAgo;
                          }).length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Records List */}
              <div className="space-y-4">
                {records.map((record) => (
                  <Card key={record.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <FileText className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold">{record.title}</h3>
                              <Badge className={getTypeColor(record.type)}>
                                {record.type}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-2">{record.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                {record.doctor}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatDate(record.date)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {record.fileUrl && (
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PatientLayout>
  );
}

