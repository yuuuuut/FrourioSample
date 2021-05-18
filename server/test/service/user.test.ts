import prisma from '$/prisma/prisma'

import * as userService from '$/service/user'

import { UserCreateBody } from '$/types'
import * as common from '$/test/common'

afterEach(async () => {
  await common.resetDatabase()
})

afterAll(async (done) => {
  await common.resetDatabase()
  await prisma.$disconnect()
  done()
})

describe('indexUser() - unit', () => {
  beforeEach(async () => {
    await common.seedingDatabase()
  })
  it('takeが5 skipが0の場合、5人のユーザーを返すこと。', async () => {
    const users = await userService.indexUser(5, 0)

    expect(users.length).toBe(5)
  })
  it('takeが5 skipが5の場合、4人のユーザーを返すこと。', async () => {
    const users = await userService.indexUser(5, 5)

    expect(users.length).toBe(4)
  })
})

describe('showUser() - unit', () => {
  it('ユーザーが存在する場合、取得できること。', async () => {
    await common.seedingDatabase()
    const userId = 'Test1'
    const user = await userService.showUser(userId)

    expect(user.id).toEqual(userId)
  })
  it('ユーザーが存在しない場合、エラーが発生すること。', async () => {
    await expect(userService.showUser('None')).rejects.toEqual(
      new Error('ユーザーが存在しません。')
    )
  })
})

/*
Mock Version
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

    const user = await userService.createUser(body)
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

    await userService.createUser(beforebody)
    const savedBeforeUser = await prisma.user.findUnique({
      where: { id: beforebody.id }
    })

    expect(savedBeforeUser?.id).toEqual(beforebody.id)
    expect(savedBeforeUser?.displayName).toEqual(beforebody.displayName)
    expect(savedBeforeUser?.photoUrl).toEqual(beforebody.photoUrl)

    await userService.createUser(afterbody)
    const savedAfterUser = await prisma.user.findUnique({
      where: { id: afterbody.id }
    })

    expect(savedAfterUser?.id).toEqual(afterbody.id)
    expect(savedAfterUser?.displayName).toEqual(afterbody.displayName)
    expect(savedAfterUser?.photoUrl).toEqual(afterbody.photoUrl)
  })
})
