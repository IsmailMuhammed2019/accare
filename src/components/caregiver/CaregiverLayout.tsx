'use client';

import { ReactNode } from 'react';
import { CaregiverSidebar, CaregiverSidebarMobile } from './CaregiverSidebar';

interface CaregiverLayoutProps {
  children: ReactNode;
}

export function CaregiverLayout({ children }: CaregiverLayoutProps) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <CaregiverSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header - Only visible on mobile */}
        <header className="md:hidden bg-gradient-card border-b border-primary/10 px-4 py-3">
          <div className="flex items-center justify-between">
            <CaregiverSidebarMobile />
            <h1 className="text-lg font-semibold text-primary">Caregiver Dashboard</h1>
            <div className="w-8"></div> {/* Spacer for centering */}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
