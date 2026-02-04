# 🗺️ Mekan Gezer

Şehri keşfet, mekanları paylaş, topluluğa katıl.

## 🎯 Proje Hakkında

Mekan Gezer, kullanıcıların şehirlerdeki mekanları keşfetmesini, paylaşmasını ve toplulukla etkileşime geçmesini sağlayan bir sosyal keşif platformudur.

### Ana Özellikler

- 📍 **Mekan Keşfi**: Harita üzerinde mekanları keşfet, filtrele, favorilere ekle
- 📅 **Etkinlikler**: Fotoğraf gezileri, workshoplar, buluşmalar düzenle/katıl
- 💬 **Topluluk**: Şehir/semt bazlı sohbet odaları (Grupo Pro entegrasyonu)
- ⭐ **Puanlama & Yorumlar**: Mekanları değerlendir, deneyimlerini paylaş
- 🎨 **Admin Panel**: Mekan onaylama, etkinlik yönetimi, moderasyon
- 📱 **Mobil Uyumlu**: Responsive web + gelecekte native app

## 🏗️ Teknoloji Stack

### Frontend
- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** + **shadcn/ui**
- **Mapbox GL JS** (Harita)
- **React Hook Form** + **Zod** (Form validation)

### Backend
- **Next.js API Routes**
- **Prisma ORM**
- **PostgreSQL 15** + **PostGIS**
- **NextAuth.js** (Authentication)

### Chat Sistemi
- **Grupo Pro** (PHP chat application)
- SSO entegrasyonu
- Otomatik grup yönetimi

### DevOps
- **Docker** + **Docker Compose**
- **Coolify** (Deployment)
- **GitHub Actions** (CI/CD)

## 📦 Kurulum

### Gereksinimler

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 15+ (veya Docker ile)

### Hızlı Başlangıç

```bash
# Repo'yu klonla
git clone https://github.com/[username]/mekan-gezer.git
cd mekan-gezer

# Environment dosyasını oluştur
cp .env.example .env.local
# .env.local dosyasını düzenle

# Docker ile başlat (PostgreSQL + Grupo Pro)
docker-compose up -d

# Dependencies yükle
cd apps/web
npm install

# Database migrate
npx prisma migrate dev
npx prisma db seed

# Development sunucusunu başlat
npm run dev
```

Web: http://localhost:3000
Admin: http://localhost:3000/admin
Chat: http://localhost:8080

## 🚀 Coolify Deployment

```bash
# Coolify'da yeni uygulama oluştur
# Git repo'yu bağla
# Environment variables ekle (aşağıya bakın)
# Deploy!
```

### Gerekli Environment Variables

```env
DATABASE_URL=postgresql://user:pass@host:5432/mekangezer
NEXTAUTH_URL=https://mekangezer.com
NEXTAUTH_SECRET=your-secret-key
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token
GRUPO_PRO_API_URL=https://chat.mekangezer.com/api
GRUPO_PRO_API_KEY=your-grupo-api-key
```

## 📁 Proje Yapısı

```
mekan-gezer/
├── apps/
│   ├── web/                    # Next.js web app
│   │   ├── src/
│   │   │   ├── app/           # App Router pages
│   │   │   │   ├── (public)/  # Public pages
│   │   │   │   ├── admin/     # Admin panel
│   │   │   │   └── api/       # API routes
│   │   │   ├── components/    # React components
│   │   │   └── lib/           # Utilities
│   │   └── prisma/            # Database schema
│   │
│   └── chat/                   # Grupo Pro installation
│
├── database/
│   ├── migrations/            # SQL migrations
│   └── seeds/                 # Seed data (Türkiye il/ilçe)
│
├── deploy/                    # Deployment scripts
└── docker-compose.yml         # Docker configuration
```

## 👤 Kullanıcı Rolleri

- **Admin**: Tam yetki (siz)
- **Moderatör**: İçerik moderasyonu
- **Creator**: Etkinlik oluşturma
- **User**: Standart kullanıcı

## 🔐 İlk Admin Hesabı

```bash
# Seed ile otomatik oluşturulur
Email: admin@mekangezer.com
Şifre: Admin123!

# ⚠️ Production'da mutlaka değiştirin!
```

## 📱 Mobil Uygulama (Yakında)

React Native mobil uygulama geliştirme aşamasında. Web API'leri hazır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing`)
3. Commit edin (`git commit -m 'feat: amazing feature'`)
4. Push edin (`git push origin feature/amazing`)
5. Pull Request açın

## 📄 Lisans

MIT License

## 🔗 Bağlantılar

- Web: https://mekangezer.com
- Instagram: [@mekangezer](https://instagram.com/mekangezer)
- Topluluk: https://mekangezer.com/topluluk

## 💡 Destek

Sorularınız için:
- GitHub Issues
- Email: info@mekangezer.com
