import prisma from '$/prisma/prisma'

/**
 * index
 */
export const indexRelationship = async (currentUserUid: string) => {
  const user = await prisma.user.findUnique({
    where: { id: currentUserUid },
    include: { following: true }
  })

  if (!user)
    throw Object.assign(new Error('ユーザーが存在しません。'), { status: 404 })

  return user.following
}

/**
 * create
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
 * Relation関係が存在するかをBooleanで返します。
 */
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
