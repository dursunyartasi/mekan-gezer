'use client';

import { useState } from 'react';
import { MessageCircle, Users, AlertTriangle, Eye, Trash2, Ban, CheckCircle } from 'lucide-react';

export default function AdminToplulukPage() {
  const [activeTab, setActiveTab] = useState('rooms');

  const rooms = [
    { id: 1, name: 'İstanbul Genel', type: 'city', members: 1247, messages: 15420, activeNow: 89, status: 'active' },
    { id: 2, name: 'Ankara Genel', type: 'city', members: 456, messages: 5680, activeNow: 23, status: 'active' },
    { id: 3, name: 'Kadıköy', type: 'district', members: 345, messages: 4230, activeNow: 15, status: 'active' },
    { id: 4, name: 'Ekipman Tartışmaları', type: 'topic', members: 892, messages: 12560, activeNow: 45, status: 'active' },
    { id: 5, name: 'Teknik Sorular', type: 'topic', members: 567, messages: 8920, activeNow: 28, status: 'active' },
  ];

  const reports = [
    { id: 1, reportedBy: 'Ahmet Y.', targetUser: 'Troll123', room: 'İstanbul Genel', reason: 'Spam', date: '2024-02-04 14:30', status: 'pending' },
    { id: 2, reportedBy: 'Zeynep K.', targetUser: 'BadUser456', room: 'Ekipman', reason: 'Hakaret', date: '2024-02-04 12:15', status: 'pending' },
    { id: 3, reportedBy: 'Mehmet D.', targetUser: 'Spammer789', room: 'Ankara Genel', reason: 'Reklam', date: '2024-02-03 18:45', status: 'resolved' },
    { id: 4, reportedBy: 'Ayşe S.', targetUser: 'Offensive1', room: 'Kadıköy', reason: 'Uygunsuz İçerik', date: '2024-02-03 10:20', status: 'pending' },
  ];

  const stats = [
    { label: 'Toplam Oda', value: '45', change: '+3' },
    { label: 'Aktif Kullanıcı', value: '145', change: '+12' },
    { label: 'Toplam Mesaj (Bugün)', value: '2.4K', change: '+234' },
    { label: 'Bekleyen Rapor', value: '12', change: '+3' },
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'pending') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
          <AlertTriangle className="w-4 h-4" />
          Beklemede
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
        <CheckCircle className="w-4 h-4" />
        Çözüldü
      </span>
    );
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Topluluk Yönetimi</h1>
        <p className="text-gray-600">Sohbet odaları, raporlar ve moderasyon</p>
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

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('rooms')}
              className={`py-4 border-b-2 font-medium transition ${
                activeTab === 'rooms'
                  ? 'border-orange-500 text-orange-500'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Sohbet Odaları
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-4 border-b-2 font-medium transition ${
                activeTab === 'reports'
                  ? 'border-orange-500 text-orange-500'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Raporlar ({reports.filter((r) => r.status === 'pending').length})
            </button>
          </div>
        </div>

        {/* Rooms Tab */}
        {activeTab === 'rooms' && (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Oda Adı</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Tip</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Üye</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Mesajlar</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Aktif</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Durum</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {rooms.map((room) => (
                    <tr key={room.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-orange-500" />
                          </div>
                          <span className="font-medium text-gray-900">{room.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {room.type === 'city' ? 'Şehir' : room.type === 'district' ? 'İlçe' : 'Konu'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{room.members.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-gray-600">{room.messages.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1 text-green-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="font-medium">{room.activeNow}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          Aktif
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition" title="Görüntüle">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
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
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Rapor Eden</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Hedef Kullanıcı</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Oda</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Sebep</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Tarih</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Durum</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-gray-900">{report.reportedBy}</td>
                      <td className="px-4 py-4">
                        <span className="font-medium text-gray-900">{report.targetUser}</span>
                      </td>
                      <td className="px-4 py-4 text-gray-600">{report.room}</td>
                      <td className="px-4 py-4">
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                          {report.reason}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{report.date}</td>
                      <td className="px-4 py-4">{getStatusBadge(report.status)}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {report.status === 'pending' && (
                            <>
                              <button className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">
                                Onayla
                              </button>
                              <button className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition">
                                Reddet
                              </button>
                              <button className="p-2 hover:bg-gray-100 rounded-lg transition" title="Kullanıcıyı Banla">
                                <Ban className="w-4 h-4 text-red-600" />
                              </button>
                            </>
                          )}
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition" title="Detay">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
