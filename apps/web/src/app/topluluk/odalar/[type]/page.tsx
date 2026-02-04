'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Users, MessageCircle, Send, Image, Smile } from 'lucide-react';
import { useState } from 'react';

export default function OdaDetayPage() {
  const params = useParams();
  const type = params.type as string;
  const [message, setMessage] = useState('');

  const roomData: Record<string, any> = {
    general: {
      name: 'Genel Sohbet',
      description: 'Fotoğraf ve mekanlar hakkında genel sohbet',
      members: 2341,
      activeNow: 145,
    },
    equipment: {
      name: 'Ekipman Tartışmaları',
      description: 'Kamera, lens ve ekipman önerileri',
      members: 892,
      activeNow: 45,
    },
    technical: {
      name: 'Teknik Sorular',
      description: 'Fotoğrafçılık teknikleri ve ipuçları',
      members: 567,
      activeNow: 28,
    },
    venues: {
      name: 'Mekan Önerileri',
      description: 'Yeni mekanlar keşfet ve öner',
      members: 1123,
      activeNow: 67,
    },
  };

  const room = roomData[type] || roomData.general;

  const messages = [
    {
      id: 1,
      user: 'Ahmet Yılmaz',
      avatar: 'https://ui-avatars.com/api/?name=Ahmet+Yilmaz&background=f97316&color=fff',
      message: 'Merhaba arkadaşlar! Bugün Kadıköy\'de harika fotoğraflar çektim 📸',
      time: '14:30',
      isOnline: true,
    },
    {
      id: 2,
      user: 'Zeynep Kaya',
      avatar: 'https://ui-avatars.com/api/?name=Zeynep+Kaya&background=f97316&color=fff',
      message: 'Süper! Hangi lens kullandın?',
      time: '14:32',
      isOnline: true,
    },
    {
      id: 3,
      user: 'Mehmet Demir',
      avatar: 'https://ui-avatars.com/api/?name=Mehmet+Demir&background=f97316&color=fff',
      message: 'Ben de oradaydım, belki görüşmüşüzdür 😊',
      time: '14:35',
      isOnline: false,
    },
    {
      id: 4,
      user: 'Ayşe Şahin',
      avatar: 'https://ui-avatars.com/api/?name=Ayse+Sahin&background=f97316&color=fff',
      message: 'Cumartesi yeni bir fotoğraf yürüyüşü düzenliyorum, katılmak isteyen var mı?',
      time: '14:38',
      isOnline: true,
    },
    {
      id: 5,
      user: 'Can Özkan',
      avatar: 'https://ui-avatars.com/api/?name=Can+Ozkan&background=f97316&color=fff',
      message: 'Ben varım! Saat kaçta?',
      time: '14:40',
      isOnline: true,
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/topluluk" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{room.name}</h1>
                <p className="text-sm text-gray-600">{room.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{room.members.toLocaleString()} üye</span>
                </div>
                <div className="flex items-center gap-1 text-green-600 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>{room.activeNow} aktif</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className="flex gap-3">
                <div className="relative">
                  <img src={msg.avatar} alt={msg.user} className="w-10 h-10 rounded-full" />
                  {msg.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{msg.user}</span>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-gray-100">
                    <p className="text-gray-700">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <button
              type="button"
              className="p-3 hover:bg-gray-100 rounded-lg transition"
              title="Fotoğraf ekle"
            >
              <Image className="w-5 h-5 text-gray-600" />
            </button>
            <button
              type="button"
              className="p-3 hover:bg-gray-100 rounded-lg transition"
              title="Emoji ekle"
            >
              <Smile className="w-5 h-5 text-gray-600" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Mesajınızı yazın..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-xl hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Bu özellik şu an demo modunda. Grupo Pro entegrasyonu sonrası aktif olacak.
          </p>
        </div>
      </div>
    </div>
  );
}
