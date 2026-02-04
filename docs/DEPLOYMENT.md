# Mekan Gezer - Coolify Deployment Kılavuzu

Bu kılavuz Hostinger VPS + Coolify kurulumunuz için hazırlanmıştır.

## 📋 Ön Hazırlık

### 1. GitHub Repository Oluştur

```bash
# Local'de
git init
git add .
git commit -m "Initial commit: Mekan Gezer"
git branch -M main
git remote add origin https://github.com/[username]/mekan-gezer.git
git push -u origin main
```

### 2. Environment Variables Hazırla

Aşağıdaki değişkenleri Coolify'da ayarlayacaksınız:

```env
# Database
DB_NAME=mekangezer
DB_USER=mekangezer_user
DB_PASSWORD=<güçlü-şifre>

# Database URL (Prisma için)
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/${DB_NAME}

# NextAuth
NEXTAUTH_URL=https://mekangezer.com
NEXTAUTH_SECRET=<openssl rand -base64 32 ile oluştur>

# Public URLs
NEXT_PUBLIC_APP_URL=https://mekangezer.com
NEXT_PUBLIC_CHAT_URL=https://chat.mekangezer.com

# Mapbox (https://mapbox.com'dan alın)
NEXT_PUBLIC_MAPBOX_TOKEN=pk.ey...

# Grupo Pro
GRUPO_PRO_API_URL=https://chat.mekangezer.com/api
GRUPO_PRO_API_KEY=<grupo-pro-api-key>
GRUPO_PRO_SSO_SECRET=<secure-random-string>

# Redis (optional)
REDIS_PASSWORD=<redis-password>
```

## 🚀 Coolify'da Kurulum

### Adım 1: Yeni Proje Oluştur

1. Coolify dashboard'a gir
2. **+ New Resource** → **Docker Compose**
3. **Source:** GitHub repository seç
4. **Branch:** main
5. **Compose File Path:** `docker-compose.yml`

### Adım 2: Environment Variables Ekle

Coolify UI'da **Environment** sekmesine git ve yukarıdaki tüm değişkenleri ekle.

**Önemli:** 
- `NEXTAUTH_SECRET` için: `openssl rand -base64 32`
- `GRUPO_PRO_API_KEY` Grupo Pro kurulumundan sonra eklenecek

### Adım 3: Domain Ayarları

**mekangezer.com:**
- Service: `web`
- Port: `3000`
- SSL: ✅ Enable (Let's Encrypt)

**chat.mekangezer.com:**
- Service: `chat`
- Port: `80`
- SSL: ✅ Enable

### Adım 4: Deploy

1. **Save & Deploy** butonuna bas
2. Deployment loglarını takip et
3. İlk deployment 5-10 dakika sürebilir

## 🗄️ Database Kurulumu

Deployment tamamlandıktan sonra:

### 1. Prisma Migrate

```bash
# Coolify web service container'ına bağlan
# Coolify UI: Services → web → Terminal

# Migration çalıştır
npx prisma migrate deploy

# Seed verileri ekle
npm run prisma:seed
```

Alternatif (local'den):

```bash
# Production database'e bağlan
DATABASE_URL="postgresql://..." npx prisma migrate deploy
DATABASE_URL="postgresql://..." npm run prisma:seed
```

## 📱 Grupo Pro Kurulumu

### 1. İlk Erişim

```
https://chat.mekangezer.com/install.php
```

### 2. Installation Wizard

**Database Settings:**
- Host: `postgres` (Docker network)
- Port: `5432`
- Database: `mekangezer`
- Username: `mekangezer_user`
- Password: (Coolify env'den)
- Schema: `grupo`

**Admin Account:**
- Username: admin
- Email: admin@mekangezer.com
- Password: <güçlü-şifre>

### 3. API Key Alma

1. Grupo Pro admin'e giriş yap
2. **Settings** → **API Settings**
3. **Generate API Key**
4. Key'i Coolify environment variables'a ekle:
   ```
   GRUPO_PRO_API_KEY=<your-api-key>
   ```
5. Web service'i restart et

### 4. SSO Kurulumu

Grupo Pro config dosyasını düzenle:

```bash
# Coolify: chat service terminal

vi /var/www/html/fns/config.php
```

Ekle/Düzenle:

```php
<?php
define('SSO_ENABLED', true);
define('SSO_SECRET', getenv('GRUPO_PRO_SSO_SECRET'));
define('API_ENABLED', true);
define('API_SECRET_KEY', getenv('GRUPO_PRO_API_KEY'));
?>
```

## 🔍 İlk Kontroller

### 1. Web App Çalışıyor mu?

```bash
curl https://mekangezer.com/api/health
# Beklenen: {"status":"ok"}
```

### 2. Database Bağlantısı

```bash
curl https://mekangezer.com/api/cities
# Beklenen: İstanbul, Ankara, İzmir listesi
```

### 3. Chat Erişilebilir mi?

```
https://chat.mekangezer.com
# Giriş ekranı görünmeli
```

### 4. Admin Panel

```
https://mekangezer.com/admin
# Admin login:
# Email: admin@mekangezer.com
# Password: Admin123!
# ⚠️ Hemen değiştirin!
```

## 🔧 Post-Deployment

### 1. Admin Şifresini Değiştir

```
https://mekangezer.com/admin/profile
```

### 2. Grupo Pro Admin Şifresini Değiştir

```
https://chat.mekangezer.com/admin
```

### 3. Şehir Chat Odaları Oluştur

Admin panel → Topluluk → Odalar Oluştur

Veya API ile otomatik:

```bash
# Terminal (local veya Coolify)
npm run sync:chat-rooms
```

### 4. Test Etkinliği Oluştur

Admin panel → Etkinlikler → Yeni Etkinlik

### 5. Mapbox Token Ekle

1. https://mapbox.com'da hesap aç
2. Access Token oluştur
3. Coolify env variables'a ekle: `NEXT_PUBLIC_MAPBOX_TOKEN`
4. Web service restart

## 📊 Monitoring

### Logs Görüntüleme

**Coolify UI:**
- Services → web → Logs
- Services → chat → Logs
- Services → postgres → Logs

**Shell'den:**

```bash
# Web logs
docker logs mekangezer-web -f

# Chat logs
docker logs mekangezer-chat -f

# Database logs
docker logs mekangezer-db -f
```

### Health Checks

Coolify otomatik health check yapıyor:
- Web: `http://localhost:3000/api/health`
- Chat: `http://localhost/`
- Database: `pg_isready`

## 🔄 Güncellemeler

### Git Push Deployment

```bash
# Local'de değişiklik yap
git add .
git commit -m "Update: ..."
git push origin main

# Coolify otomatik deploy eder (webhook varsa)
# Yoksa manuel: Coolify UI → Redeploy
```

### Manual Deployment

Coolify UI → Services → **Redeploy** butonu

## 🐛 Troubleshooting

### Web Service Başlamıyor

```bash
# Logs kontrol
docker logs mekangezer-web

# Yaygın sorun: DATABASE_URL yanlış
# Coolify env variables kontrol et
```

### Chat Bağlanamıyor

```bash
# Database şeması var mı?
docker exec -it mekangezer-db psql -U mekangezer_user -d mekangezer -c "\dn"

# Grupo şeması yoksa:
docker exec -it mekangezer-db psql -U mekangezer_user -d mekangezer -c "CREATE SCHEMA IF NOT EXISTS grupo;"
```

### API Key Hatası

```bash
# Grupo Pro API key doğru mu?
curl -H "Authorization: Bearer $GRUPO_PRO_API_KEY" https://chat.mekangezer.com/api/test

# Key yeniden oluştur: Grupo Pro admin panel
```

### SSL Sertifikası Hatası

Coolify otomatik Let's Encrypt kullanır. Manuel renewal:

```bash
# Coolify server'da
coolify ssl:renew mekangezer.com
```

## 📞 Yardım

### Loglar

```bash
# Tüm container'ları göster
docker ps

# Bir container'ın loglarını izle
docker logs -f <container-name>
```

### Database Erişimi

```bash
# PSQL ile bağlan
docker exec -it mekangezer-db psql -U mekangezer_user -d mekangezer

# Query çalıştır
SELECT * FROM users WHERE role = 'admin';
```

### Service Restart

Coolify UI → Service → **Restart** butonu

Veya:

```bash
docker restart mekangezer-web
docker restart mekangezer-chat
```

## 🎉 Deployment Tamamlandı!

Site şurada yayında: **https://mekangezer.com**

Admin panel: **https://mekangezer.com/admin**

Topluluk: **https://mekangezer.com/topluluk**

Instagram: **[@mekangezer](https://instagram.com/mekangezer)**
