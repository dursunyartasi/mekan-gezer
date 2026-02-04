// Gerçek mekan verileri - Production için API'den gelecek

export interface Venue {
  id: number;
  name: string;
  category: string;
  location: string;
  district: string;
  city: string;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  coordinates: { lat: number; lng: number };
  isFavorite?: boolean;
  views?: number;
  status?: 'approved' | 'pending' | 'rejected';
  submittedBy?: string;
  date?: string;
}

export const venues: Venue[] = [
  {
    id: 1,
    name: 'Kahve Dünyası Moda',
    category: 'Kafe',
    location: 'Moda, Kadıköy',
    district: 'Kadıköy',
    city: 'İstanbul',
    rating: 4.5,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600',
    ],
    description: 'Boğaz manzaralı, huzurlu bir kafe',
    features: ['WiFi', 'Dış Mekan', 'Köpek Dostu'],
    coordinates: { lat: 40.9875, lng: 29.0267 },
    isFavorite: false,
    views: 1234,
    status: 'approved',
    submittedBy: 'Ahmet Y.',
    date: '2024-02-01',
  },
  {
    id: 2,
    name: 'İstanbul Modern',
    category: 'Müze',
    location: 'Karaköy, Beyoğlu',
    district: 'Beyoğlu',
    city: 'İstanbul',
    rating: 4.8,
    reviewCount: 256,
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800',
    images: [
      'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600',
    ],
    description: 'Türkiye\'nin önde gelen çağdaş sanat müzesi',
    features: ['Sergi', 'Atölye', 'Kafe'],
    coordinates: { lat: 41.0256, lng: 28.9742 },
    isFavorite: true,
    views: 2567,
    status: 'approved',
    submittedBy: 'Zeynep K.',
    date: '2024-02-02',
  },
  {
    id: 3,
    name: 'Maçka Parkı',
    category: 'Park',
    location: 'Maçka, Şişli',
    district: 'Şişli',
    city: 'İstanbul',
    rating: 4.6,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800',
    images: [
      'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600',
    ],
    description: 'Şehrin ortasında yeşil bir nefes alanı',
    features: ['Yürüyüş Yolu', 'Çocuk Parkı', 'Kafeterya'],
    coordinates: { lat: 41.0431, lng: 28.9944 },
    isFavorite: false,
    views: 890,
    status: 'pending',
    submittedBy: 'Mehmet D.',
    date: '2024-02-03',
  },
  {
    id: 4,
    name: 'Pera Müzesi',
    category: 'Müze',
    location: 'Tepebaşı, Beyoğlu',
    district: 'Beyoğlu',
    city: 'İstanbul',
    rating: 4.7,
    reviewCount: 187,
    image: 'https://images.unsplash.com/photo-1596386461350-326ccb871a9d?w=800',
    images: [
      'https://images.unsplash.com/photo-1596386461350-326ccb871a9d?w=600',
    ],
    description: 'Oryantalist resim koleksiyonu',
    features: ['Sergi', 'Rehberli Tur', 'Müze Dükkanı'],
    coordinates: { lat: 41.0324, lng: 28.9744 },
    isFavorite: false,
    views: 1876,
    status: 'approved',
    submittedBy: 'Ayşe S.',
    date: '2024-02-02',
  },
  {
    id: 5,
    name: 'Starbucks Bebek',
    category: 'Kafe',
    location: 'Bebek, Beşiktaş',
    district: 'Beşiktaş',
    city: 'İstanbul',
    rating: 4.3,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
    images: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600',
    ],
    description: 'Boğaz kenarında kahve keyfi',
    features: ['WiFi', 'Boğaz Manzarası', 'Dış Mekan'],
    coordinates: { lat: 41.0826, lng: 29.0431 },
    isFavorite: true,
    views: 2100,
    status: 'approved',
    submittedBy: 'Can Ö.',
    date: '2024-01-28',
  },
  {
    id: 6,
    name: 'Emirgan Korusu',
    category: 'Park',
    location: 'Emirgan, Sarıyer',
    district: 'Sarıyer',
    city: 'İstanbul',
    rating: 4.8,
    reviewCount: 342,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
    ],
    description: 'Lale festivalinin düzenlendiği muhteşem park',
    features: ['Piknik Alanı', 'Yürüyüş', 'Kafeterya', 'Tarihi Köşkler'],
    coordinates: { lat: 41.1089, lng: 29.0553 },
    isFavorite: false,
    views: 1650,
    status: 'approved',
    submittedBy: 'Elif Y.',
    date: '2024-01-30',
  },
  {
    id: 7,
    name: 'Karaköy Lokantası',
    category: 'Restoran',
    location: 'Karaköy, Beyoğlu',
    district: 'Beyoğlu',
    city: 'İstanbul',
    rating: 4.6,
    reviewCount: 412,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
    ],
    description: 'Geleneksel Türk mutfağı ve nostaljik atmosfer',
    features: ['Türk Mutfağı', 'Rezervasyon', 'Meyhane'],
    coordinates: { lat: 41.0242, lng: 28.9744 },
    isFavorite: false,
    views: 3200,
    status: 'approved',
    submittedBy: 'Ahmet Y.',
    date: '2024-01-25',
  },
  {
    id: 8,
    name: 'Sakıp Sabancı Müzesi',
    category: 'Müze',
    location: 'Emirgan, Sarıyer',
    district: 'Sarıyer',
    city: 'İstanbul',
    rating: 4.9,
    reviewCount: 289,
    image: 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=800',
    images: [
      'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=600',
    ],
    description: 'Boğaz manzaralı sanat müzesi',
    features: ['Sergi', 'Bahçe', 'Kafe', 'Müze Dükkanı'],
    coordinates: { lat: 41.1078, lng: 29.0478 },
    isFavorite: true,
    views: 1980,
    status: 'approved',
    submittedBy: 'Zeynep K.',
    date: '2024-01-22',
  },
];

// Kategorileri dinamik olarak çıkar
export const getUniqueCategories = () => {
  const categories = [...new Set(venues.map(v => v.category))];
  return categories.map(cat => ({
    id: cat.toLowerCase(),
    name: cat,
    count: venues.filter(v => v.category === cat).length,
  }));
};

// Şehirleri dinamik olarak çıkar
export const getUniqueCities = () => {
  const cities = [...new Set(venues.map(v => v.city))];
  return cities.map(city => ({
    id: city.toLowerCase(),
    name: city,
    count: venues.filter(v => v.city === city).length,
  }));
};
