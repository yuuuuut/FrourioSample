import prisma from '$/prisma/prisma'
import { createRelationship } from './user'

/**
 * index
 */
export const indexRequest = async (userId: string) => {
  const requests = await prisma.request.findMany({
    where: { visitedId: userId, isPermit: false },
    include: { visiterUser: true }
  })

  return requests
}

/**
 * show
 */
export const isRequest = async (userId: string, currentUserUid: string) => {
  const request = await prisma.request.findFirst({
    where: {
      visiterId: currentUserUid,
      visitedId: userId
    }
  })

  const bool = Boolean(request)

  return bool
}

/**
 * create
 */
export const createRequest = async (userId: string, currentUserUid: string) => {
  await prisma.request.create({
    data: {
      visiterId: currentUserUid,
      visitedId: userId
    }
  })
}

/**
 * update
 */
export const updateRequest = async (userId: string, currentUserUid: string) => {
  await prisma.$transaction([
    prisma.request.updateMany({
      where: {
        visitedId: currentUserUid,
        visiterId: userId
      },
      data: {
        isPermit: true
      }
    }),
    prisma.user.update({
      where: { id: userId },
      data: {
        followed: {
          connect: { id: currentUserUid }
        }
      }
    }),
    prisma.user.update({
      where: { id: currentUserUid },
      data: {
        followed: {
          connect: { id: userId }
        }
      }
    })
  ])
}
