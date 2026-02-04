'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MapPin, Star, Heart, Share2, Calendar, Clock, Phone, Globe, Instagram, Camera, ArrowLeft, User } from 'lucide-react';

export default function MekanDetayPage() {
  const params = useParams();
  const id = params.id;

  // Mock data - gerçek API'den gelecek
  const venue = {
    id: id,
    name: 'Kahve Dünyası Moda',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600',
    ],
    category: 'Kafe',
    rating: 4.5,
    reviewCount: 128,
    location: 'Moda, Kadıköy',
    address: 'Moda Caddesi No: 45, Kadıköy, İstanbul',
    city: 'İstanbul',
    district: 'Kadıköy',
    neighborhood: 'Moda',
    coordinates: { lat: 40.9875, lng: 29.0267 },
    description: 'Boğaz manzaralı, huzurlu bir kafe. Fotoğraf çekimi için mükemmel aydınlatma ve estetik dekorasyon. Sabah saatleri özellikle fotoğraf için idealdir.',
    features: ['WiFi', 'Dış Mekan', 'Köpek Dostu', 'Kahvaltı', 'Boğaz Manzarası', 'Fotoğraf İzni'],
    openingHours: {
      monday: '08:00 - 23:00',
      tuesday: '08:00 - 23:00',
      wednesday: '08:00 - 23:00',
      thursday: '08:00 - 23:00',
      friday: '08:00 - 00:00',
      saturday: '09:00 - 00:00',
      sunday: '09:00 - 23:00',
    },
    contact: {
      phone: '+90 216 123 45 67',
      website: 'https://kahvedunyasi.com',
      instagram: '@kahvedunyasimoda',
    },
    isFavorite: false,
    photoTips: [
      'Sabah 09:00-11:00 arası en iyi doğal ışık',
      'Pencere kenarı masalar boğaz manzarası için ideal',
      'Dış mekanda gün batımı çekimleri muhteşem',
      'İç mekanda sıcak ışık filtresi kullanın',
    ],
  };

  const reviews = [
    {
      id: 1,
      user: {
        name: 'Ahmet Yılmaz',
        avatar: 'https://ui-avatars.com/api/?name=Ahmet+Yilmaz&background=f97316&color=fff',
      },
      rating: 5,
      date: '2 gün önce',
      comment: 'Harika bir mekan! Fotoğraf çekimi için mükemmel. Personel çok yardımcı oldu.',
      images: [
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200',
        'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=200',
      ],
    },
    {
      id: 2,
      user: {
        name: 'Zeynep Kaya',
        avatar: 'https://ui-avatars.com/api/?name=Zeynep+Kaya&background=f97316&color=fff',
      },
      rating: 4,
      date: '1 hafta önce',
      comment: 'Manzara muhteşem. Kahveler de çok lezzetli. Biraz kalabalık olabiliyor.',
      images: [],
    },
    {
      id: 3,
      user: {
        name: 'Mehmet Demir',
        avatar: 'https://ui-avatars.com/api/?name=Mehmet+Demir&background=f97316&color=fff',
      },
      rating: 5,
      date: '2 hafta önce',
      comment: 'Fotoğraf yürüyüşümüzde uğradık. Harika bir durak oldu!',
      images: [
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Camera className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Mekan Gezer
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/mekanlar" className="text-orange-500 font-semibold">Mekanlar</Link>
              <Link href="/etkinlikler" className="text-gray-700 hover:text-orange-500 transition">Etkinlikler</Link>
              <Link href="/topluluk" className="text-gray-700 hover:text-orange-500 transition">Topluluk</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <section className="pt-20">
        <div className="relative h-[500px]">
          <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute top-8 left-8">
            <Link href="/mekanlar" className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-gray-900 hover:bg-white transition">
              <ArrowLeft className="w-4 h-4" />
              Geri
            </Link>
          </div>

          <div className="absolute bottom-8 left-8 right-8 text-white">
            <div className="container mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1.5 bg-orange-500 rounded-full text-sm font-semibold">
                  {venue.category}
                </span>
                <div className="flex items-center gap-1 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{venue.rating}</span>
                  <span className="text-sm opacity-80">({venue.reviewCount} değerlendirme)</span>
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-4">{venue.name}</h1>
              <div className="flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5" />
                <span>{venue.address}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-4">
            {venue.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${venue.name} ${index + 1}`}
                className="w-full h-48 object-cover rounded-xl hover:opacity-80 transition cursor-pointer"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Actions */}
              <div className="flex gap-4">
                <button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  Favorilere Ekle
                </button>
                <button className="bg-white border-2 border-gray-200 px-6 py-3 rounded-xl hover:border-orange-500 transition">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Hakkında</h2>
                <p className="text-gray-600 leading-relaxed">{venue.description}</p>
              </div>

              {/* Features */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Özellikler</h2>
                <div className="flex flex-wrap gap-3">
                  {venue.features.map((feature, index) => (
                    <span key={index} className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Photo Tips */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Camera className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Fotoğraf İpuçları</h2>
                </div>
                <ul className="space-y-3">
                  {venue.photoTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Değerlendirmeler ({venue.reviewCount})</h2>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                      <div className="flex items-start gap-4">
                        <img src={review.user.avatar} alt={review.user.name} className="w-12 h-12 rounded-full" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900">{review.user.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-3">{review.comment}</p>
                          {review.images.length > 0 && (
                            <div className="flex gap-2">
                              {review.images.map((img, idx) => (
                                <img key={idx} src={img} alt="" className="w-20 h-20 object-cover rounded-lg" />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-3 border-2 border-gray-200 rounded-xl font-semibold hover:border-orange-500 hover:text-orange-500 transition">
                  Tüm Yorumları Gör
                </button>
              </div>
            </div>

            {/* Right Column - Info Card */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">İletişim Bilgileri</h3>

                <div className="space-y-4 mb-6">
                  <a href={`tel:${venue.contact.phone}`} className="flex items-center gap-3 text-gray-600 hover:text-orange-500 transition">
                    <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-orange-500" />
                    </div>
                    <span>{venue.contact.phone}</span>
                  </a>

                  <a href={venue.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-orange-500 transition">
                    <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-orange-500" />
                    </div>
                    <span>Website</span>
                  </a>

                  <a href={`https://instagram.com/${venue.contact.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-orange-500 transition">
                    <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                      <Instagram className="w-5 h-5 text-orange-500" />
                    </div>
                    <span>{venue.contact.instagram}</span>
                  </a>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    Çalışma Saatleri
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pazartesi</span>
                      <span className="font-medium text-gray-900">{venue.openingHours.monday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Salı</span>
                      <span className="font-medium text-gray-900">{venue.openingHours.tuesday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Çarşamba</span>
                      <span className="font-medium text-gray-900">{venue.openingHours.wednesday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Perşembe</span>
                      <span className="font-medium text-gray-900">{venue.openingHours.thursday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cuma</span>
                      <span className="font-medium text-gray-900">{venue.openingHours.friday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cumartesi</span>
                      <span className="font-medium text-gray-900">{venue.openingHours.saturday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pazar</span>
                      <span className="font-medium text-gray-900">{venue.openingHours.sunday}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition">
                  Yol Tarifi Al
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
