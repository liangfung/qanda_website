import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const GET = async (request: NextRequest, context: any) => {
  const userInfo = await prisma.user.findUnique({
    where: { id: 1 },
  })
  return NextResponse.json(userInfo)
}
