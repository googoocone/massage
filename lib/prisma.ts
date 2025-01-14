import { PrismaClient } from '@prisma/client'

// 전역에서 Prisma 클라이언트를 관리
const globalForPrisma = global as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // 디버깅을 위한 쿼리 로그 추가
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
