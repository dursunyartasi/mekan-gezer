'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Search, MapPin, Star, Filter, Grid, Map, Heart, Compass, ArrowLeft } from 'lucide-react';
import { venues as allVenues, getUniqueCategories } from '@/data/mockVenues';

export default function MekanlarPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Get dynamic categories from actual data
  const categoryData = useMemo(() => getUniqueCategories(), []);
  const categories = [
    { id: 'all', name: 'Tümü', count: allVenues.length },
    ...categoryData,
  ];

  // Filter venues based on search and category
  const venues = useMemo(() => {
    return allVenues.filter(venue => {
      const matchesCategory = selectedCategory === 'all' || venue.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = searchQuery === '' ||
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

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
              <Link href="/mekanlar" className="text-orange-500 font-semibold">Mekanlar</Link>
              <Link href="/etkinlikler" className="text-gray-700 hover:text-orange-500 transition">Etkinlikler</Link>
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
            Mekanları <span className="text-orange-500">Keşfet</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            İstanbul'un en güzel mekanlarını keşfet, fotoğrafla, favorilerine ekle
          </p>

          {/* Search Bar */}
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Mekan ara... (örn: kafe, müze, park)"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:outline-none transition"
              />
            </div>
            <button className="bg-white border-2 border-gray-200 px-6 py-4 rounded-2xl hover:border-orange-500 transition flex items-center gap-2 justify-center">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filtrele</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-6 py-4 rounded-2xl transition ${
                  viewMode === 'grid'
                    ? 'bg-orange-500 text-white'
                    : 'bg-white border-2 border-gray-200 hover:border-orange-500'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-6 py-4 rounded-2xl transition ${
                  viewMode === 'map'
                    ? 'bg-orange-500 text-white'
                    : 'bg-white border-2 border-gray-200 hover:border-orange-500'
                }`}
              >
                <Map className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-white border-b border-gray-200 sticky top-[73px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2.5 rounded-full whitespace-nowrap font-medium transition ${
                  selectedCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} <span className="text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Venues Grid */}
      {viewMode === 'grid' && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-900">{venues.length}</span> mekan bulundu
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sırala:</span>
                <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500">
                  <option>En Popüler</option>
                  <option>En Yüksek Puan</option>
                  <option>En Çok Yorum</option>
                  <option>Yeni Eklenenler</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.map((venue) => (
                <div key={venue.id} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-56 overflow-hidden">
                    <Link href={`/mekanlar/${venue.id}`}>
                      <img
                        src={venue.image}
                        alt={venue.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </Link>
                    <button className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition">
                      <Heart className={`w-5 h-5 ${venue.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </button>
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-sm">{venue.rating}</span>
                      <span className="text-xs text-gray-500">({venue.reviewCount})</span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1.5 bg-orange-500 text-white text-xs font-semibold rounded-full">
                        {venue.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <Link href={`/mekanlar/${venue.id}`}>
                      <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-orange-500 transition">
                        {venue.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{venue.location}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{venue.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {venue.features.map((feature) => (
                        <span key={feature} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {feature}
                        </span>
                      ))}
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
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">3</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  Sonraki
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Map View */}
      {viewMode === 'map' && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="h-[600px] bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Harita görünümü yakında eklenecek</p>
                  <p className="text-sm text-gray-500 mt-2">Mapbox entegrasyonu ile mekanları harita üzerinde görebileceksiniz</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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
