'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/supabase-auth';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (user.role !== 'ADMIN') {
      router.push('/');
      return;
    }

    // Redirect to dashboard
    router.push('/admin/dashboard');
  }, [user, router]);

  return null;
}
