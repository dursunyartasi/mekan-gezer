'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Calendar, MapPin, Users, Star, Filter, Clock, Camera, Compass, ArrowLeft, TrendingUp } from 'lucide-react';
import { events as allEvents, getUniqueEventCategories } from '@/data/mockEvents';

export default function EtkinliklerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get dynamic categories from actual data
  const categoryData = useMemo(() => getUniqueEventCategories(), []);
  const categories = [
    { id: 'all', name: 'Tümü', count: allEvents.length },
    ...categoryData,
  ];

  // Count free events
  const freeEventsCount = useMemo(() => allEvents.filter(e => e.price === 0).length, []);

  // Additional filters
  const additionalFilters = [
    { id: 'free', name: 'Ücretsiz', count: freeEventsCount },
  ];

  const filters = [...categories, ...additionalFilters];

  // Filter events based on search and category
  const events = useMemo(() => {
    return allEvents.filter(event => {
      let matchesFilter = true;

      if (selectedCategory === 'free') {
        matchesFilter = event.price === 0;
      } else if (selectedCategory !== 'all') {
        matchesFilter = event.category.toLowerCase() === selectedCategory.toLowerCase();
      }

      const matchesSearch = searchQuery === '' ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const upcomingHighlight = events.length > 0 ? events[0] : null;

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
              <Link href="/etkinlikler" className="text-orange-500 font-semibold">Etkinlikler</Link>
              <Link href="/topluluk" className="text-gray-700 hover:text-orange-500 transition">Topluluk</Link>
              <Link href="/login" className="text-gray-700 hover:text-orange-500 transition">Giriş</Link>
              <Link href="/register" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg transition">
                Kayıt Ol
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-6 transition">
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfa
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-orange-500">Etkinliklere</span> Katıl
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Fotoğraf yürüyüşleri, workshoplar ve meetup'lara katılarak topluluğa dahil ol
          </p>

          {/* Search & Filter */}
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1 relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Etkinlik ara..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:outline-none transition"
              />
            </div>
            <button className="bg-white border-2 border-gray-200 px-6 py-4 rounded-2xl hover:border-orange-500 transition flex items-center gap-2 justify-center">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filtrele</span>
            </button>
            <Link
              href="/etkinlikler/yeni"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl hover:shadow-lg transition flex items-center gap-2 justify-center"
            >
              <Camera className="w-5 h-5" />
              <span className="font-semibold">Etkinlik Oluştur</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b border-gray-200 sticky top-[73px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedCategory(filter.id)}
                className={`px-5 py-2.5 rounded-full whitespace-nowrap font-medium transition ${
                  selectedCategory === filter.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.name} <span className="text-sm opacity-75">({filter.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Event */}
      {upcomingHighlight && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-900">Öne Çıkan Etkinlik</h2>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={upcomingHighlight.image}
                alt={upcomingHighlight.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-1.5 bg-orange-500 rounded-full text-sm font-semibold">
                    {upcomingHighlight.category}
                  </span>
                  {upcomingHighlight.price === 0 ? (
                    <span className="px-4 py-1.5 bg-green-500 rounded-full text-sm font-semibold">
                      Ücretsiz
                    </span>
                  ) : (
                    <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                      ₺{upcomingHighlight.price}
                    </span>
                  )}
                  <div className="flex items-center gap-1 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm">{upcomingHighlight.rating}</span>
                  </div>
                </div>

                <h3 className="text-4xl font-bold mb-4">{upcomingHighlight.title}</h3>
                <p className="text-lg text-gray-200 mb-6 max-w-2xl">{upcomingHighlight.description}</p>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-300">Tarih</div>
                      <div className="font-semibold">{upcomingHighlight.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-300">Saat</div>
                      <div className="font-semibold">{upcomingHighlight.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-300">Katılımcı</div>
                      <div className="font-semibold">
                        {upcomingHighlight.participants}/{upcomingHighlight.maxParticipants}
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/etkinlikler/${upcomingHighlight.id}`}
                  className="inline-flex items-center gap-2 bg-white text-orange-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition"
                >
                  Detayları Gör & Katıl
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Events Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tüm Etkinlikler</h2>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{events.length}</span> etkinlik bulundu
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sırala:</span>
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500">
                <option>En Yakın Tarih</option>
                <option>En Popüler</option>
                <option>En Yüksek Puan</option>
                <option>Ücretsiz Önce</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(1).map((event) => (
              <div key={event.id} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                  <Link href={`/etkinlikler/${event.id}`}>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1.5 bg-orange-500 text-white text-xs font-semibold rounded-full">
                      {event.category}
                    </span>
                    {event.price === 0 ? (
                      <span className="px-3 py-1.5 bg-green-500 text-white text-xs font-semibold rounded-full">
                        Ücretsiz
                      </span>
                    ) : (
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold rounded-full">
                        ₺{event.price}
                      </span>
                    )}
                  </div>

                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm">{event.rating}</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white text-sm mb-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <Link href={`/etkinlikler/${event.id}`}>
                    <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-orange-500 transition">
                      {event.title}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{event.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        <span className="font-semibold text-gray-900">{event.participants}</span>/{event.maxParticipants}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {event.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
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
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
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
