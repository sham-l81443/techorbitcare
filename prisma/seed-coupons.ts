import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCoupons() {
  console.log('🌱 Seeding coupons...');

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

  console.log('✅ Coupons seeded successfully!');
}

async function main() {
  try {
    await seedCoupons();
  } catch (error) {
    console.error('❌ Error seeding coupons:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
