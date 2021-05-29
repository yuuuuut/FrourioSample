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
export const showUser = async (userId: string, currentUserUid: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })
  if (!user)
    throw Object.assign(new Error('ユーザーが存在しません。'), { status: 404 })

  const isFollow = await isFolloing(user.id, currentUserUid)

  return { user, isFollow }
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
 * followers
 */
export const followers = async (userId: string) => {
  const followers = await prisma.user.findMany({
    where: { id: userId },
    include: { followed: true }
  })

  return followers
}

/**
 * follow
 */
export const followUser = async (userId: string, currentUserUid: string) => {
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
  if (!user)
    throw Object.assign(new Error('ユーザーが存在しません。'), { status: 404 })

  const bool = user.followed.some((u) => u.id === currentUserUid)

  return bool
}
