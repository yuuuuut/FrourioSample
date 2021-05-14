import { createUser } from '$/service/user'
import { UserCreateBody } from '$/types'
import { PrismaClient } from '.prisma/client'

// Prisma Setting
const prisma = new PrismaClient()

afterAll(async (done) => {
  await prisma.$disconnect()
  done()
})

describe('createUser() - unit', () => {
  it('ユーザーの作成ができること', async () => {
    const body: UserCreateBody = {
      id: 'Test',
      displayName: 'TestUser',
      photoUrl: 'TestPhoto'
    }

    const user = await createUser(body)
    const savedBeforeUser = await prisma.user.findUnique({
      where: { id: body.id }
    })

    expect(user.id).toEqual(body.id)
    expect(user.displayName).toEqual(body.displayName)
    expect(user.photoUrl).toEqual(body.photoUrl)

    expect(savedBeforeUser?.id).toEqual(body.id)
    expect(savedBeforeUser?.displayName).toEqual(body.displayName)
    expect(savedBeforeUser?.photoUrl).toEqual(body.photoUrl)
  })
  it('ユーザーが存在し、displayNameとphotoUrlが更新されてる場合、更新できること', async () => {
    const beforebody: UserCreateBody = {
      id: 'Test',
      displayName: 'TestUser',
      photoUrl: 'TestPhoto'
    }

    const afterbody: UserCreateBody = {
      id: 'Test',
      displayName: 'AfterTestUser',
      photoUrl: 'AfterTestPhoto'
    }

    await createUser(beforebody)
    const savedBeforeUser = await prisma.user.findUnique({
      where: { id: beforebody.id }
    })

    expect(savedBeforeUser?.id).toEqual(beforebody.id)
    expect(savedBeforeUser?.displayName).toEqual(beforebody.displayName)
    expect(savedBeforeUser?.photoUrl).toEqual(beforebody.photoUrl)

    await createUser(afterbody)
    const savedAfterUser = await prisma.user.findUnique({
      where: { id: afterbody.id }
    })

    expect(savedAfterUser?.id).toEqual(afterbody.id)
    expect(savedAfterUser?.displayName).toEqual(afterbody.displayName)
    expect(savedAfterUser?.photoUrl).toEqual(afterbody.photoUrl)
  })
})
