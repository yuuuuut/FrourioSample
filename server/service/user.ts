import { UserCreateBody } from '$/types'

import { PrismaClient } from '@prisma/client'

// prisma setting
const prisma = new PrismaClient()

/**
 * show
 */
export const showUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })
  if (!user) throw Object.assign(new Error(), { status: 404 })

  return user
}

/**
 * create
 */
export const createUser = async (body: UserCreateBody) => {
  const { id, displayName, photoUrl } = body

  const user = await prisma.user.upsert({
    where: { id },
    update: { displayName, photoUrl },
    create: { id, displayName, photoUrl }
  })

  return user
}
