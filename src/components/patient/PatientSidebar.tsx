'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuthStore } from '@/store/supabase-auth';
import {
  LayoutDashboard,
  Calendar,
  Star,
  MessageSquare,
  User,
  Users,
  MapPin,
  Bell,
  Settings,
  LogOut,
  Menu,
  Heart,
  Activity,
  Clock,
  FileText,
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/patient/dashboard',
    icon: LayoutDashboard,
    description: 'Overview and analytics',
  },
  {
    title: 'My Appointments',
    href: '/patient/appointments',
    icon: Calendar,
    description: 'View and manage appointments',
  },
  {
    title: 'Find Caregivers',
    href: '/patient/caregivers',
    icon: Users,
    description: 'Browse available caregivers',
  },
  {
    title: 'My Profile',
    href: '/patient/profile',
    icon: User,
    description: 'Update your profile',
  },
  {
    title: 'Reviews',
    href: '/patient/reviews',
    icon: Star,
    description: 'Leave reviews for caregivers',
  },
  {
    title: 'Messages',
    href: '/patient/messages',
    icon: MessageSquare,
    description: 'Communicate with caregivers',
  },
  {
    title: 'Health Records',
    href: '/patient/health-records',
    icon: FileText,
    description: 'Manage health information',
  },
  {
    title: 'Location',
    href: '/patient/location',
    icon: MapPin,
    description: 'Update your location',
  },
  {
    title: 'Notifications',
    href: '/patient/notifications',
    icon: Bell,
    description: 'Manage notifications',
  },
  {
    title: 'Settings',
    href: '/patient/settings',
    icon: Settings,
    description: 'Account settings',
  },
];

const quickActions = [
  {
    title: 'Book Appointment',
    href: '/patient/appointments/new',
    icon: Calendar,
    color: 'text-gray-700',
  },
  {
    title: 'Find Caregivers',
    href: '/patient/caregivers',
    icon: Users,
    color: 'text-gray-700',
  },
  {
    title: 'Emergency Contact',
    href: '/patient/emergency',
    icon: Heart,
    color: 'text-gray-700',
  },
];

export function PatientSidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className={cn('flex h-full w-64 flex-col border-r bg-white', className)}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-6 border-b">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800">
            <Heart className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900">Patient Portal</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-b bg-gray-50">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-700">3</div>
            <div className="text-xs text-gray-600">This Week</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">12</div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100',
                  isActive
                    ? 'bg-gray-100 text-gray-900 border-r-2 border-gray-800'
                    : 'text-gray-700 hover:text-gray-900'
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="truncate">{item.title}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{item.description}</p>
                </div>
              </Link>
            );
          })}
        </nav>

        <Separator className="my-4" />

        {/* Quick Actions */}
        <div className="space-y-1">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Quick Actions
          </h3>
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <Icon className={cn('h-4 w-4 flex-shrink-0', action.color)} />
                <span className="truncate">{action.title}</span>
              </Link>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-4">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export function PatientSidebarMobile() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Patient Portal</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-4 border-b bg-gray-50">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700">3</div>
                <div className="text-xs text-gray-600">This Week</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">12</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100',
                      isActive
                        ? 'bg-gray-100 text-gray-900 border-r-2 border-gray-800'
                        : 'text-gray-700 hover:text-gray-900'
                    )}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="truncate">{item.title}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{item.description}</p>
                    </div>
                  </Link>
                );
              })}
            </nav>

            <Separator className="my-4" />

            {/* Quick Actions */}
            <div className="space-y-1">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Quick Actions
              </h3>
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  >
                    <Icon className={cn('h-4 w-4 flex-shrink-0', action.color)} />
                    <span className="truncate">{action.title}</span>
                  </Link>
                );
              })}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t p-4">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
