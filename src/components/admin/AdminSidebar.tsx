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
  Users,
  UserCheck,
  Heart,
  Calendar,
  Star,
  Bell,
  Settings,
  LogOut,
  Menu,
  BarChart3,
  MessageSquare,
  Shield,
  Activity,
  UserPlus,
  AlertTriangle,
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const navigationItems = [
  {
    title: 'Overview',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
    description: 'Dashboard overview and analytics',
  },
  {
    title: 'User Management',
    href: '/admin/users',
    icon: Users,
    description: 'Manage all users and approvals',
    badge: 'Pending',
  },
  {
    title: 'Caregivers',
    href: '/admin/caregivers',
    icon: UserCheck,
    description: 'Manage caregiver profiles',
  },
  {
    title: 'Patients',
    href: '/admin/patients',
    icon: Heart,
    description: 'Manage patient profiles',
  },
  {
    title: 'Appointments',
    href: '/admin/appointments',
    icon: Calendar,
    description: 'Schedule and manage appointments',
  },
  {
    title: 'Reviews',
    href: '/admin/reviews',
    icon: Star,
    description: 'Manage reviews and ratings',
  },
  {
    title: 'Notifications',
    href: '/admin/notifications',
    icon: Bell,
    description: 'System notifications',
  },
  {
    title: 'Messages',
    href: '/admin/messages',
    icon: MessageSquare,
    description: 'User communications',
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    description: 'Detailed analytics and reports',
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    description: 'System configuration',
  },
];

const quickActions = [
  {
    title: 'Approve Users',
    href: '/admin/users?filter=pending',
    icon: UserPlus,
    color: 'text-gray-700',
  },
  {
    title: 'View Alerts',
    href: '/admin/dashboard?tab=alerts',
    icon: AlertTriangle,
    color: 'text-gray-700',
  },
  {
    title: 'System Health',
    href: '/admin/dashboard?tab=health',
    icon: Activity,
    color: 'text-gray-700',
  },
];

export function AdminSidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className={cn('flex h-full w-64 flex-col border-r bg-gradient-sidebar shadow-colorful', className)}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-primary/10">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-colorful">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-primary">Admin Panel</span>
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
      <div className="p-4 border-b border-primary/10 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 rounded-lg bg-gradient-to-br from-warning-100 to-warning-200 dark:from-warning-900/20 dark:to-warning-800/20">
            <div className="text-2xl font-bold text-warning-600 dark:text-warning-400">12</div>
            <div className="text-xs text-warning-700 dark:text-warning-300">Pending</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900/20 dark:to-success-800/20">
            <div className="text-2xl font-bold text-success-600 dark:text-success-400">156</div>
            <div className="text-xs text-success-700 dark:text-success-300">Active</div>
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
                  'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-primary/10 hover:shadow-sm',
                  isActive
                    ? 'bg-gradient-primary text-white shadow-colorful border-r-4 border-primary-600'
                    : 'text-primary/80 hover:text-primary'
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="truncate">{item.title}</span>
                    {item.badge && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-gradient-to-r from-warning-100 to-warning-200 px-2 py-0.5 text-xs font-medium text-warning-700 shadow-sm">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-primary/60 truncate">{item.description}</p>
                </div>
              </Link>
            );
          })}
        </nav>

        <Separator className="my-4" />

        {/* Quick Actions */}
        <div className="space-y-1">
          <h3 className="px-3 text-xs font-semibold text-primary/70 uppercase tracking-wider">
            Quick Actions
          </h3>
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-primary/80 transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:shadow-sm"
              >
                <Icon className="h-4 w-4 flex-shrink-0 text-primary" />
                <span className="truncate">{action.title}</span>
              </Link>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-primary/10 p-4">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-primary/80 hover:text-primary hover:bg-primary/10"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export function AdminSidebarMobile() {
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
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Admin Panel</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-4 border-b bg-gray-50">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700">12</div>
                <div className="text-xs text-gray-600">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">156</div>
                <div className="text-xs text-gray-600">Active</div>
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
                        {item.badge && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-primary/60 truncate">{item.description}</p>
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
