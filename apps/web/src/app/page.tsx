// app/page.tsx
'use client';

import Link from 'next/link';
import { Compass, MapPin, Calendar, Users, Camera, ArrowRight, Star, Instagram } from 'lucide-react';
import { useState } from 'react';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredEvents = [
    {
      id: 1,
      title: 'Kadıköy Sokakları Foto Yürüyüşü',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
      date: '15 Şubat 2024',
      participants: 24,
      location: 'Kadıköy, İstanbul',
      rating: 4.8,
    },
    {
      id: 2,
      title: 'Galata Kulesi & Çevresi',
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800',
      date: '18 Şubat 2024',
      participants: 18,
      location: 'Galata, İstanbul',
      rating: 4.9,
    },
    {
      id: 3,
      title: 'Boğaz Kıyısı Gün Batımı',
      image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800',
      date: '20 Şubat 2024',
      participants: 32,
      location: 'Ortaköy, İstanbul',
      rating: 4.7,
    },
  ];

  const popularVenues = [
    {
      id: 1,
      name: 'Kahve Dünyası Moda',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600',
      category: 'Cafe',
      rating: 4.5,
      location: 'Moda, Kadıköy',
    },
    {
      id: 2,
      name: 'İstanbul Modern',
      image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600',
      category: 'Müze',
      rating: 4.8,
      location: 'Karaköy',
    },
    {
      id: 3,
      name: 'Maçka Parkı',
      image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600',
      category: 'Park',
      rating: 4.6,
      location: 'Maçka, Şişli',
    },
    {
      id: 4,
      name: 'Pera Müzesi',
      image: 'https://images.unsplash.com/photo-1596386461350-326ccb871a9d?w=600',
      category: 'Müze',
      rating: 4.7,
      location: 'Beyoğlu',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Compass className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Mekan Gezer
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/mekanlar" className="text-gray-700 hover:text-orange-500 font-medium transition">Mekanlar</Link>
            <Link href="/etkinlikler" className="text-gray-700 hover:text-orange-500 font-medium transition">Etkinlikler</Link>
            <Link href="/topluluk" className="text-gray-700 hover:text-orange-500 font-medium transition">Topluluk</Link>
            <Link href="/login" className="text-gray-700 hover:text-orange-500 font-medium transition">Giriş</Link>
            <Link href="/register" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg transition">
              Kayıt Ol
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-orange-50 via-white to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-6">
                📸 Fotoğraf Topluluğu
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Unutulmaz<br />
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Anılar Oluştur
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                İstanbul'un en güzel mekanlarını keşfet, fotoğraf yürüyüşlerine katıl ve tutkunu olduğun insanlarla buluş
              </p>
              
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `/mekanlar?q=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                className="flex gap-3 mb-6"
              >
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Mekan veya etkinlik ara..."
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:outline-none transition"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl hover:shadow-lg transition flex items-center gap-2"
                >
                  Ara <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <div className="flex gap-8 text-sm">
                <div>
                  <div className="font-bold text-2xl text-gray-900">500+</div>
                  <div className="text-gray-500">Mekan</div>
                </div>
                <div>
                  <div className="font-bold text-2xl text-gray-900">50+</div>
                  <div className="text-gray-500">Etkinlik</div>
                </div>
                <div>
                  <div className="font-bold text-2xl text-gray-900">1200+</div>
                  <div className="text-gray-500">Üye</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img 
                    src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400" 
                    alt="Istanbul street"
                    className="rounded-3xl shadow-lg w-full h-48 object-cover"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400" 
                    alt="Galata tower"
                    className="rounded-3xl shadow-lg w-full h-64 object-cover"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400" 
                    alt="Bosphorus"
                    className="rounded-3xl shadow-lg w-full h-64 object-cover"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400" 
                    alt="Cafe"
                    className="rounded-3xl shadow-lg w-full h-48 object-cover"
                  />
                </div>
              </div>
              
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Bir sonraki yürüyüş</div>
                  <div className="text-sm text-gray-500">15 Şubat, Kadıköy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="text-orange-500 font-semibold mb-2">Yaklaşan Etkinlikler</div>
              <h2 className="text-4xl font-bold text-gray-900">Popüler <span className="text-orange-500">Yürüyüşler</span></h2>
            </div>
            <Link href="/etkinlikler" className="text-orange-500 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              Tümünü Gör <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <Link key={event.id} href={`/etkinlikler/${event.id}`} className="group">
                <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm">{event.rating}</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-bold text-xl mb-3 group-hover:text-orange-300 transition">{event.title}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{event.participants} kişi</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-sm text-orange-300">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Venues */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-orange-500 font-semibold mb-2">Keşfet</div>
            <h2 className="text-4xl font-bold text-gray-900">Popüler <span className="text-orange-500">Mekanlar</span></h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Fotoğrafçıların en çok ziyaret ettiği, favorilerine eklediği mekanlar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularVenues.map((venue) => (
              <Link key={venue.id} href={`/mekanlar/${venue.id}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={venue.image} 
                      alt={venue.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-sm">{venue.rating}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full">
                        {venue.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition">{venue.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{venue.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/mekanlar" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition">
              Tüm Mekanları Keşfet <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-4">En Son Haberleri Al</h2>
            <p className="text-orange-100 mb-8 text-lg">
              Yeni etkinlikler, mekan önerileri ve topluluk haberlerinden haberdar ol
            </p>
            
            <div className="flex gap-3 max-w-md mx-auto">
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email adresin"
                className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button className="bg-white text-orange-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition whitespace-nowrap">
                Abone Ol
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Compass className="w-8 h-8 text-orange-500" />
                <span className="text-xl font-bold">Mekan Gezer</span>
              </div>
              <p className="text-gray-400 mb-4">
                İstanbul'u fotoğrafla keşfet, topluluğa katıl
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com/mekangezer" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Keşfet</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/mekanlar" className="hover:text-white transition">Mekanlar</Link></li>
                <li><Link href="/etkinlikler" className="hover:text-white transition">Etkinlikler</Link></li>
                <li><Link href="/topluluk" className="hover:text-white transition">Topluluk</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Şirket</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/hakkimizda" className="hover:text-white transition">Hakkımızda</Link></li>
                <li><Link href="/iletisim" className="hover:text-white transition">İletişim</Link></li>
                <li><Link href="/admin" className="hover:text-white transition">Admin</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Yasal</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/gizlilik" className="hover:text-white transition">Gizlilik Politikası</Link></li>
                <li><Link href="/kullanim" className="hover:text-white transition">Kullanım Koşulları</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Mekan Gezer. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
