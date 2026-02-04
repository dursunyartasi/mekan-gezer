'use client';

import { useState } from 'react';
import { Search, User, Mail, Calendar, Shield, Ban, Edit, Eye, CheckCircle, XCircle, X } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
  events: number;
  venues: number;
  avatar: string;
}

export default function AdminKullanicilarPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const users = [
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', role: 'admin', status: 'active', joinDate: '2024-01-15', events: 15, venues: 23, avatar: 'https://ui-avatars.com/api/?name=Ahmet+Yilmaz&background=f97316&color=fff' },
    { id: 2, name: 'Zeynep Kaya', email: 'zeynep@example.com', role: 'moderator', status: 'active', joinDate: '2024-01-20', events: 8, venues: 12, avatar: 'https://ui-avatars.com/api/?name=Zeynep+Kaya&background=f97316&color=fff' },
    { id: 3, name: 'Mehmet Demir', email: 'mehmet@example.com', role: 'creator', status: 'active', joinDate: '2024-01-25', events: 12, venues: 5, avatar: 'https://ui-avatars.com/api/?name=Mehmet+Demir&background=f97316&color=fff' },
    { id: 4, name: 'Ayşe Şahin', email: 'ayse@example.com', role: 'user', status: 'active', joinDate: '2024-02-01', events: 3, venues: 7, avatar: 'https://ui-avatars.com/api/?name=Ayse+Sahin&background=f97316&color=fff' },
    { id: 5, name: 'Can Özkan', email: 'can@example.com', role: 'user', status: 'banned', joinDate: '2024-01-10', events: 0, venues: 0, avatar: 'https://ui-avatars.com/api/?name=Can+Ozkan&background=f97316&color=fff' },
  ];

  const stats = [
    { label: 'Toplam Kullanıcı', value: '2,341', change: '+124', color: 'blue' },
    { id: 2, name: 'Aktif Kullanıcı', value: '2,100', change: '+89', color: 'green' },
    { label: 'Yeni Üyeler (Bu Ay)', value: '156', change: '+23', color: 'purple' },
    { label: 'Banlı Kullanıcı', value: '8', change: '+1', color: 'red' },
  ];

  const getRoleBadge = (role: string) => {
    const roles = {
      admin: { bg: 'bg-red-100', text: 'text-red-700', label: 'Admin', icon: Shield },
      moderator: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Moderatör', icon: Shield },
      creator: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'İçerik Üreticisi', icon: User },
      user: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Kullanıcı', icon: User },
    };
    const roleData = roles[role as keyof typeof roles];
    const Icon = roleData.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${roleData.bg} ${roleData.text}`}>
        <Icon className="w-4 h-4" />
        {roleData.label}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
          <CheckCircle className="w-4 h-4" />
          Aktif
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
        <Ban className="w-4 h-4" />
        Banlı
      </span>
    );
  };

  // Filter and search users
  const filteredUsers = users
    .filter((user) => filter === 'all' || user.status === filter)
    .filter((user) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.id.toString().includes(query)
      );
    });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kullanıcılar</h1>
        <p className="text-gray-600">Kullanıcı yönetimi ve roller</p>
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
              placeholder="Kullanıcı ara..."
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
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'active' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Aktif
            </button>
            <button
              onClick={() => setFilter('banned')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'banned' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Banlı
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Kullanıcı</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">E-posta</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rol</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Durum</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Katılım Tarihi</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Aktivite</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                    <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{user.joinDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        <div>{user.events} etkinlik</div>
                        <div>{user.venues} mekan</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition" title="Görüntüle">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingUser(user);
                            setShowEditModal(true);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg transition"
                          title="Düzenle"
                        >
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition" title="Banla">
                          <Ban className="w-4 h-4 text-red-600" />
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
            <span className="font-medium text-gray-900">{filteredUsers.length}</span> kullanıcı gösteriliyor
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

      {/* Edit Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Kullanıcıyı Düzenle</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingUser(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <img src={editingUser.avatar} alt={editingUser.name} className="w-20 h-20 rounded-full" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{editingUser.name}</h3>
                  <p className="text-sm text-gray-500">ID: {editingUser.id}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rol</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="user">Kullanıcı</option>
                  <option value="creator">İçerik Üreticisi</option>
                  <option value="moderator">Moderatör</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
                <select
                  value={editingUser.status}
                  onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="active">Aktif</option>
                  <option value="banned">Banlı</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Etkinlik Sayısı</label>
                  <input
                    type="number"
                    value={editingUser.events}
                    onChange={(e) => setEditingUser({ ...editingUser, events: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mekan Sayısı</label>
                  <input
                    type="number"
                    value={editingUser.venues}
                    onChange={(e) => setEditingUser({ ...editingUser, venues: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Katılım Tarihi</label>
                <input
                  type="date"
                  value={editingUser.joinDate}
                  onChange={(e) => setEditingUser({ ...editingUser, joinDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingUser(null);
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium"
              >
                İptal
              </button>
              <button
                onClick={() => {
                  alert('Kullanıcı güncellendi!');
                  setShowEditModal(false);
                  setEditingUser(null);
                }}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
