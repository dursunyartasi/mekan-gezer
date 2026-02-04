'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Calendar, Users, Eye, Edit, Trash2, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { events as allEvents } from '@/data/mockEvents';

export default function AdminEtkinliklerPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Add admin-specific fields to events (status, organizer)
  const eventsWithAdminData = useMemo(() =>
    allEvents.map((e, idx) => ({
      ...e,
      status: 'published',
      organizer: e.organizer || 'Admin',
    })),
    []
  );

  const filteredEvents = useMemo(() => {
    return eventsWithAdminData.filter(event => {
      const matchesFilter = filter === 'all' || event.status === filter;
      const matchesSearch = searchQuery === '' ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery, eventsWithAdminData]);

  const totalParticipants = useMemo(() =>
    eventsWithAdminData.reduce((sum, e) => sum + (e.participants || 0), 0),
    [eventsWithAdminData]
  );

  const stats = [
    { label: 'Toplam Etkinlik', value: allEvents.length.toString(), change: '+' + allEvents.length, color: 'blue' },
    { label: 'Aktif Etkinlik', value: allEvents.length.toString(), change: '+' + allEvents.length, color: 'green' },
    { label: 'Taslak', value: '0', change: '+0', color: 'yellow' },
    { label: 'Toplam Katılımcı', value: totalParticipants.toString(), change: '+' + totalParticipants, color: 'purple' },
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      published: { bg: 'bg-green-100', text: 'text-green-700', label: 'Yayında' },
      draft: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Taslak' },
      completed: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Tamamlandı' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'İptal' },
    };
    const badge = badges[status as keyof typeof badges];
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Etkinlikler</h1>
        <p className="text-gray-600">Etkinlik yönetimi ve katılımcı takibi</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">{stat.label}</span>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Etkinlik ara..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'all' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setFilter('published')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'published' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Yayında
            </button>
            <button
              onClick={() => setFilter('draft')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'draft' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Taslak
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Etkinlik</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tarih & Saat</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Kategori</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Katılımcı</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ücret</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Durum</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Organizatör</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{event.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 mt-1">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">{event.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                        {event.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{event.participants}</span>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-600">{event.capacity}</span>
                      </div>
                      <div className="w-20 bg-gray-200 rounded-full h-1.5 mt-2">
                        <div
                          className="bg-orange-500 h-1.5 rounded-full"
                          style={{ width: `${(event.participants / event.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {event.price === 0 ? (
                        <span className="text-green-600 font-medium">Ücretsiz</span>
                      ) : (
                        <div className="flex items-center gap-1 text-gray-900 font-medium">
                          <DollarSign className="w-4 h-4" />
                          <span>₺{event.price}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(event.status)}</td>
                    <td className="px-6 py-4 text-gray-600">{event.organizer}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/etkinlikler/${event.id}`} className="p-2 hover:bg-gray-100 rounded-lg transition" title="Görüntüle">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </Link>
                        <Link href={`/admin/etkinlikler/${event.id}`} className="p-2 hover:bg-gray-100 rounded-lg transition" title="Düzenle">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </Link>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition" title="Sil">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">{filteredEvents.length}</span> etkinlik gösteriliyor
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              Önceki
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">2</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              Sonraki
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
