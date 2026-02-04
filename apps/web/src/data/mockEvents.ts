// Gerçek etkinlik verileri - Production için API'den gelecek

export interface Event {
  id: number;
  title: string;
  image: string;
  images: string[];
  date: string;
  time: string;
  endTime?: string;
  participants: number;
  maxParticipants: number;
  location: string;
  organizer: string;
  rating: number;
  price: number;
  category: string;
  difficulty: string;
  description: string;
  status: 'draft' | 'published' | 'completed' | 'cancelled';
}

export const events: Event[] = [
  {
    id: 1,
    title: 'Kadıköy Sokakları Foto Yürüyüşü',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600',
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600',
    ],
    date: '2024-02-15',
    time: '14:00',
    endTime: '17:00',
    participants: 24,
    maxParticipants: 30,
    location: 'Kadıköy, İstanbul',
    organizer: 'Ahmet Y.',
    rating: 4.8,
    price: 0,
    category: 'Fotoğraf Yürüyüşü',
    difficulty: 'Kolay',
    description: 'Kadıköy\'ün renkli sokaklarını keşfedip fotoğraflayacağız',
    status: 'published',
  },
  {
    id: 2,
    title: 'Galata Kulesi & Çevresi Workshop',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800',
    images: [
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600',
    ],
    date: '2024-02-18',
    time: '10:00',
    endTime: '13:00',
    participants: 18,
    maxParticipants: 20,
    location: 'Galata, İstanbul',
    organizer: 'Zeynep K.',
    rating: 4.9,
    price: 150,
    category: 'Workshop',
    difficulty: 'Orta',
    description: 'Galata\'da mimari fotoğrafçılık teknikleri',
    status: 'published',
  },
  {
    id: 3,
    title: 'Boğaz Kıyısı Gün Batımı',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800',
    images: [
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600',
    ],
    date: '2024-02-20',
    time: '17:00',
    endTime: '19:30',
    participants: 32,
    maxParticipants: 40,
    location: 'Ortaköy, İstanbul',
    organizer: 'Mehmet D.',
    rating: 4.7,
    price: 0,
    category: 'Fotoğraf Yürüyüşü',
    difficulty: 'Kolay',
    description: 'Boğaz\'ın muhteşem gün batımını fotoğraflayalım',
    status: 'draft',
  },
  {
    id: 4,
    title: 'Portre Fotoğrafçılığı Atölyesi',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800',
    images: [
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600',
    ],
    date: '2024-02-25',
    time: '13:00',
    endTime: '17:00',
    participants: 12,
    maxParticipants: 15,
    location: 'Beşiktaş, İstanbul',
    organizer: 'Can Ö.',
    rating: 4.9,
    price: 250,
    category: 'Workshop',
    difficulty: 'Orta',
    description: 'Portre fotoğrafçılığının temel teknikleri',
    status: 'published',
  },
  {
    id: 5,
    title: 'Bebek Sahili Sabah Yürüyüşü',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
    ],
    date: '2024-02-27',
    time: '07:00',
    endTime: '09:00',
    participants: 20,
    maxParticipants: 30,
    location: 'Bebek, İstanbul',
    organizer: 'Elif Y.',
    rating: 4.5,
    price: 0,
    category: 'Fotoğraf Yürüyüşü',
    difficulty: 'Kolay',
    description: 'Sabah ışığında Bebek sahilini fotoğraflayacağız',
    status: 'published',
  },
];

// Kategorileri dinamik olarak çıkar
export const getUniqueEventCategories = () => {
  const categories = [...new Set(events.map(e => e.category))];
  return categories.map(cat => ({
    id: cat.toLowerCase().replace(/ /g, '-'),
    name: cat,
    count: events.filter(e => e.category === cat).length,
  }));
};

// Durumları dinamik olarak çıkar
export const getEventStatuses = () => {
  return [
    { id: 'published', name: 'Yayında', count: events.filter(e => e.status === 'published').length },
    { id: 'draft', name: 'Taslak', count: events.filter(e => e.status === 'draft').length },
    { id: 'completed', name: 'Tamamlandı', count: events.filter(e => e.status === 'completed').length },
    { id: 'cancelled', name: 'İptal', count: events.filter(e => e.status === 'cancelled').length },
  ].filter(s => s.count > 0);
};
