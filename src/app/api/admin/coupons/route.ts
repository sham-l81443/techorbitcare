import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/coupons - Get all coupons for admin
export async function GET(request: NextRequest) {
  try {
    // For now, we'll skip authentication check
    // In production, this should verify admin role
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';

    const skip = (page - 1) * limit;

    const whereClause: Record<string, unknown> = {};

    // Search filter
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Status filter
    const now = new Date();
    switch (status) {
      case 'active':
        whereClause.isActive = true;
        whereClause.validFrom = { lte: now };
        whereClause.validUntil = { gte: now };
        break;
      case 'expired':
        whereClause.validUntil = { lt: now };
        break;
      case 'inactive':
        whereClause.isActive = false;
        break;
    }

    const [coupons, total] = await Promise.all([
      prisma.coupon.findMany({
        where: whereClause,
        include: {
          userCoupons: {
            select: {
              id: true,
              isUsed: true,
              usedAt: true,
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
          _count: {
            select: {
              userCoupons: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.coupon.count({ where: whereClause }),
    ]);

    // Transform the data
    const transformedCoupons = coupons.map(coupon => {
      const usedCount = coupon.userCoupons.filter(uc => uc.isUsed).length;
      const claimedCount = coupon.userCoupons.length;
      const isExpired = coupon.validUntil < now;
      const isActive = coupon.isActive && coupon.validFrom <= now && coupon.validUntil >= now;

      return {
        ...coupon,
        usedCount,
        claimedCount,
        isExpired,
        isActive,
        usagePercentage: coupon.usageLimit ? (usedCount / coupon.usageLimit) * 100 : 0,
      };
    });

    return NextResponse.json({
      coupons: transformedCoupons,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching admin coupons:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coupons' },
      { status: 500 }
    );
  }
}

// POST /api/admin/coupons - Create a new coupon
export async function POST(request: NextRequest) {
  try {
    // For now, we'll skip authentication check
    // In production, this should verify admin role
    
    const data = await request.json();

    // Validate required fields
    const requiredFields = ['code', 'name', 'discountType', 'discountValue', 'validFrom', 'validUntil'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Check if coupon code already exists
    const existingCoupon = await prisma.coupon.findUnique({
      where: { code: data.code },
    });

    if (existingCoupon) {
      return NextResponse.json(
        { error: 'Coupon code already exists' },
        { status: 400 }
      );
    }

    // Validate discount value based on type
    if (data.discountType === 'PERCENTAGE' && data.discountValue > 100) {
      return NextResponse.json(
        { error: 'Percentage discount cannot exceed 100%' },
        { status: 400 }
      );
    }

    // Validate dates
    const validFrom = new Date(data.validFrom);
    const validUntil = new Date(data.validUntil);
    
    if (validUntil <= validFrom) {
      return NextResponse.json(
        { error: 'Valid until date must be after valid from date' },
        { status: 400 }
      );
    }

    // Create the coupon
    const coupon = await prisma.coupon.create({
      data: {
        code: data.code,
        name: data.name,
        description: data.description || null,
        discountType: data.discountType,
        discountValue: parseFloat(data.discountValue),
        minOrderAmount: data.minOrderAmount ? parseFloat(data.minOrderAmount) : null,
        maxDiscountAmount: data.maxDiscountAmount ? parseFloat(data.maxDiscountAmount) : null,
        usageLimit: data.usageLimit ? parseInt(data.usageLimit) : null,
        validFrom,
        validUntil,
        isActive: data.isActive !== false, // Default to true
      },
    });

    return NextResponse.json({
      message: 'Coupon created successfully',
      coupon,
    });
  } catch (error) {
    console.error('Error creating coupon:', error);
    return NextResponse.json(
      { error: 'Failed to create coupon' },
      { status: 500 }
    );
  }
}
