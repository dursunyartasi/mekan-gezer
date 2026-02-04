import Link from 'next/link';
import { Compass, FileText, Shield, AlertCircle, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

export default function KullanimPage() {
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

          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Kullanım Koşulları</h1>
                <p className="text-gray-600 mt-1">Son güncelleme: 4 Şubat 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="mb-12">
              <p className="text-lg text-gray-600 leading-relaxed">
                Mekan Gezer platformunu kullanarak, aşağıda belirtilen kullanım koşullarını kabul
                etmiş sayılırsınız. Lütfen bu koşulları dikkatlice okuyun. Bu koşulları kabul
                etmiyorsanız, platformumuzu kullanmayınız.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {/* Section 1 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">1. Hizmet Tanımı</h2>
                </div>
                <div className="pl-13 space-y-4 text-gray-600">
                  <p>
                    Mekan Gezer, fotoğraf tutkunlarının şehirdeki mekanları keşfetmesini,
                    etkinliklere katılmasını ve toplulukla etkileşim kurmasını sağlayan bir
                    sosyal platformdur.
                  </p>
                  <p>
                    Platform üzerinden sunulan hizmetler:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Mekan keşfi ve paylaşımı</li>
                    <li>Etkinlik düzenleme ve katılım</li>
                    <li>Topluluk sohbet odaları</li>
                    <li>Kullanıcı profilleri ve takip sistemi</li>
                    <li>Fotoğraf paylaşımı ve değerlendirme</li>
                  </ul>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">2. Kullanıcı Hesapları</h2>
                </div>
                <div className="pl-13 space-y-4 text-gray-600">
                  <p><strong>Hesap Oluşturma:</strong></p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>13 yaşından büyük olmalısınız</li>
                    <li>Doğru ve güncel bilgiler sağlamalısınız</li>
                    <li>Hesap bilgilerinizi gizli tutmalısınız</li>
                    <li>Hesabınızı başkalarıyla paylaşmamalısınız</li>
                  </ul>
                  <p className="mt-4"><strong>Hesap Güvenliği:</strong></p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Güçlü bir şifre kullanın</li>
                    <li>Şifrenizi düzenli olarak değiştirin</li>
                    <li>Şüpheli aktivite fark ederseniz hemen bildirin</li>
                    <li>Hesabınızdan yapılan tüm aktivitelerden siz sorumlusunuz</li>
                  </ul>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">3. İzin Verilen Kullanım</h2>
                </div>
                <div className="pl-13 space-y-4 text-gray-600">
                  <p>Platformumuzda şu aktivitelere izin verilir:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Mekan keşfi ve paylaşımı yapabilirsiniz</li>
                    <li>Etkinlik oluşturabilir ve katılabilirsiniz</li>
                    <li>Fotoğraflarınızı paylaşabilirsiniz</li>
                    <li>Diğer kullanıcılarla etkileşim kurabilirsiniz</li>
                    <li>Yorumlar ve değerlendirmeler yapabilirsiniz</li>
                    <li>Topluluk sohbetlerine katılabilirsiniz</li>
                  </ul>
                </div>
              </div>

              {/* Section 4 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">4. Yasaklanan Davranışlar</h2>
                </div>
                <div className="pl-13 space-y-4 text-gray-600">
                  <p>Platformumuzda şu davranışlar kesinlikle yasaktır:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Sahte veya yanıltıcı bilgi paylaşımı</li>
                    <li>Taciz, hakaret veya tehdit içeren içerikler</li>
                    <li>Telif hakkı ihlali yapan içerikler</li>
                    <li>Spam ve reklam içerikleri</li>
                    <li>Uygunsuz, müstehcen veya yasadışı içerikler</li>
                    <li>Başkalarının kişisel bilgilerini izinsiz paylaşma</li>
                    <li>Botlar veya otomatik araçlar kullanma</li>
                    <li>Platform güvenliğini tehlikeye atmaya çalışma</li>
                    <li>Diğer kullanıcıları aldatma veya dolandırma</li>
                  </ul>
                </div>
              </div>

              {/* Section 5 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">5. İçerik Hakları</h2>
                </div>
                <div className="pl-13 space-y-4 text-gray-600">
                  <p><strong>Sizin İçeriğiniz:</strong></p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Paylaştığınız içeriklerin telif hakları size aittir</li>
                    <li>Platformda paylaştığınız içerikleri kullanmamız için bize lisans vermiş olursunuz</li>
                    <li>İçeriklerinizi dilediğiniz zaman silebilirsiniz</li>
                    <li>Yasalara aykırı içeriklerden siz sorumlusunuz</li>
                  </ul>
                  <p className="mt-4"><strong>Platform İçeriği:</strong></p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Platform tasarımı ve kodları Mekan Gezer'e aittir</li>
                    <li>Platform içeriğini izinsiz kopyalayamazsınız</li>
                    <li>Ticari amaçla kullanım yasaktır</li>
                  </ul>
                </div>
              </div>

              {/* Section 6 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">6. Moderasyon ve Yaptırımlar</h2>
                </div>
                <div className="pl-13 space-y-4 text-gray-600">
                  <p>Kullanım koşullarını ihlal etmeniz durumunda:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>İçeriğiniz kaldırılabilir</li>
                    <li>Uyarı alabilirsiniz</li>
                    <li>Hesabınız geçici olarak askıya alınabilir</li>
                    <li>Hesabınız kalıcı olarak kapatılabilir</li>
                    <li>Yasal işlem başlatılabilir</li>
                  </ul>
                </div>
              </div>

              {/* Section 7 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">7. Sorumluluk Reddi</h2>
                </div>
                <div className="pl-13 space-y-4 text-gray-600">
                  <p>
                    Mekan Gezer platformu "olduğu gibi" sunulmaktadır. Aşağıdaki konularda
                    sorumluluk kabul etmiyoruz:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Kullanıcılar tarafından paylaşılan içeriklerin doğruluğu</li>
                    <li>Üçüncü taraf web sitelerine verilen linkler</li>
                    <li>Hizmet kesintileri veya teknik sorunlar</li>
                    <li>Kullanıcılar arasındaki anlaşmazlıklar</li>
                    <li>Etkinliklerde yaşanabilecek sorunlar</li>
                    <li>Veri kaybı (düzenli yedekleme yapmanızı öneririz)</li>
                  </ul>
                </div>
              </div>

              {/* Section 8 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">8. Fikri Mülkiyet</h2>
                </div>
                <div className="pl-13 space-y-4 text-gray-600">
                  <p>
                    Mekan Gezer logosu, tasarımı, kodları ve tüm içeriği fikri mülkiyet
                    koruması altındadır. İzinsiz kullanım, kopyalama veya dağıtım yasaktır.
                  </p>
                </div>
              </div>

              {/* Section 9 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">9. Değişiklikler</h2>
                </div>
                <div className="pl-13 space-y-4 text-gray-600">
                  <p>
                    Bu kullanım koşullarını dilediğimiz zaman değiştirme hakkını saklı tutarız.
                    Önemli değişiklikler olduğunda sizi bilgilendireceğiz. Değişikliklerden sonra
                    platformu kullanmaya devam etmeniz, yeni koşulları kabul ettiğiniz anlamına gelir.
                  </p>
                </div>
              </div>

              {/* Section 10 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">10. Hesap İptali</h2>
                </div>
                <div className="pl-13 space-y-4 text-gray-600">
                  <p>
                    Hesabınızı dilediğiniz zaman kapatabilirsiniz. Hesap kapatıldığında:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Kişisel bilgileriniz silinir</li>
                    <li>Paylaşımlarınız kaldırılır (yasal yükümlülükler hariç)</li>
                    <li>Favoriler ve takipler silinir</li>
                    <li>İşlem geri alınamaz</li>
                  </ul>
                </div>
              </div>

              {/* Section 11 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">11. Uygulanacak Hukuk</h2>
                </div>
                <div className="pl-13 space-y-4 text-gray-600">
                  <p>
                    Bu kullanım koşulları Türkiye Cumhuriyeti yasalarına tabidir.
                    Herhangi bir anlaşmazlık durumunda İstanbul mahkemeleri yetkilidir.
                  </p>
                </div>
              </div>

              {/* Section 12 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">12. İletişim</h2>
                </div>
                <div className="pl-13 space-y-4 text-gray-600">
                  <p>
                    Kullanım koşulları hakkında sorularınız varsa bizimle iletişime geçebilirsiniz:
                  </p>
                  <ul className="list-none space-y-2">
                    <li><strong>E-posta:</strong> legal@mekangezer.com</li>
                    <li><strong>Adres:</strong> Kadıköy, İstanbul, Türkiye</li>
                    <li><strong>İletişim Formu:</strong> <Link href="/iletisim" className="text-orange-500 hover:underline">mekangezer.com/iletisim</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16 p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Kullanım koşullarını kabul ediyor musunuz?</h3>
              <p className="text-gray-600 mb-6">
                Platformumuzu kullanmaya başlamak için kayıt olun ve topluluğa katılın.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition"
                >
                  Kayıt Ol
                </Link>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition border-2 border-gray-200"
                >
                  Soru Sor
                </Link>
              </div>
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
            <Link href="/kullanim" className="text-orange-500">Kullanım Koşulları</Link>
          </div>
          <p className="text-gray-500 text-sm mt-6">&copy; 2024 Mekan Gezer. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
