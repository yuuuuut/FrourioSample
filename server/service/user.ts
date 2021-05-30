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
 * followers
 */
export const followers = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { followed: {} }
  })
  if (!user)
    throw Object.assign(new Error('ユーザーが存在しません。'), { status: 404 })

  return user.followed
}

export const indexRelationship = async (currentUserUid: string) => {
  const user = await prisma.user.findUnique({
    where: { id: currentUserUid },
    include: { following: true }
  })

  if (!user)
    throw Object.assign(new Error('ユーザーが存在しません。'), { status: 404 })

  return user.following
}

export const isRelationship = async (
  userId: string,
  currentUserUid: string
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      followed: {
        where: { id: currentUserUid }
      }
    }
  })

  if (!user)
    throw Object.assign(new Error('ユーザーが存在しません。'), { status: 404 })

  const bool = user.followed.length === 0 ? false : true

  return bool
}

/**
 * follow
 */
export const createRelationship = async (
  userId: string,
  otherUserId: string
) => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      followed: {
        connect: { id: otherUserId }
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
