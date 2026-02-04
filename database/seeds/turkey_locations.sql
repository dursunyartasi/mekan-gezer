-- Türkiye İl, İlçe ve Semt Verileri
-- Mekan Gezer için coğrafi hiyerarşi

-- Note: Bu dosya Prisma seed ile çalıştırılacak
-- Burada sadece örnek yapı gösterilmiştir

-- Şehirler (Cities)
-- İstanbul, Ankara, İzmir gibi ana şehirler

-- İlçeler (Districts) 
-- Her şehre bağlı ilçeler (Kadıköy, Beşiktaş, vb.)

-- Semtler (Neighborhoods)
-- Her ilçeye bağlı semtler (Moda, Fenerbahçe, vb.)

-- Bu veriler apps/web/prisma/seed.ts dosyasında TypeScript ile eklenecek
-- Çünkü Prisma ile daha kolay ve güvenli veri eklemek mümkün

-- Örnek veri yapısı:
-- 
-- İstanbul
--   ├─ Kadıköy
--   │   ├─ Moda
--   │   ├─ Caferağa
--   │   ├─ Fenerbahçe
--   │   └─ Rasimpaşa
--   │
--   ├─ Beşiktaş
--   │   ├─ Ortaköy
--   │   ├─ Bebek
--   │   └─ Arnavutköy
--   │
--   └─ Beyoğlu
--       ├─ Karaköy
--       ├─ Galata
--       ├─ Cihangir
--       └─ Asmalımescit
--
-- Ankara
--   ├─ Çankaya
--   ├─ Keçiören
--   └─ Mamak
--
-- İzmir
--   ├─ Konak
--   ├─ Karşıyaka
--   └─ Bornova

-- Her bölgeye Grupo Pro room_id atanacak (otomatik)

SELECT 'Türkiye coğrafi verileri Prisma seed ile yüklenecek' as info;
