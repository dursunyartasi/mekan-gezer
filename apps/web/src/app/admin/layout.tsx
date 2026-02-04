// app/admin/layout.tsx
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  MapPin, 
  Calendar, 
  Users, 
  MessageCircle,
  Settings,
  LogOut,
  Compass
} from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Check if user is logged in
  if (!session) {
    redirect('/login');
  }

  // Check if user is admin or moderator
  if (session.user.role !== 'admin' && session.user.role !== 'moderator') {
    redirect('/');
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Mekanlar', href: '/admin/mekanlar', icon: MapPin },
    { name: 'Etkinlikler', href: '/admin/etkinlikler', icon: Calendar },
    { name: 'Kullanıcılar', href: '/admin/kullanicilar', icon: Users },
    { name: 'Topluluk', href: '/admin/topluluk', icon: MessageCircle },
    { name: 'Ayarlar', href: '/admin/ayarlar', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-800">
          <Compass className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="font-bold text-lg">Mekan Gezer</h1>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition text-gray-300 hover:text-white"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-semibold">
              {session.user.name?.[0] || session.user.username[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {session.user.name || session.user.username}
              </p>
              <p className="text-xs text-gray-400">{session.user.role}</p>
            </div>
          </div>
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Çıkış Yap</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Yönetim Paneli
              </h2>
            </div>
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Siteyi Görüntüle →
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
