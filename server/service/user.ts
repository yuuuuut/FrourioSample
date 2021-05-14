import { UserCreateBody } from '$/types'

import { PrismaClient } from '@prisma/client'

// prisma setting
const prisma = new PrismaClient()

/**
 * create user
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
