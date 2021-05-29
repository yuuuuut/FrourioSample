import prisma from '$/prisma/prisma'

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
  await prisma.request.updateMany({
    where: {
      visitedId: currentUserUid,
      visiterId: userId
    },
    data: {
      isPermit: true
    }
  })
}
