import { prisma } from './prisma'

// User operations
export const createUser = async (data: {
  email: string
  name: string
  phone: string
  password: string
}) => {
  return await prisma.user.create({
    data
  })
}

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email }
  })
}

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id }
  })
}

export const updateUser = async (id: string, data: {
  name?: string
  phone?: string
  isVerified?: boolean
}) => {
  return await prisma.user.update({
    where: { id },
    data
  })
}

// Coupon operations
export const createCoupon = async (data: {
  name: string
  code: string
  description?: string
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT'
  discountValue: number
  minOrderAmount?: number
  maxDiscountAmount?: number
  validFrom: Date
  validUntil: Date
  usageLimit?: number
  isActive: boolean
}) => {
  return await prisma.coupon.create({
    data
  })
}

export const getCoupon = async (id: string) => {
  return await prisma.coupon.findUnique({
    where: { id }
  })
}

export const getCoupons = async (filters?: {
  isActive?: boolean
  limit?: number
  offset?: number
}) => {
  const where = filters ? {
    ...(filters.isActive !== undefined && { isActive: filters.isActive })
  } : {}

  return await prisma.coupon.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: filters?.limit || 50,
    skip: filters?.offset || 0
  })
}

export const updateCoupon = async (id: string, data: {
  name?: string
  description?: string
  discountValue?: number
  minOrderAmount?: number
  maxDiscountAmount?: number
  validFrom?: Date
  validUntil?: Date
  usageLimit?: number
  isActive?: boolean
}) => {
  return await prisma.coupon.update({
    where: { id },
    data
  })
}

export const deleteCoupon = async (id: string) => {
  return await prisma.coupon.delete({
    where: { id }
  })
}

// User Coupon operations
export const createUserCoupon = async (data: {
  userId: string
  couponId: string
  usedAt?: Date
}) => {
  return await prisma.userCoupon.create({
    data,
    include: {
      user: true,
      coupon: true
    }
  })
}

export const getUserCoupons = async (userId: string, filters?: {
  used?: boolean
  limit?: number
  offset?: number
}) => {
  const where = {
    userId,
    ...(filters?.used !== undefined && { 
      usedAt: filters.used ? { not: null } : null 
    })
  }

  return await prisma.userCoupon.findMany({
    where,
    include: {
      coupon: true
    },
    orderBy: { createdAt: 'desc' },
    take: filters?.limit || 50,
    skip: filters?.offset || 0
  })
}