'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';

export function ConditionalHeader() {
  const pathname = usePathname();
  
  // Pages where header should be hidden
  const hiddenPaths = [
    '/auth/register',
    '/auth/login', 
    '/login',
    '/register',
    '/admin',
    '/admin/dashboard',
    '/admin/users',
    '/admin/caregivers',
    '/admin/patients',
    '/admin/appointments',
    '/admin/reviews',
    '/admin/notifications',
    '/admin/messages',
    '/admin/analytics',
    '/admin/settings',
    '/caregiver',
    '/caregiver/dashboard',
    '/patient',
    '/patient/dashboard'
  ];

  // Check if current path should hide header
  const shouldHideHeader = hiddenPaths.some(path => {
    if (path === '/admin' || path === '/caregiver' || path === '/patient') {
      return pathname === path || pathname.startsWith(path + '/');
    }
    return pathname === path;
  });

  // Don't render header if it should be hidden
  if (shouldHideHeader) {
    return null;
  }

  return <Header />;
}
