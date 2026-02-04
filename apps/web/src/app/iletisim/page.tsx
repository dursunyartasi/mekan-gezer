'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Compass, Mail, Phone, MapPin, Send, ArrowLeft, Instagram, MessageCircle } from 'lucide-react';

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderme işlemi buraya gelecek
    console.log('Form data:', formData);
    alert('Mesajınız alındı! En kısa sürede size dönüş yapacağız.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
              <Link href="/iletisim" className="text-orange-500 font-semibold">İletişim</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-6 transition">
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfa
          </Link>

          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              <span className="text-orange-500">İletişime</span> Geçin
            </h1>
            <p className="text-xl text-gray-600">
              Sorularınız, önerileriniz veya geri bildirimleriniz için bize ulaşın
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Bize Mesaj Gönderin</h2>
                <p className="text-gray-600 mb-8">
                  Formu doldurarak bize ulaşabilirsiniz. En kısa sürede size dönüş yapacağız.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                      Adınız Soyadınız
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
                      placeholder="Ahmet Yılmaz"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                      E-posta Adresiniz
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
                      placeholder="ahmet@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                      Konu
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
                    >
                      <option value="">Konu Seçin</option>
                      <option value="genel">Genel Soru</option>
                      <option value="mekan">Mekan Ekleme</option>
                      <option value="etkinlik">Etkinlik Önerisi</option>
                      <option value="teknik">Teknik Destek</option>
                      <option value="isbirligi">İş Birliği</option>
                      <option value="diger">Diğer</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                      Mesajınız
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition resize-none"
                      placeholder="Mesajınızı buraya yazın..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Mesajı Gönder
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">İletişim Bilgileri</h2>
                <p className="text-gray-600 mb-8">
                  Aşağıdaki kanallardan da bize ulaşabilirsiniz
                </p>

                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">E-posta</h3>
                      <a href="mailto:info@mekangezer.com" className="text-gray-600 hover:text-orange-500 transition">
                        info@mekangezer.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                      <a href="tel:+905001234567" className="text-gray-600 hover:text-orange-500 transition">
                        +90 (500) 123 45 67
                      </a>
                      <p className="text-sm text-gray-500 mt-1">Hafta içi 09:00 - 18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Adres</h3>
                      <p className="text-gray-600">
                        Kadıköy, İstanbul<br />
                        Türkiye
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Instagram className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Instagram</h3>
                      <a
                        href="https://instagram.com/mekangezer"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-orange-500 transition"
                      >
                        @mekangezer
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Hızlı Erişim</h3>
                  <div className="space-y-3">
                    <Link
                      href="/topluluk"
                      className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Topluluk Sohbetlerine Katıl</span>
                    </Link>
                    <Link
                      href="/hakkimizda"
                      className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition"
                    >
                      <Compass className="w-5 h-5" />
                      <span>Hakkımızda</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Sık Sorulan Sorular</h2>
              <p className="text-gray-600">En çok merak edilen sorular ve cevapları</p>
            </div>

            <div className="space-y-4">
              <details className="bg-white rounded-xl p-6 shadow-sm">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Mekan Gezer'e nasıl üye olabilirim?
                </summary>
                <p className="text-gray-600 mt-4">
                  Ana sayfadaki "Kayıt Ol" butonuna tıklayarak birkaç dakika içinde ücretsiz hesap oluşturabilirsiniz.
                </p>
              </details>

              <details className="bg-white rounded-xl p-6 shadow-sm">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Etkinliklere katılmak ücretli mi?
                </summary>
                <p className="text-gray-600 mt-4">
                  Etkinliklerin çoğu ücretsizdir. Bazı özel workshop ve eğitimler için küçük bir katılım ücreti alınabilir.
                </p>
              </details>

              <details className="bg-white rounded-xl p-6 shadow-sm">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Yeni mekan önerisi nasıl yapabilirim?
                </summary>
                <p className="text-gray-600 mt-4">
                  Giriş yaptıktan sonra "Mekanlar" sayfasından "Yeni Mekan Ekle" butonuna tıklayarak mekan önerebilirsiniz.
                </p>
              </details>

              <details className="bg-white rounded-xl p-6 shadow-sm">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Etkinlik organize edebilir miyim?
                </summary>
                <p className="text-gray-600 mt-4">
                  Evet! Kayıtlı üyeler kendi etkinliklerini oluşturabilir ve topluluğu davet edebilir.
                </p>
              </details>
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
            <Link href="/hakkimizda" className="hover:text-white transition">Hakkımızda</Link>
            <Link href="/iletisim" className="text-orange-500">İletişim</Link>
            <Link href="/gizlilik" className="hover:text-white transition">Gizlilik</Link>
            <Link href="/kullanim" className="hover:text-white transition">Kullanım Koşulları</Link>
          </div>
          <p className="text-gray-500 text-sm mt-6">&copy; 2024 Mekan Gezer. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
