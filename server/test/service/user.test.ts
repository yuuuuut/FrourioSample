import prisma from '$/prisma/prisma'
import { createUser, indexUser, showUser } from '$/service/user'
import { UserCreateBody, UserShow } from '$/types'
import { resetDatabase, seedingDatabase } from '../common'

beforeEach(async () => {
  await resetDatabase()
})

afterAll(async (done) => {
  await resetDatabase()
  await prisma.$disconnect()
  done()
})

describe('indexUser() - unit', () => {
  it('takeが5 skipが0の場合、5人のユーザーを返すこと。', async () => {
    // 9人のユーザーを作成
    await seedingDatabase()
    const users = await indexUser(5, 0)

    expect(users.length).toBe(5)
  })
  it('takeが5 skipが5の場合、4人のユーザーを返すこと。', async () => {
    // 9人のユーザーを作成
    await seedingDatabase()
    const users = await indexUser(5, 5)

    expect(users.length).toBe(4)
  })
})

/*
describe('showUser() - unit', () => {
  it('ユーザーが存在する場合、取得ができること。', async () => {
    const user: UserShow = {
      id: 'T',
      displayName: 'TestUser',
      photoUrl: 'TestPhoto',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    prismaMock.user.findUnique.mockResolvedValue(user)

    //prismaMock.user.findUnique.mockImplementation((async () => user) as any)

    await expect(showUser(user.id)).resolves.toEqual({
      ...user
    })
  })
  it('ユーザーが存在しない場合、エラーが発生すること。', async () => {
    prismaMock.user.findUnique.mockRejectedValue(
      new Error('ユーザーが存在しません。')
    )

    await expect(showUser('None')).rejects.toThrow('ユーザーが存在しません。')
  })
})
*/

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
