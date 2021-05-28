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
export const showUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
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

/**
 * follow
 */
export const followUser = async (userId: string, currentUserUid: string) => {
  //const a = await isFolloing(userId, currentUserUid)

  await prisma.user.update({
    where: { id: userId },
    data: {
      followed: {
        connect: { id: currentUserUid }
      }
    }
  })
}

/**
 * unfollow
 */
export const unfollowUser = async (userId: string, currentUserUid: string) => {
  await prisma.user.update({
    where: { id: currentUserUid },
    data: {
      following: {
        disconnect: { id: userId }
      }
    }
  })
}

const isFolloing = async (userId: string, currentUserUid: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { followed: true }
  })
  if (!user) return

  const bool = user.followed.some((u) => u.id === currentUserUid)

  return bool
}
