import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/coupons - Get all available coupons
export async function GET(request: NextRequest) {
  try {
    // For now, we'll get userId from headers or use a mock user
    // In production, this should come from proper authentication
    const userId = request.headers.get('user-id') || 'mock-user-id';
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'available', 'used', 'expired'

    const now = new Date();
    let whereClause: Record<string, unknown> = {};

    switch (type) {
      case 'available':
        whereClause = {
          isActive: true,
          validFrom: { lte: now },
          validUntil: { gte: now },
          OR: [
            { usageLimit: null },
            { usedCount: { lt: prisma.coupon.fields.usageLimit } }
          ]
        };
        break;
      case 'used':
        whereClause = {
          userCoupons: {
            some: {
              userId: userId,
              isUsed: true
            }
          }
        };
        break;
      case 'expired':
        whereClause = {
          validUntil: { lt: now }
        };
        break;
      default:
        // Get all coupons for the user
        whereClause = {
          OR: [
            { userCoupons: { some: { userId: userId } } },
            { isActive: true, validFrom: { lte: now }, validUntil: { gte: now } }
          ]
        };
    }

    const coupons = await prisma.coupon.findMany({
      where: whereClause,
      include: {
        userCoupons: {
          where: { userId: userId },
          select: {
            isUsed: true,
            usedAt: true,
            createdAt: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Transform the data to include user-specific information
    const transformedCoupons = coupons.map(coupon => {
      const userCoupon = coupon.userCoupons[0];
      return {
        ...coupon,
        userCoupon: userCoupon || null,
        isAvailable: coupon.isActive && 
                    coupon.validFrom <= now && 
                    coupon.validUntil >= now &&
                    (!coupon.usageLimit || coupon.usedCount < coupon.usageLimit),
        isUsed: userCoupon?.isUsed || false,
        usedAt: userCoupon?.usedAt || null,
        isExpired: coupon.validUntil < now
      };
    });

    return NextResponse.json({ coupons: transformedCoupons });
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coupons' },
      { status: 500 }
    );
  }
}

// POST /api/coupons - Claim a coupon
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('user-id') || 'mock-user-id';
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { couponCode } = await request.json();

    if (!couponCode) {
      return NextResponse.json({ error: 'Coupon code is required' }, { status: 400 });
    }

    // Check if coupon exists and is valid
    const coupon = await prisma.coupon.findUnique({
      where: { code: couponCode }
    });

    if (!coupon) {
      return NextResponse.json({ error: 'Invalid coupon code' }, { status: 404 });
    }

    const now = new Date();
    if (!coupon.isActive || coupon.validFrom > now || coupon.validUntil < now) {
      return NextResponse.json({ error: 'Coupon is not valid' }, { status: 400 });
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return NextResponse.json({ error: 'Coupon usage limit exceeded' }, { status: 400 });
    }

    // Check if user already has this coupon
    const existingUserCoupon = await prisma.userCoupon.findUnique({
      where: {
        userId_couponId: {
          userId: userId,
          couponId: coupon.id
        }
      }
    });

    if (existingUserCoupon) {
      return NextResponse.json({ error: 'You already have this coupon' }, { status: 400 });
    }

    // Create user coupon
    const userCoupon = await prisma.userCoupon.create({
      data: {
        userId: userId,
        couponId: coupon.id
      },
      include: {
        coupon: true
      }
    });

    return NextResponse.json({ 
      message: 'Coupon claimed successfully',
      userCoupon 
    });
  } catch (error) {
    console.error('Error claiming coupon:', error);
    return NextResponse.json(
      { error: 'Failed to claim coupon' },
      { status: 500 }
    );
  }
}
