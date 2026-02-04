'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Calendar, MapPin, Users, Clock, Camera, ArrowLeft, Heart, Share2, User, DollarSign, Info } from 'lucide-react';

export default function EtkinlikDetayPage() {
  const params = useParams();
  const id = params.id;

  // Mock data
  const event = {
    id: id,
    title: 'Kadıköy Sokakları Foto Yürüyüşü',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200',
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600',
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600',
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600',
    ],
    date: '15 Şubat 2024',
    time: '14:00',
    endTime: '17:00',
    participants: 24,
    maxParticipants: 30,
    location: 'Kadıköy, İstanbul',
    meetingPoint: 'Kadıköy İskele Meydanı, Vapur İskelesi Önü',
    coordinates: { lat: 40.9875, lng: 29.0267 },
    organizer: {
      name: 'Ahmet Yılmaz',
      avatar: 'https://ui-avatars.com/api/?name=Ahmet+Yilmaz&background=f97316&color=fff',
      role: 'Etkinlik Organizatörü',
      eventsCount: 15,
    },
    category: 'Fotoğraf Yürüyüşü',
    difficulty: 'Kolay',
    price: 0,
    description: `Kadıköy'ün renkli sokaklarını, tarihi binalarını ve boğaz manzarasını birlikte fotoğraflayacağız.

Bu yürüyüşte Kadıköy'ün en fotojenik köşelerini keşfedeceğiz. Rıhtım boyunca başlayıp, Moda sahili, Yeldeğirmeni sokakları ve çarşı bölgesinde devam edeceğiz.

Etkinlik sırasında temel fotoğraf teknikleri, kompozisyon ve sokak fotoğrafçılığı ipuçları paylaşılacak. Hem amatör hem de profesyonel fotoğrafçılar katılabilir.`,
    program: [
      { time: '14:00', activity: 'Buluşma ve tanışma' },
      { time: '14:15', activity: 'Rıhtım boyunda yürüyüş ve çekim' },
      { time: '15:00', activity: 'Moda sahilinde ara ve grup fotoğrafı' },
      { time: '15:30', activity: 'Yeldeğirmeni sokaklarında çekim' },
      { time: '16:30', activity: 'Kadıköy çarşısı ve son çekimler' },
      { time: '17:00', activity: 'Etkinlik sonu, fotoğraf paylaşımı' },
    ],
    whatToBring: [
      'Fotoğraf makinesi veya telefon',
      'Yedek batarya/powerbank',
      'Rahat yürüyüş ayakkabıları',
      'Su',
      'Güneş kremi (yaz aylarında)',
    ],
    rules: [
      'Etkinlik zamanında buluşma noktasında olun',
      'Grup kurallarına uyun',
      'İnsanları izinsiz fotoğraflamayın',
      'Çevre temizliğine dikkat edin',
      'Eğlenceli ve öğretici bir deneyim için açık fikirli olun',
    ],
  };

  const participants = [
    { id: 1, name: 'Mehmet D.', avatar: 'https://ui-avatars.com/api/?name=Mehmet+D&background=f97316&color=fff' },
    { id: 2, name: 'Ayşe K.', avatar: 'https://ui-avatars.com/api/?name=Ayse+K&background=f97316&color=fff' },
    { id: 3, name: 'Zeynep S.', avatar: 'https://ui-avatars.com/api/?name=Zeynep+S&background=f97316&color=fff' },
    { id: 4, name: 'Can Ö.', avatar: 'https://ui-avatars.com/api/?name=Can+O&background=f97316&color=fff' },
    { id: 5, name: 'Elif Y.', avatar: 'https://ui-avatars.com/api/?name=Elif+Y&background=f97316&color=fff' },
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
              <Link href="/mekanlar" className="text-gray-700 hover:text-orange-500 transition">Mekanlar</Link>
              <Link href="/etkinlikler" className="text-orange-500 font-semibold">Etkinlikler</Link>
              <Link href="/topluluk" className="text-gray-700 hover:text-orange-500 transition">Topluluk</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-20">
        <div className="relative h-[500px]">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute top-8 left-8">
            <Link href="/etkinlikler" className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-gray-900 hover:bg-white transition">
              <ArrowLeft className="w-4 h-4" />
              Geri
            </Link>
          </div>

          <div className="absolute bottom-8 left-8 right-8 text-white">
            <div className="container mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1.5 bg-orange-500 rounded-full text-sm font-semibold">
                  {event.category}
                </span>
                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  {event.difficulty}
                </span>
                {event.price === 0 ? (
                  <span className="px-4 py-1.5 bg-green-500 rounded-full text-sm font-semibold">
                    Ücretsiz
                  </span>
                ) : (
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                    ₺{event.price}
                  </span>
                )}
              </div>
              <h1 className="text-5xl font-bold mb-4">{event.title}</h1>
              <div className="flex flex-wrap gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{event.time} - {event.endTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4">
            {event.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${event.title} ${index + 1}`}
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
                <button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2">
                  <Users className="w-5 h-5" />
                  Katıl ({event.participants}/{event.maxParticipants})
                </button>
                <button className="bg-white border-2 border-gray-200 px-6 py-4 rounded-xl hover:border-orange-500 transition">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="bg-white border-2 border-gray-200 px-6 py-4 rounded-xl hover:border-orange-500 transition">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Etkinlik Hakkında</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{event.description}</p>
              </div>

              {/* Program */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Etkinlik Programı</h2>
                <div className="space-y-4">
                  {event.program.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
                          <span className="text-orange-600 font-bold text-sm">{item.time}</span>
                        </div>
                      </div>
                      <div className="flex-1 pt-3">
                        <p className="text-gray-900 font-medium">{item.activity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What to Bring */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Yanınıza Almanız Gerekenler</h2>
                <ul className="space-y-3">
                  {event.whatToBring.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-600">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rules */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Etkinlik Kuralları</h2>
                </div>
                <ul className="space-y-3">
                  {event.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Participants */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Katılımcılar ({event.participants})</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-3">
                      <img src={participant.avatar} alt={participant.name} className="w-12 h-12 rounded-full" />
                      <span className="text-gray-700 font-medium">{participant.name}</span>
                    </div>
                  ))}
                  {event.participants > participants.length && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-sm font-semibold">+{event.participants - participants.length}</span>
                      </div>
                      <span className="text-gray-600">diğer</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Info Card */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Etkinlik Bilgileri</h3>
                  {event.price === 0 ? (
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
                      Ücretsiz
                    </span>
                  ) : (
                    <span className="text-2xl font-bold text-orange-500">₺{event.price}</span>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Tarih</div>
                      <div className="font-semibold text-gray-900">{event.date}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Saat</div>
                      <div className="font-semibold text-gray-900">{event.time} - {event.endTime}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Buluşma Noktası</div>
                      <div className="font-semibold text-gray-900">{event.meetingPoint}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Katılımcı</div>
                      <div className="font-semibold text-gray-900">
                        {event.participants} / {event.maxParticipants} kişi
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition mb-3">
                  Hemen Katıl
                </button>
                <button className="w-full border-2 border-gray-200 py-3 rounded-xl font-semibold hover:border-orange-500 hover:text-orange-500 transition">
                  Yol Tarifi Al
                </button>
              </div>

              {/* Organizer */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Organizatör</h3>
                <div className="flex items-start gap-4">
                  <img src={event.organizer.avatar} alt={event.organizer.name} className="w-16 h-16 rounded-full" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{event.organizer.name}</h4>
                    <p className="text-sm text-gray-500 mb-2">{event.organizer.role}</p>
                    <p className="text-sm text-gray-600">{event.organizer.eventsCount} etkinlik düzenledi</p>
                  </div>
                </div>
                <button className="w-full mt-4 border-2 border-gray-200 py-2 rounded-lg text-sm font-semibold hover:border-orange-500 hover:text-orange-500 transition">
                  Profili Görüntüle
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
