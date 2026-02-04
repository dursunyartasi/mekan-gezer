'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Save, Trash2, Users, Upload, X } from 'lucide-react';
import Link from 'next/link';

export default function AdminEtkinlikDuzenlePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [formData, setFormData] = useState({
    title: 'Kadıköy Sokakları Foto Yürüyüşü',
    category: 'photo-walk',
    date: '2024-02-15',
    startTime: '14:00',
    endTime: '17:00',
    location: 'Kadıköy, İstanbul',
    meetingPoint: 'Kadıköy İskele Meydanı',
    capacity: 30,
    price: 0,
    difficulty: 'easy',
    description: 'Kadıköy\'ün renkli sokaklarını fotoğraflayacağız.',
    program: '',
    whatToBring: '',
    rules: '',
    whatsappContact: '',
    status: 'published',
  });

  const [images, setImages] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving event:', formData);
    alert('Etkinlik başarıyla güncellendi!');
    router.push('/admin/etkinlikler');
  };

  const handleDelete = () => {
    if (confirm('Bu etkinliği silmek istediğinizden emin misiniz?')) {
      console.log('Deleting event:', id);
      alert('Etkinlik silindi!');
      router.push('/admin/etkinlikler');
    }
  };

  const handlePublish = () => {
    const updatedData = { ...formData, status: 'published' };
    setFormData(updatedData);
    console.log('Publishing event:', updatedData);
    alert('Etkinlik yayınlandı!');
  };

  const handleDraft = () => {
    const updatedData = { ...formData, status: 'draft' };
    setFormData(updatedData);
    console.log('Moving to draft:', updatedData);
    alert('Etkinlik taslağa alındı!');
  };

  const handleCancel = () => {
    if (confirm('Bu etkinliği iptal etmek istediğinizden emin misiniz?')) {
      setFormData({ ...formData, status: 'cancelled' });
      alert('Etkinlik iptal edildi!');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result as string);
        if (newImages.length === files.length) {
          setImages([...images, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin/etkinlikler" className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition mb-4">
          <ArrowLeft className="w-4 h-4" />
          Etkinliklere Dön
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Etkinlik Düzenle</h1>
        <p className="text-gray-600">ID: {id}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Temel Bilgiler</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Etkinlik Başlığı *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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
                  <option value="photo-walk">Fotoğraf Yürüyüşü</option>
                  <option value="workshop">Workshop</option>
                  <option value="meetup">Buluşma</option>
                  <option value="exhibition">Sergi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Zorluk Seviyesi *
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="easy">Kolay</option>
                  <option value="medium">Orta</option>
                  <option value="hard">Zor</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Tarih *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Başlangıç Saati *
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Bitiş Saati *
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Konum *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Buluşma Noktası *
                </label>
                <input
                  type="text"
                  name="meetingPoint"
                  value={formData.meetingPoint}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Katılımcı Kapasitesi *
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Ücret (₺)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <p className="text-sm text-gray-500 mt-1">0 = Ücretsiz</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                WhatsApp İletişim
              </label>
              <input
                type="tel"
                name="whatsappContact"
                value={formData.whatsappContact}
                onChange={handleChange}
                placeholder="+90 555 123 45 67"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Etkinlik hakkında sorular için WhatsApp numarası (isteğe bağlı)
              </p>
            </div>

            <div>
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
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Detaylı Bilgiler</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Program (Her satır bir madde)
              </label>
              <textarea
                name="program"
                value={formData.program}
                onChange={handleChange}
                rows={6}
                placeholder="14:00 - Buluşma ve tanışma&#10;14:15 - Yürüyüşe başlangıç&#10;..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Yanınızda Getirecekler (Her satır bir madde)
              </label>
              <textarea
                name="whatToBring"
                value={formData.whatToBring}
                onChange={handleChange}
                rows={4}
                placeholder="Fotoğraf makinesi&#10;Rahat ayakkabılar&#10;..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Kurallar (Her satır bir madde)
              </label>
              <textarea
                name="rules"
                value={formData.rules}
                onChange={handleChange}
                rows={4}
                placeholder="Zamanında gelin&#10;Grup kurallarına uyun&#10;..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Görseller</h2>

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Event ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Etkinlik görsellerini yükleyin</p>
            <p className="text-sm text-gray-500 mb-4">PNG, JPG veya GIF (MAX. 5MB)</p>
            <input
              type="file"
              id="image-upload"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label
              htmlFor="image-upload"
              className="inline-block px-6 py-2 text-orange-500 font-medium hover:text-orange-600 cursor-pointer"
            >
              Dosya Seç
            </label>
          </div>
        </div>

        {/* Status & Participants */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Durum & Katılımcılar</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Etkinlik Durumu
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="draft">Taslak</option>
                <option value="published">Yayında</option>
                <option value="completed">Tamamlandı</option>
                <option value="cancelled">İptal Edildi</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Mevcut Katılımcı Sayısı
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="text-lg font-bold text-gray-900">24 / {formData.capacity}</span>
                </div>
                <Link
                  href={`/admin/etkinlikler/${id}/katilimcilar`}
                  className="px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition whitespace-nowrap"
                >
                  Katılımcıları Gör
                </Link>
              </div>
            </div>
          </div>

          {formData.status === 'draft' && (
            <div className="mt-4">
              <button
                type="button"
                onClick={handlePublish}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Etkinliği Yayınla
              </button>
            </div>
          )}

          {formData.status === 'published' && (
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={handleDraft}
                className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
              >
                Taslağa Al
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Etkinliği İptal Et
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleDelete}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Etkinliği Sil
          </button>

          <div className="flex gap-3">
            <Link
              href="/admin/etkinlikler"
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
