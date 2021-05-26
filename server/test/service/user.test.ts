import * as userService from '$/service/user'

import { prismaMock } from '../common'
import { UserShow } from '$/types'

describe('indexUser() - unit', () => {
  it('ユーザーが存在する場合、取得ができること。', async () => {
    const users: UserShow[] = [
      {
        id: 'Test1',
        displayName: 'TestUser',
        photoUrl: 'TestPhoto',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'Test2',
        displayName: 'TestUser',
        photoUrl: 'TestPhoto',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'Test3',
        displayName: 'TestUser',
        photoUrl: 'TestPhoto',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'Test4',
        displayName: 'TestUser',
        photoUrl: 'TestPhoto',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'Test5',
        displayName: 'TestUser',
        photoUrl: 'TestPhoto',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    const mockFn = prismaMock.user.findMany.mockResolvedValue(users)

    const skip = 0
    const take = 5

    await expect(userService.indexUser(take, skip)).resolves.toEqual(users)
    expect(mockFn).toHaveBeenCalledWith({ skip, take })
    expect(mockFn.mock.calls[0][0]?.skip).toBe(skip)
    expect(mockFn.mock.calls[0][0]?.take).toBe(take)
  })
})

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

    await expect(userService.showUser(user.id)).resolves.toEqual({
      ...user
    })
  })
  it('ユーザーが存在しない場合、エラーが発生すること。', async () => {
    await expect(userService.showUser('None')).rejects.toMatchObject({
      message: 'ユーザーが存在しません。'
    })
  })
})

describe('createUser() - unit', () => {
  it('ユーザーの作成ができること。', async () => {
    const user: UserShow = {
      id: 'Test',
      displayName: 'TestUser',
      photoUrl: 'TestPhoto',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const mockFn = prismaMock.user.upsert.mockResolvedValue(user)

    await expect(
      userService.createUser({
        id: user.id,
        displayName: user.displayName,
        photoUrl: user.photoUrl
      })
    ).resolves.toEqual(user)
    expect(mockFn).toHaveBeenCalledWith({
      create: { displayName: 'TestUser', id: 'Test', photoUrl: 'TestPhoto' },
      update: { displayName: 'TestUser', photoUrl: 'TestPhoto' },
      where: { id: 'Test' }
    })
  })
})
