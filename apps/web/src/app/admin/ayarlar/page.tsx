'use client';

import { useState } from 'react';
import { Save, Settings, Globe, Bell, Shield, Mail, Database, Image, Upload } from 'lucide-react';

export default function AdminAyarlarPage() {
  const [activeTab, setActiveTab] = useState('genel');
  const [settings, setSettings] = useState({
    siteName: 'Mekan Gezer',
    siteDescription: 'Etkinlikleri ve mekanları keşfet',
    siteUrl: 'https://mekangezer.com',
    contactEmail: 'info@mekangezer.com',
    logo: '/logo.png',
    favicon: '/favicon.ico',
    socialFacebook: 'https://facebook.com/mekangezer',
    socialTwitter: 'https://twitter.com/mekangezer',
    socialInstagram: 'https://instagram.com/mekangezer',
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    maintenanceMode: false,
    registrationEnabled: true,
    commentModeration: true,
    maxUploadSize: '10',
    allowedFileTypes: 'jpg,png,gif,pdf',
  });

  const [logoPreview, setLogoPreview] = useState(settings.logo);
  const [faviconPreview, setFaviconPreview] = useState(settings.favicon);

  const handleSave = () => {
    alert('Ayarlar kaydedildi!');
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setLogoPreview(result);
      setSettings({ ...settings, logo: result });
    };
    reader.readAsDataURL(file);
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setFaviconPreview(result);
      setSettings({ ...settings, favicon: result });
    };
    reader.readAsDataURL(file);
  };

  const tabs = [
    { id: 'genel', label: 'Genel', icon: Settings },
    { id: 'site', label: 'Site', icon: Globe },
    { id: 'bildirimler', label: 'Bildirimler', icon: Bell },
    { id: 'guvenlik', label: 'Güvenlik', icon: Shield },
    { id: 'email', label: 'E-posta', icon: Mail },
    { id: 'medya', label: 'Medya', icon: Image },
  ];

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ayarlar</h1>
          <p className="text-gray-600">Site ayarlarını yönetin</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium"
        >
          <Save className="w-5 h-5" />
          Kaydet
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                    activeTab === tab.id
                      ? 'bg-orange-50 text-orange-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {activeTab === 'genel' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Genel Ayarlar</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Adı</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Açıklaması</label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site URL</label>
                <input
                  type="url"
                  value={settings.siteUrl}
                  onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">İletişim E-posta</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'site' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Site Ayarları</h2>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Logosu
                  <span className="text-xs text-gray-500 ml-2">(Önerilen boyut: 200x60px)</span>
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo Preview" className="max-w-full max-h-full object-contain p-2" />
                    ) : (
                      <Upload className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      id="logo-upload"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="inline-block px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 cursor-pointer transition"
                    >
                      Logo Yükle
                    </label>
                    <p className="text-sm text-gray-500 mt-2">PNG, JPG veya SVG (MAX. 2MB)</p>
                  </div>
                </div>
              </div>

              {/* Favicon Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Favicon
                  <span className="text-xs text-gray-500 ml-2">(Önerilen boyut: 32x32px veya 64x64px)</span>
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                    {faviconPreview ? (
                      <img src={faviconPreview} alt="Favicon Preview" className="max-w-full max-h-full object-contain p-1" />
                    ) : (
                      <Upload className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      id="favicon-upload"
                      accept="image/x-icon,image/png,image/svg+xml"
                      onChange={handleFaviconUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="favicon-upload"
                      className="inline-block px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 cursor-pointer transition"
                    >
                      Favicon Yükle
                    </label>
                    <p className="text-sm text-gray-500 mt-2">ICO, PNG veya SVG (MAX. 1MB)</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sosyal Medya</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                    <input
                      type="url"
                      value={settings.socialFacebook}
                      onChange={(e) => setSettings({ ...settings, socialFacebook: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                    <input
                      type="url"
                      value={settings.socialTwitter}
                      onChange={(e) => setSettings({ ...settings, socialTwitter: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                    <input
                      type="url"
                      value={settings.socialInstagram}
                      onChange={(e) => setSettings({ ...settings, socialInstagram: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bildirimler' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Bildirim Ayarları</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">E-posta Bildirimleri</h3>
                    <p className="text-sm text-gray-600">Önemli güncellemeler için e-posta gönder</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Push Bildirimleri</h3>
                    <p className="text-sm text-gray-600">Tarayıcı bildirimleri gönder</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.pushNotifications}
                      onChange={(e) => setSettings({ ...settings, pushNotifications: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Haftalık Özet</h3>
                    <p className="text-sm text-gray-600">Her hafta aktivite özeti gönder</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.weeklyDigest}
                      onChange={(e) => setSettings({ ...settings, weeklyDigest: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'guvenlik' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Güvenlik Ayarları</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Bakım Modu</h3>
                    <p className="text-sm text-gray-600">Siteyi geçici olarak kapat</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.maintenanceMode}
                      onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Yeni Kayıtlar</h3>
                    <p className="text-sm text-gray-600">Kullanıcıların kayıt olmasına izin ver</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.registrationEnabled}
                      onChange={(e) => setSettings({ ...settings, registrationEnabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Yorum Moderasyonu</h3>
                    <p className="text-sm text-gray-600">Yorumları onaya tabi tut</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.commentModeration}
                      onChange={(e) => setSettings({ ...settings, commentModeration: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">E-posta Ayarları</h2>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  E-posta ayarları için SMTP sunucu yapılandırması gereklidir.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Sunucusu</label>
                <input
                  type="text"
                  placeholder="smtp.example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
                  <input
                    type="number"
                    placeholder="587"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Güvenlik</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>TLS</option>
                    <option>SSL</option>
                    <option>Yok</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kullanıcı Adı</label>
                <input
                  type="text"
                  placeholder="kullanici@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Test E-postası Gönder
              </button>
            </div>
          )}

          {activeTab === 'medya' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Medya Ayarları</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maksimum Yükleme Boyutu (MB)
                </label>
                <input
                  type="number"
                  value={settings.maxUploadSize}
                  onChange={(e) => setSettings({ ...settings, maxUploadSize: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İzin Verilen Dosya Türleri
                </label>
                <input
                  type="text"
                  value={settings.allowedFileTypes}
                  onChange={(e) => setSettings({ ...settings, allowedFileTypes: e.target.value })}
                  placeholder="jpg,png,gif,pdf"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <p className="text-sm text-gray-500 mt-2">Virgülle ayırarak yazın</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Disk Kullanımı</h3>
                <div className="space-y-2 text-sm text-blue-800">
                  <div className="flex justify-between">
                    <span>Toplam Kullanım:</span>
                    <span className="font-medium">2.4 GB / 10 GB</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
