# Grupo Pro Kurulum ve Entegrasyon

Bu dizin Grupo Pro chat sistemini barındırır.

## 🚀 Kurulum Adımları

### 1. Grupo Pro'yu İndir

1. CodeCanyon'dan Grupo Pro'yu indirin
2. ZIP dosyasını bu dizine çıkartın
3. Tüm dosyaların `apps/chat/` altında olduğundan emin olun

```
apps/chat/
├── assets/
├── fns/
├── index.php
├── install.php
└── ... (diğer Grupo Pro dosyaları)
```

### 2. Veritabanı Ayarları

Grupo Pro PostgreSQL kullanacak şekilde yapılandırılacak.

#### config.php Düzenleme

`apps/chat/fns/config.php` dosyasını oluşturun veya düzenleyin:

```php
<?php
// Database Configuration
define('DB_TYPE', 'pgsql'); // PostgreSQL kullanıyoruz
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_PORT', getenv('DB_PORT') ?: '5432');
define('DB_NAME', getenv('DB_NAME') ?: 'mekangezer');
define('DB_USER', getenv('DB_USER') ?: 'mekangezer_user');
define('DB_PASSWORD', getenv('DB_PASSWORD'));
define('DB_SCHEMA', getenv('DB_SCHEMA') ?: 'grupo');

// Site Configuration
define('SITE_URL', getenv('SITE_URL') ?: 'http://localhost:8080');
define('SITE_NAME', 'Mekan Gezer Topluluk');

// API Settings
define('API_ENABLED', true);
define('API_SECRET_KEY', getenv('API_SECRET_KEY'));

// SSO Settings  
define('SSO_ENABLED', true);
define('SSO_SECRET', getenv('SSO_SECRET'));
?>
```

### 3. İlk Kurulum

```bash
# Docker Compose ile başlat
docker-compose up -d

# Browser'da aç
http://localhost:8080/install.php

# Kurulum sihirbazını takip et:
# - Database bilgilerini gir (Docker'dan)
# - Admin hesabı oluştur
# - Kurulumu tamamla
```

### 4. API Entegrasyonu

Grupo Pro API'si Next.js uygulaması ile entegre edilecek.

#### API Endpoints

```
POST /api/users/create       - Yeni kullanıcı oluştur
POST /api/rooms/create        - Oda oluştur
POST /api/groups/create       - Grup oluştur
POST /api/users/add_to_group  - Kullanıcıyı gruba ekle
POST /api/sso/token           - SSO token oluştur
```

#### API Key Oluşturma

1. Grupo Pro admin paneline gir
2. Settings > API Settings
3. "Generate API Key" tıkla
4. Key'i `.env` dosyasına ekle: `GRUPO_PRO_API_KEY=your_key_here`

### 5. SSO (Single Sign-On) Kurulumu

Kullanıcılar Mekan Gezer'e giriş yaptığında otomatik olarak Grupo Pro'ya da giriş yapacak.

#### SSO Akışı

```
1. Kullanıcı mekangezer.com'da giriş yapar
2. Next.js backend SSO token oluşturur
3. Chat widget açılırken token embed edilir
4. Grupo Pro token'ı doğrular ve otomatik giriş yapar
```

## 🔧 Konfigürasyon

### Otomatik Oda Yönetimi

Şehir ve semt odaları otomatik oluşturulacak:

```typescript
// Next.js seed sırasında
const istanbul = await createCity('İstanbul');

// Grupo Pro'da oda oluştur
const room = await grupoAPI.createRoom({
  name: 'İstanbul',
  type: 'city',
  auto_join: true,
});

// Room ID'yi database'e kaydet
await updateCity(istanbul.id, { grupoRoomId: room.id });
```

### Etkinlik Grupları

Her etkinlik için otomatik grup oluşturulacak:

```typescript
// Etkinlik oluşturulduğunda
const event = await createEvent({...});

if (event.autoCreateChat) {
  const group = await grupoAPI.createGroup({
    name: event.title,
    type: 'private',
    auto_delete_after: 30, // 30 gün sonra sil
  });
  
  await updateEvent(event.id, { grupoGroupId: group.id });
}
```

## 📱 Frontend Entegrasyonu

### Chat Widget (Next.js)

```tsx
// components/ChatWidget.tsx
<iframe
  src={`${CHAT_URL}/embed?token=${ssoToken}&room=${roomId}`}
  className="w-full h-full"
/>
```

### Topluluk Sayfası

```tsx
// app/topluluk/page.tsx
<div className="grid gap-4">
  <CityRooms cities={cities} />
  <EventGroups events={activeEvents} />
  <ThematicRooms categories={categories} />
</div>
```

## 🔐 Güvenlik

### API Key Güvenliği

```bash
# .env dosyasında saklayın
GRUPO_PRO_API_KEY=your_secret_key_here
GRUPO_PRO_SSO_SECRET=your_sso_secret_here

# Git'e commit etmeyin!
```

### CORS Ayarları

Grupo Pro'da sadece mekangezer.com'dan gelen isteklere izin verin:

```php
// Grupo Pro'da CORS settings
define('ALLOWED_ORIGINS', ['https://mekangezer.com', 'http://localhost:3000']);
```

## 🐛 Troubleshooting

### Database Bağlantı Hatası

```bash
# PostgreSQL şemasını kontrol et
docker exec -it mekangezer-db psql -U mekangezer_user -d mekangezer -c "\dn"

# Grupo şeması yoksa oluştur
CREATE SCHEMA IF NOT EXISTS grupo;
GRANT ALL ON SCHEMA grupo TO mekangezer_user;
```

### SSO Çalışmıyor

```bash
# Token secret'ların aynı olduğundan emin ol
# Next.js .env
GRUPO_PRO_SSO_SECRET=same_secret_here

# Grupo Pro config.php
define('SSO_SECRET', 'same_secret_here');
```

### Upload Hataları

```bash
# Klasör izinlerini kontrol et
docker exec -it mekangezer-chat chown -R www-data:www-data /var/www/html/uploads
docker exec -it mekangezer-chat chmod -R 755 /var/www/html/uploads
```

## 📚 Daha Fazla Bilgi

- [Grupo Pro Documentation](https://codecanyon.net/item/grupo-pro-chat-room-script/25263116)
- Grupo Pro API docs: `http://localhost:8080/api/docs`
