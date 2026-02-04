import Link from 'next/link';
import { Compass, Shield, Lock, Eye, Database, UserCheck, ArrowLeft } from 'lucide-react';

export default function GizlilikPage() {
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
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Gizlilik Politikası</h1>
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
                Mekan Gezer olarak, kullanıcılarımızın gizliliğini korumayı ve kişisel verilerini
                güvenli bir şekilde işlemeyi taahhüt ediyoruz. Bu Gizlilik Politikası, kişisel
                bilgilerinizi nasıl topladığımızı, kullandığımızı, sakladığımızı ve koruduğumuzu açıklar.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {/* Section 1 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Database className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">1. Topladığımız Bilgiler</h2>
                </div>
                <div className="pl-13 space-y-4 text-gray-600">
                  <p>Mekan Gezer'i kullanırken aşağıdaki bilgileri toplayabiliriz:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Hesap Bilgileri:</strong> Ad, soyad, e-posta adresi, kullanıcı adı, şifre</li>
                    <li><strong>Profil Bilgileri:</strong> Profil fotoğrafı, biyografi, şehir bilgisi</li>
                    <li><strong>Kullanım Verileri:</strong> Ziyaret edilen sayfalar, tıklama verileri, etkinlik katılımları</li>
                    <li><strong>Konum Bilgisi:</strong> İzninizle şehir ve ilçe bilgisi</li>
                    <li><strong>İletişim Bilgileri:</strong> Bize gönderdiğiniz mesajlar ve geri bildirimler</li>
                    <li><strong>Teknik Veriler:</strong> IP adresi, tarayıcı türü, cihaz bilgisi</li>
                  </ul>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Eye className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">2. Bilgileri Nasıl Kullanırız</h2>
                </div>
                <div className="pl-13 space-y-4 text-gray-600">
                  <p>Topladığımız bilgileri şu amaçlarla kullanırız:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Hesabınızı oluşturmak ve yönetmek</li>
                    <li>Size kişiselleştirilmiş içerik ve öneriler sunmak</li>
                    <li>Etkinlik ve mekan önerileri göndermek</li>
                    <li>Topluluk özelliklerini sağlamak (sohbet, yorumlar, vs.)</li>
                    <li>Güvenlik ve dolandırıcılık önleme</li>
                    <li>Hizmetlerimizi geliştirmek ve analiz yapmak</li>
                    <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                  </ul>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Lock className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">3. Bilgi Güvenliği</h2>
                </div>
                <div className="pl-13 space-y-4 text-gray-600">
                  <p>Kişisel bilgilerinizi korumak için aşağıdaki önlemleri alıyoruz:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Şifreler bcrypt ile şifrelenerek saklanır</li>
                    <li>SSL/TLS şifreleme ile veri aktarımı</li>
                    <li>Düzenli güvenlik güncellemeleri ve testleri</li>
                    <li>Erişim kontrolü ve yetkilendirme sistemleri</li>
                    <li>Düzenli yedekleme ve felaket kurtarma planları</li>
                  </ul>
                </div>
              </div>

              {/* Section 4 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">4. Bilgi Paylaşımı</h2>
                </div>
                <div className="pl-13 space-y-4 text-gray-600">
                  <p>Kişisel bilgilerinizi üçüncü taraflarla paylaşmıyoruz. Ancak şu durumlarda bilgi paylaşımı yapabiliriz:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Yasal Zorunluluklar:</strong> Mahkeme kararı veya yasal talep durumunda</li>
                    <li><strong>Hizmet Sağlayıcılar:</strong> Hosting, e-posta gönderimi gibi hizmetler için (KVKK uyumlu)</li>
                    <li><strong>İş Devri:</strong> Şirket birleşme veya satın alma durumunda</li>
                    <li><strong>Güvenlik:</strong> Dolandırıcılık veya güvenlik tehdidi durumunda</li>
                  </ul>
                </div>
              </div>

              {/* Section 5 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">5. Haklarınız (KVKK)</h2>
                </div>
                <div className="pl-13 space-y-4 text-gray-600">
                  <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                    <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                    <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                    <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                    <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
                    <li>Verilerin silinmesini veya yok edilmesini isteme</li>
                    <li>Bu haklarınızı kullanarak yaptığınız işlemlerin, verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
                  </ul>
                  <p className="mt-4">
                    Bu haklarınızı kullanmak için <Link href="/iletisim" className="text-orange-500 hover:underline">iletişim sayfamızdan</Link> bize ulaşabilirsiniz.
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Database className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">6. Çerezler (Cookies)</h2>
                </div>
                <div className="pl-13 space-y-4 text-gray-600">
                  <p>Web sitemiz, kullanıcı deneyimini geliştirmek için çerezler kullanır:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Zorunlu Çerezler:</strong> Sitenin çalışması için gerekli</li>
                    <li><strong>Performans Çerezleri:</strong> Site performansını ölçmek için</li>
                    <li><strong>Fonksiyonel Çerezler:</strong> Tercihlerinizi hatırlamak için</li>
                  </ul>
                  <p className="mt-4">
                    Tarayıcı ayarlarınızdan çerezleri yönetebilir veya reddedebilirsiniz.
                  </p>
                </div>
              </div>

              {/* Section 7 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">7. Veri Saklama Süresi</h2>
                </div>
                <div className="pl-13 space-y-4 text-gray-600">
                  <p>
                    Kişisel verilerinizi, işleme amaçlarının gerektirdiği süre boyunca ve yasal
                    saklama yükümlülüklerimiz çerçevesinde saklarız. Hesabınızı sildiğinizde,
                    kişisel verileriniz yasal yükümlülükler haricinde 30 gün içinde silinir.
                  </p>
                </div>
              </div>

              {/* Section 8 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">8. Çocukların Gizliliği</h2>
                </div>
                <div className="pl-13 space-y-4 text-gray-600">
                  <p>
                    Hizmetlerimiz 13 yaşın altındaki çocuklara yönelik değildir. 13 yaşın altındaki
                    kullanıcılardan bilerek kişisel bilgi toplamıyoruz. Bir ebeveyn veya vasi olarak,
                    çocuğunuzun izinsiz bilgi verdiğini fark ederseniz lütfen bizimle iletişime geçin.
                  </p>
                </div>
              </div>

              {/* Section 9 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">9. Politika Değişiklikleri</h2>
                </div>
                <div className="pl-13 space-y-4 text-gray-600">
                  <p>
                    Bu Gizlilik Politikası'nı zaman zaman güncelleyebiliriz. Önemli değişiklikler
                    olduğunda, size e-posta yoluyla veya platformumuzda bildirim göstererek
                    haber vereceğiz. Değişiklikler bu sayfada yayınlandığı anda yürürlüğe girer.
                  </p>
                </div>
              </div>

              {/* Section 10 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Lock className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">10. İletişim</h2>
                </div>
                <div className="pl-13 space-y-4 text-gray-600">
                  <p>
                    Gizlilik politikamız veya kişisel verileriniz hakkında sorularınız varsa,
                    bizimle iletişime geçebilirsiniz:
                  </p>
                  <ul className="list-none space-y-2">
                    <li><strong>E-posta:</strong> privacy@mekangezer.com</li>
                    <li><strong>Adres:</strong> Kadıköy, İstanbul, Türkiye</li>
                    <li><strong>İletişim Formu:</strong> <Link href="/iletisim" className="text-orange-500 hover:underline">mekangezer.com/iletisim</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16 p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sorularınız mı var?</h3>
              <p className="text-gray-600 mb-6">
                Gizlilik politikamız hakkında daha fazla bilgi almak veya haklarınızı kullanmak
                isterseniz bizimle iletişime geçin.
              </p>
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition"
              >
                İletişime Geç
              </Link>
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
            <Link href="/gizlilik" className="text-orange-500">Gizlilik</Link>
            <Link href="/kullanim" className="hover:text-white transition">Kullanım Koşulları</Link>
          </div>
          <p className="text-gray-500 text-sm mt-6">&copy; 2024 Mekan Gezer. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
