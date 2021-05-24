import prisma from '$/prisma/prisma'

import { UserCreateBody } from '$/types'

/**
 * index
 */
export const indexUser = async (take: number, skip: number) => {
  const users = await prisma.user.findMany({
    take,
    skip
  })

  return users
}

/**
 * show
 */
export const showUser = async (userId: string, take: number, skip: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      todos: {
        take,
        skip
      }
    }
  })
  if (!user)
    throw Object.assign(new Error('ユーザーが存在しません。'), { status: 404 })

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
