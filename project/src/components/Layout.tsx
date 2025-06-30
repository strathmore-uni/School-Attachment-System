import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Home,
  FileText,
  Building2,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  const userRole = localStorage.getItem('userRole') || '';
  const username = localStorage.getItem('username') || '';

  function handleLogout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the system",
    });
    navigate('/login');
  }

  function getNavigationItems() {
    if (userRole === 'student') {
      return [
        { name: 'Dashboard', href: '/student-dashboard', icon: Home },
        { name: 'Applications', href: '/student/applications', icon: FileText },
        { name: 'Reports', href: '/student/reports', icon: FileText },
        { name: 'Organizations', href: '/student/organizations', icon: Building2 },
      ];
    }
    
    if (userRole === 'school-supervisor') {
      return [
        { name: 'Dashboard', href: '/school-supervisor-dashboard', icon: Home },
        { name: 'Students', href: '/school-supervisor/students', icon: Users },
        { name: 'Evaluations', href: '/school-supervisor/evaluations', icon: FileText },
        { name: 'Reports', href: '/school-supervisor/reports', icon: BarChart3 },
      ];
    }
    
    if (userRole === 'host-supervisor') {
      return [
        { name: 'Dashboard', href: '/host-supervisor-dashboard', icon: Home },
        { name: 'Students', href: '/host-supervisor/students', icon: Users },
        { name: 'Attendance', href: '/host-supervisor/attendance', icon: FileText },
        { name: 'Evaluations', href: '/host-supervisor/evaluations', icon: BarChart3 },
      ];
    }
    
    if (userRole === 'administrator') {
      return [
        { name: 'Dashboard', href: '/admin-dashboard', icon: Home },
        { name: 'Applications', href: '/admin/applications', icon: FileText },
        { name: 'Students', href: '/admin/students', icon: Users },
        { name: 'Organizations', href: '/admin/organizations', icon: Building2 },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
      ];
    }

    return [{ name: 'Dashboard', href: '/', icon: Home }];
  }

  const navigationItems = getNavigationItems();

  function getPortalTitle() {
    if (userRole === 'administrator') return 'Administrator Portal';
    if (userRole === 'school-supervisor') return 'School Supervisor Portal';
    if (userRole === 'host-supervisor') return 'Host Supervisor Portal';
    if (userRole === 'student') return 'Student Portal';
    return 'Portal';
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? "w-64" : "w-0 lg:w-64"}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img 
                  src="/StrathmoreLogo.png" 
                  alt="Strathmore University" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900">Strathmore University</span>
                <span className="text-xs text-gray-500">Attachment System</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate(item.href)}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">
                {getPortalTitle()}
              </h1>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{username}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {getPortalTitle().replace(' Portal', '')}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;