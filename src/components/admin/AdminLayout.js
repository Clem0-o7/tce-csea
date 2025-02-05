import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { 
  LayoutDashboard,
  Camera,
  Calendar, 
  Trophy, 
  Users, 
  Mail, 
  BookOpen,
  LogOut,
  Menu,
  X,
  ChevronLeft
} from 'lucide-react';
import React from 'react';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedSidebarState = localStorage.getItem('isSidebarOpen');
    if (savedSidebarState !== null) {
      setIsSidebarOpen(JSON.parse(savedSidebarState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isSidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const navigation = useMemo(() => [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Events', href: '/admin/events', icon: Calendar },
    { name: 'Gallery', href: '/admin/gallery', icon: Camera },
    { name: 'Winners', href: '/admin/winners', icon: Trophy },
    { name: 'Office Bearers', href: '/admin/office-bearers', icon: Users },
    { name: 'Contact Messages', href: '/admin/messages', icon: Mail },
    { name: 'Magazine', href: '/admin/magazine', icon: BookOpen },
  ], []);

  const handleSignOut = useMemo(() => async () => {
    await signOut({ redirect: true, callbackUrl: '/admin/login' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-150 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between border-b px-4">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <button
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center rounded-lg px-4 py-2 text-sm ${
                        router.pathname === item.href
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout button */}
          <div className="border-t p-4">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`min-h-screen transition-all duration-150 ${
          isSidebarOpen ? 'lg:ml-64' : ''
        }`}
      >
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default React.memo(AdminLayout);