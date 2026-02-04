# Mekan Gezer - Hızlı Başlangıç 🚀

## 📦 Proje Yapısı

```
mekan-gezer/
├── apps/
│   ├── web/              # Next.js web app (PUBLIC + ADMIN)
│   └── chat/             # Grupo Pro (Buraya Grupo Pro'yu yükle)
├── database/             # SQL scripts
├── docker-compose.yml    # Tüm servisler
└── docs/                 # Dokümantasyon
```

## 🎯 İlk Kurulum (Local Development)

### 1. Gereksinimler

- Node.js 18+
- Docker & Docker Compose
- Git

### 2. Kurulum

```bash
# Repo'yu klonla
git clone <your-repo-url>
cd mekan-gezer

# Web app dependencies
cd apps/web
npm install

# Environment dosyası oluştur
cp .env.example .env.local
# .env.local dosyasını düzenle (database, mapbox token, vb.)

# Geri dön
cd ../..
```

### 3. Grupo Pro Kurulumu

```bash
# CodeCanyon'dan Grupo Pro'yu indir
# ZIP'i apps/chat/ dizinine çıkart

apps/chat/
├── assets/
├── fns/
├── index.php
├── install.php
└── ... (diğer dosyalar)
```

### 4. Docker ile Başlat

```bash
# PostgreSQL + Redis + Grupo Pro
docker-compose up -d

# Logları izle
docker-compose logs -f
```

### 5. Database Setup

```bash
cd apps/web

# Prisma migrate
npx prisma migrate dev

# Seed data (İstanbul, Ankara, İzmir + Admin user)
npm run prisma:seed
```

### 6. Grupo Pro İlk Kurulum

Browser'da aç: http://localhost:8080/install.php

**Database ayarları:**
- Host: postgres
- Port: 5432
- Database: mekangezer
- Username: mekangezer_user
- Password: (.env dosyasından)
- Schema: grupo

**Admin hesabı oluştur ve kurulumu tamamla**

### 7. Web App'i Başlat

```bash
cd apps/web
npm run dev
```

Browser: http://localhost:3000

## 🔐 Varsayılan Hesaplar

**Mekan Gezer Admin:**
- URL: http://localhost:3000/admin
- Email: admin@mekangezer.com
- Password: Admin123!

**Grupo Pro Admin:**
- URL: http://localhost:8080/admin
- (Kurulum sırasında oluşturduğunuz)

⚠️ **Önemli:** Production'da bu şifreleri değiştirin!

## 🚀 Production Deployment (Coolify)

Detaylı kılavuz: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

### Kısa Özet:

1. GitHub'a push
2. Coolify'da Docker Compose ile import et
3. Environment variables ekle
4. Deploy
5. Database migrate + seed
6. Grupo Pro kurulumu

## 📱 Proje Özellikleri

### Tamamlananlar ✅

- ✅ Database schema (PostgreSQL + PostGIS)
- ✅ Prisma ORM setup
- ✅ Docker Compose (web + chat + db)
- ✅ Grupo Pro entegrasyon API
- ✅ Next.js 14 setup
- ✅ Tailwind CSS + shadcn/ui
- ✅ Admin panel yapısı
- ✅ Türkiye il/ilçe/semt verileri
- ✅ Deployment kılavuzu (Coolify)

### Yapılacaklar 📝

**Öncelikli (MVP için):**
- [ ] Auth sistemi (NextAuth.js)
- [ ] Mekan CRUD (admin)
- [ ] Mekan listeleme (public)
- [ ] Harita entegrasyonu (Mapbox)
- [ ] Etkinlik sistemi
- [ ] Chat widget (Grupo Pro embed)
- [ ] Kullanıcı profili

**Sonraki Aşama:**
- [ ] Favoriler
- [ ] Puanlama & yorumlar
- [ ] Fotoğraf upload
- [ ] Bildirimler
- [ ] Email sistemi
- [ ] Moderasyon paneli

## 🛠️ Geliştirme Komutları

```bash
# Development
npm run dev              # Development server
npm run build            # Production build
npm run start            # Production server

# Database
npx prisma studio        # GUI for database
npx prisma migrate dev   # Create migration
npx prisma db seed       # Seed data

# Linting
npm run lint             # ESLint
```

## 📚 Önemli Dosyalar

**Backend:**
- `apps/web/prisma/schema.prisma` - Database modeli
- `apps/web/src/lib/db.ts` - Prisma client
- `apps/web/src/lib/grupo/api.ts` - Grupo Pro API wrapper

**Frontend:**
- `apps/web/src/app/layout.tsx` - Root layout
- `apps/web/src/app/page.tsx` - Ana sayfa
- `apps/web/src/app/admin/*` - Admin panel

**Config:**
- `docker-compose.yml` - Docker services
- `apps/web/next.config.js` - Next.js config
- `.env.example` - Environment variables template

## 🔍 Troubleshooting

### Port Çakışması

```bash
# Başka bir servis 3000 portunu kullanıyorsa:
docker-compose down
# docker-compose.yml'de WEB_PORT değiştir
docker-compose up -d
```

### Database Bağlanamıyor

```bash
# PostgreSQL çalışıyor mu?
docker ps | grep postgres

# Container restart
docker restart mekangezer-db

# Logs kontrol
docker logs mekangezer-db
```

### Prisma Hatası

```bash
# Client regenerate
npx prisma generate

# Database sıfırlama (UYARI: Tüm data silinir!)
npx prisma migrate reset
```

## 📞 Yardım

### Dökümantasyon
- Ana README: [README.md](../README.md)
- Deployment: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
- Grupo Pro: [apps/chat/README.md](apps/chat/README.md)

### Loglar

```bash
# Tüm servisler
docker-compose logs -f

# Sadece web
docker logs mekangezer-web -f

# Sadece chat
docker logs mekangezer-chat -f
```

## 🎉 Başarılar!

Proje hazır! Development ortamında çalışıyor olmalı:

- Web: http://localhost:3000
- Admin: http://localhost:3000/admin
- Chat: http://localhost:8080
- Database: localhost:5432

Production'a geçmek için [DEPLOYMENT.md](docs/DEPLOYMENT.md) kılavuzunu takip edin.

**Kolay gelsin!** 🚀
