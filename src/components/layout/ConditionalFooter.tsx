'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';

export function ConditionalFooter() {
  const pathname = usePathname();
  
  // Pages where footer should be hidden
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

  // Check if current path should hide footer
  const shouldHideFooter = hiddenPaths.some(path => {
    if (path === '/admin' || path === '/caregiver' || path === '/patient') {
      return pathname === path || pathname.startsWith(path + '/');
    }
    return pathname === path;
  });

  // Don't render footer if it should be hidden
  if (shouldHideFooter) {
    return null;
  }

  return <Footer />;
}
