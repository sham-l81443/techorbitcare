import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedAdmin() {
  console.log('🌱 Seeding admin user and sample coupons...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('Sudoski101@', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'shamz81443@gmail.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'shamz81443@gmail.com',
      password: hashedPassword,
      phone: '+919876543210',
      role: 'ADMIN',
      isVerified: true,
    },
  });

  console.log('✅ Admin user created:', adminUser.email);

  // Create sample coupons
  const coupons = [
    {
      code: 'WELCOME20',
      name: 'Welcome Discount',
      description: 'Get 20% off on your first repair service',
      discountType: 'PERCENTAGE' as const,
      discountValue: 20,
      minOrderAmount: 500,
      maxDiscountAmount: 1000,
      usageLimit: 100,
      isActive: true,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
    {
      code: 'SCREEN50',
      name: 'Screen Repair Special',
      description: '₹500 off on screen replacement services',
      discountType: 'FIXED_AMOUNT' as const,
      discountValue: 500,
      minOrderAmount: 2000,
      usageLimit: 50,
      isActive: true,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    },
    {
      code: 'BATTERY30',
      name: 'Battery Replacement Offer',
      description: '30% off on battery replacement services',
      discountType: 'PERCENTAGE' as const,
      discountValue: 30,
      minOrderAmount: 1000,
      maxDiscountAmount: 800,
      usageLimit: 75,
      isActive: true,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    },
    {
      code: 'WATER100',
      name: 'Water Damage Recovery',
      description: '₹1000 off on water damage repair services',
      discountType: 'FIXED_AMOUNT' as const,
      discountValue: 1000,
      minOrderAmount: 3000,
      usageLimit: 25,
      isActive: true,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
    },
    {
      code: 'SOFTWARE15',
      name: 'Software Repair Discount',
      description: '15% off on software-related repairs',
      discountType: 'PERCENTAGE' as const,
      discountValue: 15,
      minOrderAmount: 800,
      maxDiscountAmount: 500,
      usageLimit: 100,
      isActive: true,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    },
    {
      code: 'EXPIRED10',
      name: 'Expired Test Coupon',
      description: 'This coupon has expired for testing purposes',
      discountType: 'PERCENTAGE' as const,
      discountValue: 10,
      minOrderAmount: 500,
      usageLimit: 10,
      isActive: false,
      validFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      validUntil: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    },
  ];

  for (const couponData of coupons) {
    await prisma.coupon.upsert({
      where: { code: couponData.code },
      update: couponData,
      create: couponData,
    });
  }

  console.log('✅ Sample coupons created');

  // Create a regular user for testing
  const regularUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      name: 'Test User',
      email: 'user@example.com',
      password: await bcrypt.hash('password123', 12),
      phone: '+919876543211',
      role: 'USER',
      isVerified: true,
    },
  });

  console.log('✅ Regular user created:', regularUser.email);

  console.log('🎉 Admin seeding completed!');
  console.log('📧 Admin login: admin@techorbitcare.com');
  console.log('🔑 Admin password: admin123');
  console.log('📧 User login: user@example.com');
  console.log('🔑 User password: password123');
}

async function main() {
  try {
    await seedAdmin();
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
