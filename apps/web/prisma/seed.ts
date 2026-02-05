// Prisma Seed - Initial Data
// Run: npm run prisma:seed

import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // ============================================
  // 1. Create Admin User
  // ============================================
  console.log('👤 Creating admin user...');

  const adminDefaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'Admin123!';
  const adminPassword = await bcrypt.hash(adminDefaultPassword, 10);

  if (process.env.ADMIN_DEFAULT_PASSWORD) {
    console.log('⚠️  Using admin password from ADMIN_DEFAULT_PASSWORD environment variable');
  } else {
    console.log('⚠️  ADMIN_DEFAULT_PASSWORD not set, using default password');
  }

  const admin = await prisma.user.upsert({
    where: { email: 'admin@mekangezer.com' },
    update: {},
    create: {
      email: 'admin@mekangezer.com',
      username: 'admin',
      passwordHash: adminPassword,
      role: UserRole.admin,
      firstName: 'Admin',
      lastName: 'Mekan Gezer',
      bio: 'Mekan Gezer ekibi',
    },
  });

  console.log(`✅ Admin created: ${admin.email}`);

  // ============================================
  // 2. Create Cities
  // ============================================
  console.log('🏙️ Creating cities...');

  const istanbul = await prisma.city.upsert({
    where: { slug: 'istanbul' },
    update: {},
    create: {
      name: 'İstanbul',
      slug: 'istanbul',
      latitude: 41.0082,
      longitude: 28.9784,
    },
  });

  const ankara = await prisma.city.upsert({
    where: { slug: 'ankara' },
    update: {},
    create: {
      name: 'Ankara',
      slug: 'ankara',
      latitude: 39.9334,
      longitude: 32.8597,
    },
  });

  const izmir = await prisma.city.upsert({
    where: { slug: 'izmir' },
    update: {},
    create: {
      name: 'İzmir',
      slug: 'izmir',
      latitude: 38.4237,
      longitude: 27.1428,
    },
  });

  console.log('✅ Cities created');

  // ============================================
  // 3. Create Districts (İstanbul)
  // ============================================
  console.log('📍 Creating districts...');

  const kadikoy = await prisma.district.upsert({
    where: { cityId_slug: { cityId: istanbul.id, slug: 'kadikoy' } },
    update: {},
    create: {
      name: 'Kadıköy',
      slug: 'kadikoy',
      cityId: istanbul.id,
      latitude: 40.9833,
      longitude: 29.0333,
    },
  });

  const besiktas = await prisma.district.upsert({
    where: { cityId_slug: { cityId: istanbul.id, slug: 'besiktas' } },
    update: {},
    create: {
      name: 'Beşiktaş',
      slug: 'besiktas',
      cityId: istanbul.id,
      latitude: 41.0422,
      longitude: 29.0078,
    },
  });

  const beyoglu = await prisma.district.upsert({
    where: { cityId_slug: { cityId: istanbul.id, slug: 'beyoglu' } },
    update: {},
    create: {
      name: 'Beyoğlu',
      slug: 'beyoglu',
      cityId: istanbul.id,
      latitude: 41.0370,
      longitude: 28.9857,
    },
  });

  const sisli = await prisma.district.upsert({
    where: { cityId_slug: { cityId: istanbul.id, slug: 'sisli' } },
    update: {},
    create: {
      name: 'Şişli',
      slug: 'sisli',
      cityId: istanbul.id,
      latitude: 41.0602,
      longitude: 28.9870,
    },
  });

  console.log('✅ Districts created');

  // ============================================
  // 4. Create Neighborhoods
  // ============================================
  console.log('🏘️ Creating neighborhoods...');

  // Kadıköy Neighborhoods
  await prisma.neighborhood.createMany({
    skipDuplicates: true,
    data: [
      {
        name: 'Moda',
        slug: 'moda',
        districtId: kadikoy.id,
        latitude: 40.9833,
        longitude: 29.0250,
      },
      {
        name: 'Caferağa',
        slug: 'caferaga',
        districtId: kadikoy.id,
        latitude: 40.9867,
        longitude: 29.0311,
      },
      {
        name: 'Fenerbahçe',
        slug: 'fenerbahce',
        districtId: kadikoy.id,
        latitude: 40.9667,
        longitude: 29.0333,
      },
      {
        name: 'Rasimpaşa',
        slug: 'rasimpasa',
        districtId: kadikoy.id,
        latitude: 40.9900,
        longitude: 29.0250,
      },
    ],
  });

  // Beşiktaş Neighborhoods
  await prisma.neighborhood.createMany({
    skipDuplicates: true,
    data: [
      {
        name: 'Ortaköy',
        slug: 'ortakoy',
        districtId: besiktas.id,
        latitude: 41.0553,
        longitude: 29.0261,
      },
      {
        name: 'Bebek',
        slug: 'bebek',
        districtId: besiktas.id,
        latitude: 41.0833,
        longitude: 29.0500,
      },
      {
        name: 'Arnavutköy',
        slug: 'arnavutkoy',
        districtId: besiktas.id,
        latitude: 41.0667,
        longitude: 29.0333,
      },
    ],
  });

  // Beyoğlu Neighborhoods
  await prisma.neighborhood.createMany({
    skipDuplicates: true,
    data: [
      {
        name: 'Karaköy',
        slug: 'karakoy',
        districtId: beyoglu.id,
        latitude: 41.0238,
        longitude: 28.9740,
      },
      {
        name: 'Galata',
        slug: 'galata',
        districtId: beyoglu.id,
        latitude: 41.0267,
        longitude: 28.9743,
      },
      {
        name: 'Cihangir',
        slug: 'cihangir',
        districtId: beyoglu.id,
        latitude: 41.0333,
        longitude: 28.9833,
      },
      {
        name: 'Asmalımescit',
        slug: 'asmalimescit',
        districtId: beyoglu.id,
        latitude: 41.0311,
        longitude: 28.9761,
      },
    ],
  });

  console.log('✅ Neighborhoods created');

  // ============================================
  // 5. Create Categories
  // ============================================
  console.log('📂 Creating categories...');

  const categories = [
    { name: 'Kafe & Kahve', slug: 'kafe-kahve', icon: 'coffee' },
    { name: 'Restoran', slug: 'restoran', icon: 'utensils' },
    { name: 'Bar', slug: 'bar', icon: 'beer' },
    { name: 'Müze', slug: 'muze', icon: 'landmark' },
    { name: 'Galeri', slug: 'galeri', icon: 'palette' },
    { name: 'Park', slug: 'park', icon: 'trees' },
    { name: 'Plaj', slug: 'plaj', icon: 'umbrella-beach' },
    { name: 'Tarihi Mekan', slug: 'tarihi-mekan', icon: 'building-columns' },
    { name: 'Alışveriş', slug: 'alisveris', icon: 'shopping-bag' },
    { name: 'Gece Hayatı', slug: 'gece-hayati', icon: 'music' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  console.log('✅ Categories created');

  // ============================================
  // 6. Create Sample Venues (Optional)
  // ============================================
  console.log('🏪 Creating sample venues...');

  const cafeCategory = await prisma.category.findUnique({
    where: { slug: 'kafe-kahve' },
  });

  const moda = await prisma.neighborhood.findFirst({
    where: { slug: 'moda' },
  });

  if (cafeCategory && moda) {
    await prisma.venue.create({
      data: {
        name: 'Moda Teras Cafe (Örnek)',
        slug: 'moda-teras-cafe-ornek',
        description: 'Moda\'nın en güzel manzaralı kafelerinden biri. Deniz manzarası eşliğinde kahvenizi yudumlayın.',
        categoryId: cafeCategory.id,
        latitude: 40.9833,
        longitude: 29.0250,
        address: 'Moda Caddesi No: 123, Kadıköy, İstanbul',
        cityId: istanbul.id,
        districtId: kadikoy.id,
        neighborhoodId: moda.id,
        submittedById: admin.id,
        status: 'approved',
        approvedAt: new Date(),
        averageRating: 4.5,
        ratingCount: 12,
      },
    });
  }

  console.log('✅ Sample venues created');

  // ============================================
  // 7. Create Sample Event
  // ============================================
  console.log('📅 Creating sample event...');

  const venue = await prisma.venue.findFirst({
    where: { slug: 'moda-teras-cafe-ornek' },
  });

  if (venue) {
    await prisma.event.create({
      data: {
        title: 'Kadıköy Fotoğraf Yürüyüşü',
        slug: 'kadikoy-fotograf-yuruyusu-ornek',
        description: 'Kadıköy\'ün sokakları, renkli duvarları ve tarihi dokusunu fotoğraflayacağımız bir gün.',
        eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 hafta sonra
        venueId: venue.id,
        latitude: venue.latitude,
        longitude: venue.longitude,
        capacity: 20,
        isFree: true,
        createdById: admin.id,
        status: 'published',
        autoCreateChat: true,
      },
    });
  }

  console.log('✅ Sample event created');

  console.log('');
  console.log('✨ Seed completed successfully!');
  console.log('');
  console.log('📧 Admin Email: admin@mekangezer.com');
  if (process.env.ADMIN_DEFAULT_PASSWORD) {
    console.log('🔑 Admin Password: (from ADMIN_DEFAULT_PASSWORD env variable)');
  } else {
    console.log('🔑 Admin Password: Admin123!');
  }
  console.log('⚠️  Please change the password after first login!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
