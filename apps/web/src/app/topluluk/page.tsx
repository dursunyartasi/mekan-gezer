'use client';

import Link from 'next/link';
import { MessageCircle, Users, TrendingUp, Clock, Compass, ArrowLeft, Hash, Pin } from 'lucide-react';

export default function ToplulukPage() {
  const cities = [
    {
      id: 1,
      name: 'İstanbul',
      slug: 'istanbul',
      members: 1247,
      activeNow: 89,
      totalMessages: 15420,
      image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400',
      description: 'İstanbul fotoğrafçılarının buluşma noktası',
      districts: ['Kadıköy', 'Beyoğlu', 'Beşiktaş', 'Üsküdar', 'Şişli'],
    },
    {
      id: 2,
      name: 'Ankara',
      slug: 'ankara',
      members: 456,
      activeNow: 23,
      totalMessages: 5680,
      image: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=400',
      description: 'Başkent fotoğraf topluluğu',
      districts: ['Çankaya', 'Keçiören', 'Yenimahalle', 'Mamak'],
    },
    {
      id: 3,
      name: 'İzmir',
      slug: 'izmir',
      members: 623,
      activeNow: 34,
      totalMessages: 8920,
      image: 'https://images.unsplash.com/photo-1605894920903-5e6d8b895f62?w=400',
      description: 'Ege\'nin fotoğraf tutkunları',
      districts: ['Konak', 'Karşıyaka', 'Bornova', 'Alsancak'],
    },
  ];

  const popularRooms = [
    {
      id: 1,
      name: 'Genel Sohbet',
      type: 'general',
      members: 2341,
      activeNow: 145,
      lastActivity: '2 dakika önce',
      description: 'Fotoğraf ve mekanlar hakkında sohbet',
      icon: MessageCircle,
    },
    {
      id: 2,
      name: 'Ekipman Tartışmaları',
      type: 'equipment',
      members: 892,
      activeNow: 45,
      lastActivity: '5 dakika önce',
      description: 'Kamera, lens ve ekipman önerileri',
      icon: Hash,
    },
    {
      id: 3,
      name: 'Teknik Sorular',
      type: 'technical',
      members: 567,
      activeNow: 28,
      lastActivity: '12 dakika önce',
      description: 'Fotoğrafçılık teknikleri ve ipuçları',
      icon: TrendingUp,
    },
    {
      id: 4,
      name: 'Mekan Önerileri',
      type: 'venues',
      members: 1123,
      activeNow: 67,
      lastActivity: '1 dakika önce',
      description: 'Yeni mekanlar keşfet ve öner',
      icon: Pin,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      user: 'Ahmet Y.',
      avatar: 'https://ui-avatars.com/api/?name=Ahmet+Y&background=f97316&color=fff',
      action: 'yeni bir fotoğraf paylaştı',
      room: 'İstanbul - Kadıköy',
      time: '5 dakika önce',
    },
    {
      id: 2,
      user: 'Zeynep K.',
      avatar: 'https://ui-avatars.com/api/?name=Zeynep+K&background=f97316&color=fff',
      action: 'bir etkinlik oluşturdu',
      room: 'Etkinlikler',
      time: '15 dakika önce',
    },
    {
      id: 3,
      user: 'Mehmet D.',
      avatar: 'https://ui-avatars.com/api/?name=Mehmet+D&background=f97316&color=fff',
      action: 'bir mekan önerdi',
      room: 'Mekan Önerileri',
      time: '23 dakika önce',
    },
    {
      id: 4,
      user: 'Ayşe S.',
      avatar: 'https://ui-avatars.com/api/?name=Ayse+S&background=f97316&color=fff',
      action: 'bir soruya yanıt verdi',
      room: 'Teknik Sorular',
      time: '1 saat önce',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Compass className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Mekan Gezer
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/mekanlar" className="text-gray-700 hover:text-orange-500 transition">Mekanlar</Link>
              <Link href="/etkinlikler" className="text-gray-700 hover:text-orange-500 transition">Etkinlikler</Link>
              <Link href="/topluluk" className="text-orange-500 font-semibold">Topluluk</Link>
              <Link href="/login" className="text-gray-700 hover:text-orange-500 transition">Giriş</Link>
              <Link href="/register" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg transition">
                Kayıt Ol
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-6 transition">
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfa
          </Link>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-orange-500">Topluluğa</span> Katıl
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Binlerce fotoğraf tutkunu ile tanış, deneyimlerini paylaş ve yeni arkadaşlar edin
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-1">2,341</div>
                <div className="text-sm text-gray-600">Toplam Üye</div>
              </div>
              <div className="text-center border-x border-gray-200">
                <div className="text-3xl font-bold text-orange-500 mb-1">145</div>
                <div className="text-sm text-gray-600">Aktif Şimdi</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-1">30k+</div>
                <div className="text-sm text-gray-600">Mesaj</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Rooms */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Popüler Sohbet Odaları</h2>
            <p className="text-gray-600">En aktif odalar ve tartışmalar</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {popularRooms.map((room) => (
              <Link
                key={room.id}
                href={`/topluluk/odalar/${room.type}`}
                className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-orange-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <room.icon className="w-7 h-7 text-white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition">
                      {room.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{room.description}</p>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{room.members.toLocaleString()} üye</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span>{room.activeNow} aktif</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-3">
                      <Clock className="w-3 h-3" />
                      <span>Son aktivite: {room.lastActivity}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* City Rooms */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Şehir Odaları</h2>
            <p className="text-gray-600">Şehrindeki fotoğrafçılarla buluş</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {cities.map((city) => (
              <div key={city.id} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{city.name}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{city.members.toLocaleString()}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1 text-green-300">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span>{city.activeNow} aktif</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4">{city.description}</p>

                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-2">Popüler İlçeler:</div>
                    <div className="flex flex-wrap gap-2">
                      {city.districts.slice(0, 3).map((district) => (
                        <span key={district} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {district}
                        </span>
                      ))}
                      {city.districts.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{city.districts.length - 3} daha
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <MessageCircle className="w-4 h-4" />
                    <span>{city.totalMessages.toLocaleString()} mesaj</span>
                  </div>

                  <Link
                    href={`/topluluk/sehir/${city.slug}`}
                    className="block w-full text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition"
                  >
                    Sohbete Katıl
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Son Aktiviteler</h2>
              <p className="text-gray-600">Toplulukta neler oluyor?</p>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-orange-500 transition">
                  <div className="flex items-start gap-4">
                    <img
                      src={activity.avatar}
                      alt={activity.user}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{activity.user}</span>
                        <span className="text-gray-600">{activity.action}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-orange-500 font-medium">{activity.room}</span>
                        <span className="text-gray-400">•</span>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/topluluk/aktiviteler"
                className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:gap-3 transition-all"
              >
                Tüm Aktiviteleri Gör
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Topluluğa Katılmaya Hazır mısın?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Ücretsiz hesap oluştur ve binlerce fotoğraf tutkunu ile tanış
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-orange-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Hemen Kayıt Ol
            </Link>
            <Link
              href="/login"
              className="bg-white/20 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition"
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Compass className="w-6 h-6 text-orange-500" />
            <span className="text-lg font-bold">Mekan Gezer</span>
          </div>
          <p className="text-gray-400 mb-4">İstanbul'u fotoğrafla keşfet</p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <Link href="/hakkimizda" className="hover:text-white transition">Hakkımızda</Link>
            <Link href="/iletisim" className="hover:text-white transition">İletişim</Link>
            <Link href="/gizlilik" className="hover:text-white transition">Gizlilik</Link>
            <Link href="/kullanim" className="hover:text-white transition">Kullanım Koşulları</Link>
          </div>
          <p className="text-gray-500 text-sm mt-6">&copy; 2024 Mekan Gezer. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
