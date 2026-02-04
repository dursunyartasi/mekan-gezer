'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, MapPin, Star, Eye, Edit, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { venues as allVenues } from '@/data/mockVenues';

export default function AdminMekanlarPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Add admin-specific fields to venues (status, views, date, submittedBy)
  const venuesWithAdminData = useMemo(() =>
    allVenues.map((v, idx) => ({
      ...v,
      status: 'approved',
      views: Math.floor(Math.random() * 3000) + 500,
      submittedBy: 'Admin',
      date: '2024-02-0' + ((idx % 5) + 1),
    })),
    []
  );

  const filteredVenues = useMemo(() => {
    return venuesWithAdminData.filter(venue => {
      const matchesFilter = filter === 'all' || venue.status === filter;
      const matchesSearch = searchQuery === '' ||
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery, venuesWithAdminData]);

  const stats = [
    { label: 'Toplam Mekan', value: allVenues.length.toString(), change: '+12', color: 'blue' },
    { label: 'Onay Bekleyen', value: '0', change: '+0', color: 'yellow' },
    { label: 'Bu Ay Eklenen', value: allVenues.length.toString(), change: '+' + allVenues.length, color: 'green' },
    { label: 'Reddedilen', value: '0', change: '-0', color: 'red' },
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      approved: { bg: 'bg-green-100', text: 'text-green-700', label: 'Onaylandı', icon: CheckCircle },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Beklemede', icon: Clock },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', label: 'Reddedildi', icon: XCircle },
    };
    const badge = badges[status as keyof typeof badges];
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${badge.bg} ${badge.text}`}>
        <Icon className="w-4 h-4" />
        {badge.label}
      </span>
    );
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mekanlar</h1>
        <p className="text-gray-600">Mekan onayları, düzenlemeler ve yönetimi</p>
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
              placeholder="Mekan ara..."
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
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'pending' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bekleyen
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'approved' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Onaylı
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Mekan</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Kategori</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Konum</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Puan</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Görüntülenme</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Durum</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ekleyen</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredVenues.map((venue) => (
                  <tr key={venue.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{venue.name}</div>
                      <div className="text-sm text-gray-500">{venue.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                        {venue.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{venue.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-gray-900">{venue.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Eye className="w-4 h-4" />
                        <span>{venue.views.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(venue.status)}</td>
                    <td className="px-6 py-4 text-gray-600">{venue.submittedBy}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/mekanlar/${venue.id}`} className="p-2 hover:bg-gray-100 rounded-lg transition" title="Görüntüle">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </Link>
                        <Link href={`/admin/mekanlar/${venue.id}`} className="p-2 hover:bg-gray-100 rounded-lg transition" title="Düzenle">
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
            <span className="font-medium text-gray-900">{filteredVenues.length}</span> mekan gösteriliyor
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
