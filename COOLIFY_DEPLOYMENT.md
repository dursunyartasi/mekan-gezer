# Mekan Gezer - Coolify Deployment Rehberi

Bu rehber, Mekan Gezer'i Coolify üzerinden kendi sunucunuza deploy etmeniz için adım adım talimatlar içerir.

## Ön Hazırlık

### 1. Gereksinimler
- Coolify kurulu bir sunucu
- PostgreSQL veritabanı
- (Opsiyonel) Redis
- Domain adı

### 2. GitHub Repository
Projenizi GitHub'a pushlayın:

```bash
cd /Users/fotografinsani/Desktop/mekan-gezer-files/mekan-gezer
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/kullanici-adiniz/mekan-gezer.git
git branch -M main
git push -u origin main
```

## Coolify'da Proje Oluşturma

### Adım 1: Yeni Uygulama Ekle

1. Coolify dashboard'a gidin
2. "New Resource" > "Application" seçin
3. GitHub repository'nizi bağlayın
4. Repository URL: `https://github.com/kullanici-adiniz/mekan-gezer.git`
5. Branch: `main`

### Adım 2: Build Ayarları

**Build Pack:** Dockerfile

**Dockerfile Path:** `apps/web/Dockerfile`

**Build Context:** `apps/web`

**Port:** `3000`

### Adım 3: PostgreSQL Veritabanı Ekle

1. Coolify'da "New Resource" > "Database" > "PostgreSQL"
2. Database adı: `mekangezer`
3. Veritabanı oluştur ve connection string'i kopyala

### Adım 4: Environment Variables

Coolify'da uygulamanızın "Environment" sekmesine gidin ve şu değişkenleri ekleyin:

```env
# Database
DATABASE_URL=postgresql://username:password@postgres-host:5432/mekangezer

# NextAuth
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=<generate-random-secret>

# Public URLs
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_CHAT_URL=https://yourdomain.com/chat
NEXT_PUBLIC_MAPBOX_TOKEN=<your-mapbox-token>

# Node Environment
NODE_ENV=production
PORT=3000
```

#### Secret Key Oluşturma

NextAuth secret oluşturmak için:
```bash
openssl rand -base64 32
```

### Adım 5: Domain Ayarları

1. Coolify'da "Domains" sekmesine gidin
2. Domain adınızı ekleyin (örn: `mekangezer.com`)
3. SSL sertifikası otomatik oluşturulacak

### Adım 6: Prisma Migrations

İlk deployment'tan sonce, Prisma migration'larını çalıştırın:

1. Coolify'da uygulamanızın "Terminal" sekmesine gidin
2. Şu komutları çalıştırın:

```bash
npx prisma migrate deploy
npx prisma db seed  # (opsiyonel - örnek veri için)
```

### Adım 7: Deploy

"Deploy" butonuna tıklayın ve deployment'ı izleyin.

## Post-Deployment

### Health Check

Uygulama çalıştıktan sonra kontrol edin:

```bash
curl https://yourdomain.com/api/health
```

### Logs

Coolify dashboard'da "Logs" sekmesinden canlı logları görebilirsiniz.

## Troubleshooting

### Build Hataları

**Hata:** `Prisma Client not found`
**Çözüm:** Dockerfile'da `RUN npx prisma generate` komutunun çalıştığından emin olun.

**Hata:** `Module not found`
**Çözüm:** `package.json` ve `package-lock.json` dosyalarının doğru konumda olduğundan emin olun.

### Runtime Hataları

**Hata:** `Database connection failed`
**Çözüm:** `DATABASE_URL` environment variable'ının doğru olduğunu kontrol edin.

**Hata:** `NEXTAUTH_SECRET is not set`
**Çözüm:** Environment variables'da `NEXTAUTH_SECRET` ve `NEXTAUTH_URL` değerlerini ekleyin.

## Güncelleme

Yeni kod pushlayıp deployment'ı tetiklemek için:

```bash
git add .
git commit -m "Update message"
git push origin main
```

Coolify otomatik olarak yeni deployment başlatacaktır.

## Yedekleme

### Veritabanı Yedekleme

Coolify'da PostgreSQL veritabanınızın "Backups" sekmesinden otomatik yedekleme ayarlayabilirsiniz.

Manuel yedek almak için:

```bash
pg_dump -h postgres-host -U username mekangezer > backup.sql
```

## Monitoring

Coolify dashboard'da:
- CPU/Memory kullanımı
- Request logs
- Error logs
- Uptime monitoring

mevcuttur.

## Destek

Sorun yaşarsanız:
1. Coolify logs'u kontrol edin
2. GitHub Issues'da sorun açın
3. Coolify dokümantasyonuna bakın: https://coolify.io/docs

---

**Not:** Bu deployment rehberi Coolify v4+ için hazırlanmıştır.
