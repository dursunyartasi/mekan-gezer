'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Save, Trash2, CheckCircle, XCircle, Upload, MapPin, Plus, X } from 'lucide-react';
import Link from 'next/link';

export default function AdminMekanDuzenlePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [formData, setFormData] = useState({
    name: 'Kahve Dünyası Moda',
    category: 'cafe',
    city: 'Istanbul',
    district: 'Kadikoy',
    neighborhood: 'Moda',
    address: 'Moda Caddesi No: 45',
    description: 'Boğaz manzaralı, huzurlu bir kafe. Fotoğraf çekimi için mükemmel.',
    phone: '+90 216 123 45 67',
    website: 'https://kahvedunyasi.com',
    instagram: '@kahvedunyasimoda',
    googleMapsUrl: '',
    latitude: '',
    longitude: '',
    features: ['wifi', 'outdoor', 'pet-friendly'],
    customFeatures: [] as string[],
    status: 'approved',
  });

  const [newFeature, setNewFeature] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features.includes(feature)
        ? formData.features.filter((f) => f !== feature)
        : [...formData.features, feature],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving venue:', formData);
    alert('Mekan başarıyla güncellendi!');
    router.push('/admin/mekanlar');
  };

  const handleApprove = () => {
    setFormData({ ...formData, status: 'approved' });
    alert('Mekan onaylandı!');
  };

  const handleReject = () => {
    setFormData({ ...formData, status: 'rejected' });
    alert('Mekan reddedildi!');
  };

  const handleDelete = () => {
    if (confirm('Bu mekanı silmek istediğinizden emin misiniz?')) {
      console.log('Deleting venue:', id);
      alert('Mekan silindi!');
      router.push('/admin/mekanlar');
    }
  };

  const handleAddCustomFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        customFeatures: [...formData.customFeatures, newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const handleRemoveCustomFeature = (index: number) => {
    setFormData({
      ...formData,
      customFeatures: formData.customFeatures.filter((_, i) => i !== index),
    });
  };

  const extractGoogleMapsCoordinates = (url: string) => {
    // Extract coordinates from Google Maps URL
    const patterns = [
      /@(-?\d+\.\d+),(-?\d+\.\d+)/,
      /q=(-?\d+\.\d+),(-?\d+\.\d+)/,
      /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return {
          latitude: match[1],
          longitude: match[2]
        };
      }
    }
    return null;
  };

  const handleGoogleMapsUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData({ ...formData, googleMapsUrl: url });

    const coords = extractGoogleMapsCoordinates(url);
    if (coords) {
      setFormData({
        ...formData,
        googleMapsUrl: url,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin/mekanlar" className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition mb-4">
          <ArrowLeft className="w-4 h-4" />
          Mekanlara Dön
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Mekan Düzenle</h1>
        <p className="text-gray-600">ID: {id}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Temel Bilgiler</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Mekan Adı *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Kategori *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="cafe">Kafe</option>
                <option value="restaurant">Restoran</option>
                <option value="museum">Müze</option>
                <option value="park">Park</option>
                <option value="gallery">Galeri</option>
                <option value="historic">Tarihi Mekan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Şehir *
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Istanbul">İstanbul</option>
                <option value="Ankara">Ankara</option>
                <option value="Izmir">İzmir</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                İlçe *
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Mahalle
              </label>
              <input
                type="text"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Adres *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Açıklama *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">İletişim Bilgileri</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Telefon
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Instagram
              </label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Google Maps Location */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-orange-500" />
            Konum Bilgileri
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Google Maps URL
              </label>
              <input
                type="url"
                value={formData.googleMapsUrl}
                onChange={handleGoogleMapsUrlChange}
                placeholder="https://maps.google.com/..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-sm text-gray-500 mt-2">
                Google Maps'ten paylaş butonuna tıklayıp linki buraya yapıştırın. Koordinatlar otomatik çıkarılacaktır.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Enlem (Latitude)
                </label>
                <input
                  type="text"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                  placeholder="41.0082"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Boylam (Longitude)
                </label>
                <input
                  type="text"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                  placeholder="28.9784"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                  readOnly
                />
              </div>
            </div>

            {formData.latitude && formData.longitude && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Konum başarıyla algılandı! Enlem: {formData.latitude}, Boylam: {formData.longitude}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Özellikler</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Standart Özellikler</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {['wifi', 'outdoor', 'pet-friendly', 'parking', 'accessible', 'photo-permission'].map((feature) => (
                  <label key={feature} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                    />
                    <span className="text-gray-700 capitalize">{feature.replace('-', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Özel Özellikler</h3>

              {formData.customFeatures.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.customFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomFeature(index)}
                        className="hover:text-orange-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomFeature())}
                  placeholder="Yeni özellik ekle (örn: Canlı Müzik, Açık Büfe)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="button"
                  onClick={handleAddCustomFeature}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Ekle
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Görseller</h2>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Görselleri sürükleyip bırakın veya seçin</p>
            <button
              type="button"
              className="text-orange-500 font-medium hover:text-orange-600"
            >
              Dosya Seç
            </button>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Durum</h2>

          <div className="flex items-center gap-4">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="pending">Onay Bekliyor</option>
              <option value="approved">Onaylandı</option>
              <option value="rejected">Reddedildi</option>
            </select>

            {formData.status === 'pending' && (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleApprove}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Onayla
                </button>
                <button
                  type="button"
                  onClick={handleReject}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  Reddet
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleDelete}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Mekanı Sil
          </button>

          <div className="flex gap-3">
            <Link
              href="/admin/mekanlar"
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              İptal
            </Link>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Değişiklikleri Kaydet
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
