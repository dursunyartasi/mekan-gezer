# 🚀 Mekan Gezer - Kurulum ve Çalıştırma Kılavuzu

## ✅ Hazırlanan Özellikler

### Auth Sistemi ✅
- [x] NextAuth.js kurulumu
- [x] Login sayfası
- [x] Register sayfası
- [x] Register API (Grupo Pro entegrasyonu ile)
- [x] Session yönetimi

### Admin Panel ✅
- [x] Admin layout (sidebar, navigation)
- [x] Dashboard (istatistikler)
- [x] Role-based access control
- [x] Admin middleware

### Database ✅
- [x] PostgreSQL + PostGIS schema
- [x] 25+ model (Prisma)
- [x] Seed data (İstanbul, Ankara, İzmir + Admin)
- [x] Grupo Pro entegrasyonu

### Altyapı ✅
- [x] Docker Compose
- [x] Environment setup
- [x] Grupo Pro API wrapper
- [x] Utilities (slugify, formatters, vb.)

---

## 📋 HEMEN YAPMANIZ GEREKENLER

### 1. Grup Pro'yu Ekleyin

```bash
# CodeCanyon'dan Grupo Pro'yu indirin
# ZIP'i şu dizine çıkartın: apps/chat/

# Sonuç:
apps/chat/
├── assets/
├── fns/
├── index.php
├── install.php
└── ... (diğer Grupo dosyaları)
```

### 2. Environment Dosyası Oluşturun

```bash
cd apps/web
cp .env.example .env.local
```

**`.env.local` dosyasını düzenleyin:**

```env
# Database
DATABASE_URL=postgresql://mekangezer_user:your_password@localhost:5432/mekangezer

# NextAuth (MUTLAKA değiştirin!)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=openssl rand -base64 32 ile oluşturun

# Mapbox (https://mapbox.com'dan ücretsiz alın)
NEXT_PUBLIC_MAPBOX_TOKEN=pk.ey...

# Grupo Pro (şimdilik boş bırakabilirsiniz)
GRUPO_PRO_API_URL=http://localhost:8080/api
GRUPO_PRO_API_KEY=grupo-kurulduktan-sonra-ekle
GRUPO_PRO_SSO_SECRET=random-string
```

### 3. Dependencies Yükleyin

```bash
cd apps/web
npm install
```

**Beklenen süre:** 2-3 dakika

### 4. Docker ile Database Başlatın

```bash
# Ana dizine dönün
cd ../..

# PostgreSQL + Redis + Grupo Pro başlat
docker-compose up -d

# Logları kontrol edin
docker-compose logs -f
```

### 5. Database'i Hazırlayın

```bash
cd apps/web

# Prisma client oluştur
npx prisma generate

# Database tablolarını oluştur
npx prisma migrate dev --name init

# Seed data ekle (İstanbul, Admin, vb.)
npm run prisma:seed
```

**Çıktı göreceksiniz:**
```
✅ Admin created: admin@mekangezer.com
✅ Cities created
✅ Districts created
✅ Neighborhoods created
✅ Categories created
✅ Sample venues created
✨ Seed completed successfully!

📧 Admin Email: admin@mekangezer.com
🔑 Admin Password: Admin123!
```

### 6. Development Server'ı Başlatın

```bash
npm run dev
```

**Artık siteler çalışıyor! 🎉**

- **Ana Site:** http://localhost:3000
- **Login:** http://localhost:3000/login
- **Register:** http://localhost:3000/register
- **Admin:** http://localhost:3000/admin (admin@mekangezer.com / Admin123!)
- **Grupo Pro:** http://localhost:8080

### 7. İlk Giriş Yapın

1. Browser'da: http://localhost:3000/login
2. Email: `admin@mekangezer.com`
3. Password: `Admin123!`
4. Login → Admin panele yönlendirileceksiniz!

### 8. Grupo Pro'yu Kurun (Opsiyonel - Chat için)

1. http://localhost:8080/install.php
2. Database ayarları:
   - Host: `postgres`
   - Database: `mekangezer`
   - Username: `mekangezer_user`
   - Password: (docker-compose.yml'den)
   - Schema: `grupo`
3. Admin hesabı oluşturun
4. Kurulum tamamlandıktan sonra:
   - Settings → API → Generate API Key
   - `.env.local`'e ekleyin: `GRUPO_PRO_API_KEY=...`
5. Web service'i restart: `npm run dev`

---

## 🎨 Ne Tamamlandı, Ne Eksik?

### ✅ TAMAMLANAN

| Özellik | Durum |
|---------|-------|
| Database Schema | ✅ %100 |
| Docker Setup | ✅ %100 |
| Auth System | ✅ %100 |
| Admin Layout | ✅ %100 |
| Admin Dashboard | ✅ %100 |
| Grupo API Wrapper | ✅ %100 |
| Landing Page | ✅ %100 |

### 📝 YAPILACAKLAR (Geliştirme Gerekiyor)

| Özellik | Öncelik | Tahmini Süre |
|---------|---------|--------------|
| **Admin - Mekan CRUD** | 🔴 Yüksek | 6-8 saat |
| **Admin - Etkinlik CRUD** | 🔴 Yüksek | 6-8 saat |
| **Public - Mekan Listeleme** | 🔴 Yüksek | 4-6 saat |
| **Harita Entegrasyonu** | 🔴 Yüksek | 6-8 saat |
| Admin - Kullanıcı Yönetimi | 🟡 Orta | 4 saat |
| Public - Etkinlikler Sayfası | 🟡 Orta | 4 saat |
| Chat Widget | 🟡 Orta | 4 saat |
| Favoriler | 🟢 Düşük | 3 saat |
| Puanlama & Yorumlar | 🟢 Düşük | 4 saat |

**Toplam MVP:** ~40-50 saat geliştirme

---

## 🔧 Geliştirme Workflow'u

### Yeni Özellik Ekleme

1. **Database değişikliği varsa:**
```bash
# schema.prisma'yı düzenle
npx prisma migrate dev --name feature_name
```

2. **API endpoint ekle:**
```typescript
// apps/web/src/app/api/[feature]/route.ts
```

3. **Page/Component oluştur:**
```typescript
// apps/web/src/app/[page]/page.tsx
// apps/web/src/components/[feature]/[Component].tsx
```

4. **Test et:**
```bash
npm run dev
# Browser'da test
```

### Debugging

**Database görüntüle:**
```bash
npx prisma studio
# http://localhost:5555
```

**Logs:**
```bash
# Web logs
npm run dev

# Docker logs
docker-compose logs -f
```

---

## 🎯 SONRAKİ ADIMLAR

### Bu Hafta İçin Öneriler:

**1. Gün (Bugün):**
- ✅ Projeyi çalıştırın
- ✅ Admin panele giriş yapın
- ✅ Prisma Studio ile database'i keşfedin

**2-3. Gün:**
- [ ] Admin Mekan CRUD sayfalarını yazın
- [ ] Mekan ekleme/düzenleme formları
- [ ] Mekan listeleme + onaylama

**4-5. Gün:**
- [ ] Public mekan listeleme sayfası
- [ ] Mekan detay sayfası
- [ ] Temel harita entegrasyonu (Mapbox)

**6-7. Gün:**
- [ ] Admin Etkinlik CRUD
- [ ] Public etkinlikler sayfası
- [ ] Katılım sistemi

**2. Hafta:**
- [ ] Chat widget entegrasyonu
- [ ] Favoriler
- [ ] Puanlama

**3. Hafta:**
- [ ] UI iyileştirmeleri
- [ ] Fotoğraf upload
- [ ] Responsive optimizasyonlar

**4. Hafta:**
- [ ] Test & bug fixes
- [ ] Coolify'a deploy
- [ ] Instagram duyurusu!

---

## 📞 Yardım

### Sık Sorunlar

**Port zaten kullanımda:**
```bash
# 3000 portundan çalışan servisi bul ve kapat
lsof -ti:3000 | xargs kill -9
```

**Database bağlanamıyor:**
```bash
# PostgreSQL çalışıyor mu?
docker ps | grep postgres

# Container restart
docker restart mekangezer-db
```

**Prisma hatası:**
```bash
# Client regenerate
npx prisma generate

# Database reset (UYARI: Tüm data silinir!)
npx prisma migrate reset
```

### Dosya Yapısı

```
apps/web/src/
├── app/
│   ├── (auth)/          # Login, Register
│   ├── admin/           # Admin panel
│   ├── api/             # API routes
│   └── page.tsx         # Landing page
├── components/          # React components
└── lib/
    ├── auth.ts          # NextAuth config
    ├── db.ts            # Prisma client
    ├── grupo/           # Grupo Pro API
    └── utils.ts         # Helpers
```

---

## 🎉 Başarılar!

Temel altyapı hazır! Şimdi:

1. ✅ Projeyi çalıştırın
2. ✅ Admin panele giriş yapın
3. ✅ Database'i keşfedin
4. 🚀 Geliştirmeye başlayın!

**Sorularınız olursa bana sorun!** 💪
