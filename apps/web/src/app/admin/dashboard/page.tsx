// app/admin/dashboard/page.tsx
import { prisma } from '@/lib/db';
import { MapPin, Calendar, Users, MessageCircle, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  // Fetch statistics
  const [
    totalVenues,
    pendingVenues,
    totalEvents,
    totalUsers,
    recentUsers,
    pendingReports,
  ] = await Promise.all([
    prisma.venue.count(),
    prisma.venue.count({ where: { status: 'pending' } }),
    prisma.event.count(),
    prisma.user.count(),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    }),
    prisma.report.count({ where: { status: 'pending' } }),
  ]);

  const stats = [
    {
      name: 'Toplam Mekan',
      value: totalVenues,
      icon: MapPin,
      color: 'bg-blue-500',
      href: '/admin/mekanlar',
    },
    {
      name: 'Toplam Etkinlik',
      value: totalEvents,
      icon: Calendar,
      color: 'bg-green-500',
      href: '/admin/etkinlikler',
    },
    {
      name: 'Toplam Kullanıcı',
      value: totalUsers,
      icon: Users,
      color: 'bg-purple-500',
      href: '/admin/kullanicilar',
    },
    {
      name: 'Bekleyen Onaylar',
      value: pendingVenues,
      icon: Clock,
      color: 'bg-orange-500',
      href: '/admin/mekanlar?status=pending',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h3 className="text-3xl font-bold text-gray-900">Dashboard</h3>
        <p className="text-gray-600 mt-1">Mekan Gezer yönetim paneline hoş geldiniz</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Alerts */}
      {(pendingVenues > 0 || pendingReports > 0) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-yellow-900 mb-2">Dikkat Gereken Konular</h4>
              <ul className="space-y-1 text-sm text-yellow-800">
                {pendingVenues > 0 && (
                  <li>
                    <Link href="/admin/mekanlar?status=pending" className="underline hover:text-yellow-900">
                      {pendingVenues} mekan onay bekliyor
                    </Link>
                  </li>
                )}
                {pendingReports > 0 && (
                  <li>
                    <Link href="/admin/raporlar" className="underline hover:text-yellow-900">
                      {pendingReports} rapor incelenmedi
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Recent Users */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-gray-900">Son Kayıt Olanlar</h4>
          <Link href="/admin/kullanicilar" className="text-sm text-blue-600 hover:text-blue-700">
            Tümünü Gör →
          </Link>
        </div>

        <div className="space-y-4">
          {recentUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600">
                  {user.username[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.username}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                  {user.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/mekanlar/yeni"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition text-center"
        >
          <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-1">Yeni Mekan Ekle</h4>
          <p className="text-sm text-gray-600">Hızlıca mekan ekle</p>
        </Link>

        <Link
          href="/admin/etkinlikler/yeni"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition text-center"
        >
          <Calendar className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-1">Yeni Etkinlik</h4>
          <p className="text-sm text-gray-600">Etkinlik oluştur</p>
        </Link>

        <Link
          href="/admin/topluluk"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition text-center"
        >
          <MessageCircle className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-1">Moderasyon</h4>
          <p className="text-sm text-gray-600">Sohbetleri yönet</p>
        </Link>
      </div>
    </div>
  );
}
