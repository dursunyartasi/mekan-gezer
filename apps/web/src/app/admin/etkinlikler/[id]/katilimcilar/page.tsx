'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Mail, Phone, Calendar, CheckCircle, Clock, XCircle, Search } from 'lucide-react';

export default function EtkinlikKatilimcilarPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Mock data - gerçek API'den gelecek
  const event = {
    id: id,
    title: 'Kadıköy Sokakları Foto Yürüyüşü',
    date: '2024-02-15',
    time: '14:00',
    capacity: 30,
  };

  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      phone: '+90 532 123 45 67',
      registeredAt: '2024-02-01 14:30',
      status: 'confirmed',
      avatar: 'https://ui-avatars.com/api/?name=Ahmet+Yilmaz&background=f97316&color=fff',
    },
    {
      id: 2,
      name: 'Zeynep Kaya',
      email: 'zeynep@example.com',
      phone: '+90 533 234 56 78',
      registeredAt: '2024-02-01 15:45',
      status: 'confirmed',
      avatar: 'https://ui-avatars.com/api/?name=Zeynep+Kaya&background=f97316&color=fff',
    },
    {
      id: 3,
      name: 'Mehmet Demir',
      email: 'mehmet@example.com',
      phone: '+90 534 345 67 89',
      registeredAt: '2024-02-02 10:20',
      status: 'confirmed',
      avatar: 'https://ui-avatars.com/api/?name=Mehmet+Demir&background=f97316&color=fff',
    },
    {
      id: 4,
      name: 'Ayşe Şahin',
      email: 'ayse@example.com',
      phone: '+90 535 456 78 90',
      registeredAt: '2024-02-02 16:30',
      status: 'waitlist',
      avatar: 'https://ui-avatars.com/api/?name=Ayse+Sahin&background=f97316&color=fff',
    },
    {
      id: 5,
      name: 'Can Özkan',
      email: 'can@example.com',
      phone: '+90 536 567 89 01',
      registeredAt: '2024-02-03 09:15',
      status: 'confirmed',
      avatar: 'https://ui-avatars.com/api/?name=Can+Ozkan&background=f97316&color=fff',
    },
    {
      id: 6,
      name: 'Elif Yıldız',
      email: 'elif@example.com',
      phone: '+90 537 678 90 12',
      registeredAt: '2024-02-03 11:45',
      status: 'cancelled',
      avatar: 'https://ui-avatars.com/api/?name=Elif+Yildiz&background=f97316&color=fff',
    },
  ]);

  // Handler functions for approval and cancellation
  const handleApprove = (participantId: number) => {
    setParticipants(prev =>
      prev.map(p =>
        p.id === participantId ? { ...p, status: 'confirmed' } : p
      )
    );
    setToast({ message: 'Katılımcı onaylandı!', type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCancel = (participantId: number) => {
    if (confirm('Bu katılımcıyı iptal etmek istediğinizden emin misiniz?')) {
      setParticipants(prev =>
        prev.map(p =>
          p.id === participantId ? { ...p, status: 'cancelled' } : p
        )
      );
      setToast({ message: 'Katılımcı iptal edildi!', type: 'error' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const stats = [
    { label: 'Onaylı', value: participants.filter(p => p.status === 'confirmed').length, color: 'green' },
    { label: 'Bekleme Listesi', value: participants.filter(p => p.status === 'waitlist').length, color: 'yellow' },
    { label: 'İptal', value: participants.filter(p => p.status === 'cancelled').length, color: 'red' },
    { label: 'Toplam', value: participants.length, color: 'blue' },
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      confirmed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Onaylandı', icon: CheckCircle },
      waitlist: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Bekleme Listesi', icon: Clock },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'İptal Edildi', icon: XCircle },
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

  const handleExportCSV = () => {
    const filteredParticipants = participants.filter((p) =>
      filterStatus === 'all' || p.status === filterStatus
    );

    const csvContent = [
      ['Ad Soyad', 'Email', 'Telefon', 'Kayıt Tarihi', 'Durum'],
      ...filteredParticipants.map(p => [
        p.name,
        p.email,
        p.phone,
        p.registeredAt,
        p.status === 'confirmed' ? 'Onaylandı' : p.status === 'waitlist' ? 'Bekleme Listesi' : 'İptal Edildi'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `etkinlik-${id}-katilimcilar.csv`;
    link.click();
  };

  const handleExportExcel = () => {
    alert('Excel export özelliği yakında eklenecek. Şimdilik CSV formatında indirilebilir.');
    handleExportCSV();
  };

  const filteredParticipants = participants.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.phone.includes(searchQuery);
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white font-medium animate-fade-in-down`}>
          {toast.message}
        </div>
      )}

      <div className="mb-6">
        <Link href={`/admin/etkinlikler/${id}`} className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition mb-4">
          <ArrowLeft className="w-4 h-4" />
          Etkinliğe Dön
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
        <p className="text-gray-600">Katılımcı Listesi</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Filters & Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 flex gap-4 w-full md:w-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Katılımcı ara..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="confirmed">Onaylı</option>
              <option value="waitlist">Bekleme Listesi</option>
              <option value="cancelled">İptal Edildi</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleExportCSV}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              CSV İndir
            </button>
            <button
              onClick={handleExportExcel}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Excel İndir
            </button>
          </div>
        </div>
      </div>

      {/* Participants Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Katılımcı</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Telefon</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Kayıt Tarihi</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Durum</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredParticipants.map((participant) => (
                <tr key={participant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={participant.avatar} alt={participant.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="font-medium text-gray-900">{participant.name}</div>
                        <div className="text-sm text-gray-500">ID: {participant.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a href={`mailto:${participant.email}`} className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{participant.email}</span>
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <a href={`tel:${participant.phone}`} className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{participant.phone}</span>
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{participant.registeredAt}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(participant.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {participant.status === 'waitlist' && (
                        <button
                          onClick={() => handleApprove(participant.id)}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition"
                        >
                          Onayla
                        </button>
                      )}
                      {participant.status === 'confirmed' && (
                        <button
                          onClick={() => handleCancel(participant.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition"
                        >
                          İptal Et
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredParticipants.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500">Katılımcı bulunamadı</p>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="text-sm text-gray-600">
            Toplam <span className="font-medium text-gray-900">{filteredParticipants.length}</span> katılımcı gösteriliyor
          </div>
        </div>
      </div>
    </div>
  );
}
