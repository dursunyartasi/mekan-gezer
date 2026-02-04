import Link from 'next/link';
import { Compass, Camera, Users, Heart, Target, Lightbulb, ArrowLeft } from 'lucide-react';

export default function HakkimizdaPage() {
  const team = [
    {
      name: 'Ahmet Yılmaz',
      role: 'Kurucu & CEO',
      image: 'https://ui-avatars.com/api/?name=Ahmet+Yilmaz&size=200&background=f97316&color=fff',
      bio: 'Fotoğraf tutkunu, gezgin ve topluluk oluşturucu',
    },
    {
      name: 'Zeynep Kaya',
      role: 'Topluluk Yöneticisi',
      image: 'https://ui-avatars.com/api/?name=Zeynep+Kaya&size=200&background=f97316&color=fff',
      bio: 'Etkinlik organizatörü ve sosyal medya uzmanı',
    },
    {
      name: 'Mehmet Demir',
      role: 'Baş Fotoğrafçı',
      image: 'https://ui-avatars.com/api/?name=Mehmet+Demir&size=200&background=f97316&color=fff',
      bio: 'Profesyonel fotoğrafçı ve workshop eğitmeni',
    },
  ];

  const values = [
    {
      icon: Camera,
      title: 'Tutku',
      description: 'Fotoğrafa olan tutkumuz bizi bir araya getiriyor ve ilham veriyor.',
    },
    {
      icon: Users,
      title: 'Topluluk',
      description: 'Güçlü bir topluluk oluşturarak deneyimlerimizi paylaşıyoruz.',
    },
    {
      icon: Heart,
      title: 'Paylaşım',
      description: 'Bilgi, deneyim ve mekanlarımızı cömertçe paylaşıyoruz.',
    },
    {
      icon: Target,
      title: 'Keşif',
      description: 'Şehrimizin gizli köşelerini ve güzelliklerini keşfediyoruz.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
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
              <Link href="/topluluk" className="text-gray-700 hover:text-orange-500 transition">Topluluk</Link>
              <Link href="/hakkimizda" className="text-orange-500 font-semibold">Hakkımızda</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-6 transition">
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfa
          </Link>

          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              <span className="text-orange-500">Mekan Gezer</span> Hakkında
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Fotoğraf tutkunlarını bir araya getiren, şehrin gizli köşelerini keşfetmeyi ve
              paylaşmayı seven bir topluluk oluşturmak için yola çıktık.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-6">
                  <Target className="w-4 h-4" />
                  Misyonumuz
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Şehri Fotoğrafla Keşfet
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Mekan Gezer, fotoğraf tutkunlarını bir araya getirerek şehirlerin gizli güzelliklerini
                  keşfetmelerini ve paylaşmalarını sağlayan bir platformdur.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Amacımız, insanların yaşadıkları şehri farklı gözlerle görmelerini sağlamak,
                  fotoğrafçılık becerilerini geliştirmek ve anlamlı bağlantılar kurmalarına
                  yardımcı olmaktır.
                </p>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600"
                  alt="Photographers"
                  className="rounded-3xl shadow-2xl"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <img
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600"
                  alt="Community"
                  className="rounded-3xl shadow-2xl"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-6">
                  <Lightbulb className="w-4 h-4" />
                  Vizyonumuz
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Türkiye'nin En Büyük Fotoğraf Topluluğu
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Türkiye'nin her köşesinde fotoğraf tutkunlarını bir araya getirerek,
                  ülkemizin güzelliklerini dünyaya tanıtmak istiyoruz.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Her şehirde düzenli etkinlikler, workshoplar ve buluşmalar organize ederek
                  sürekli büyüyen ve gelişen bir topluluk yaratıyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Değerlerimiz</h2>
              <p className="text-xl text-gray-600">Bizi biz yapan prensipler</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Ekibimiz</h2>
              <p className="text-xl text-gray-600">Mekan Gezer'i hayata geçiren insanlar</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-orange-100"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-orange-500 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold mb-2">2,341</div>
                <div className="text-orange-100">Topluluk Üyesi</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">500+</div>
                <div className="text-orange-100">Kayıtlı Mekan</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">150+</div>
                <div className="text-orange-100">Düzenlenen Etkinlik</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">3</div>
                <div className="text-orange-100">Aktif Şehir</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Topluluğa Katılmaya Hazır mısın?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Binlerce fotoğraf tutkunu ile tanış, şehrini keşfet
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/register"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition"
              >
                Hemen Kayıt Ol
              </Link>
              <Link
                href="/topluluk"
                className="bg-gray-100 text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition"
              >
                Topluluğu Keşfet
              </Link>
            </div>
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
            <Link href="/hakkimizda" className="text-orange-500">Hakkımızda</Link>
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
