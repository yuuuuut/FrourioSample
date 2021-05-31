import * as requestService from '$/service/request'

import { Request } from '.prisma/client'
import { prismaMock } from '../common'

describe('indexRequest() - unit', () => {
  it('userのrequestの一覧が取得できること。', async () => {
    const userId = 'Test1'

    const mockData = [
      {
        id: expect.anything(),
        visiterId: 'VisiterUser',
        visitedId: userId,
        isPermit: false
      },
      {
        id: expect.anything(),
        visiterId: 'VisiterUser',
        visitedId: userId,
        isPermit: false
      },
      {
        id: expect.anything(),
        visiterId: 'VisiterUser',
        visitedId: userId,
        isPermit: false
      }
    ]

    const mockFn = prismaMock.request.findMany.mockResolvedValue(mockData)

    await expect(requestService.indexRequest(userId)).resolves.toEqual(mockData)
    expect(mockFn).toHaveBeenCalledWith({
      where: { visitedId: userId, isPermit: false },
      include: { visiterUser: true }
    })
    expect(mockFn.mock.calls[0][0]?.where?.visitedId).toBe(userId)
  })
})

describe('requestTodo() - unit', () => {
  it('requestの作成ができること。', async () => {
    const user1 = 'Test1'
    const user2 = 'Test2'

    const request: Request = {
      id: 1,
      visitedId: user1,
      visiterId: user2,
      isPermit: false
    }

    const mockFn = prismaMock.request.create.mockResolvedValue(request)

    await requestService.createRequest(user1, user2)
    expect(mockFn).toHaveBeenCalledWith({
      data: {
        visiterId: user2,
        visitedId: user1
      }
    })
  })
})

describe('isRequest() - unit', () => {
  it('requestが存在する場合、trueを返すこと。', async () => {
    const user1 = 'Test1'
    const user2 = 'Test2'

    const request: Request = {
      id: 1,
      visitedId: user1,
      visiterId: user2,
      isPermit: false
    }

    const mockFn = prismaMock.request.findFirst.mockResolvedValue(request)

    await expect(requestService.isRequest(user1, user2)).resolves.toEqual(true)
    expect(mockFn).toHaveBeenCalledWith({
      where: {
        visiterId: user2,
        visitedId: user1
      }
    })
  })
  it('requestが存在しない場合、falseを返すこと。', async () => {
    const user1 = 'Test1'
    const user2 = 'Test2'

    const mockFn = prismaMock.request.findFirst.mockResolvedValue(null)

    await expect(requestService.isRequest(user1, user2)).resolves.toEqual(false)
    expect(mockFn).toHaveBeenCalledWith({
      where: {
        visiterId: user2,
        visitedId: user1
      }
    })
  })
})
