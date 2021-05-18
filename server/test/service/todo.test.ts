import prisma from '$/prisma/prisma'

import { TodoCreateBody } from '$/types'

import * as todoService from '$/service/todo'
import * as common from '$/test/common'

beforeEach(async () => {
  await common.resetDatabase()
})

afterAll(async (done) => {
  await common.resetDatabase()
  await prisma.$disconnect()
  done()
})

describe('createTodo() - unit', () => {
  it('todoの作成ができること。', async () => {
    const user = await common.createTestUser('TestUser')

    const data: TodoCreateBody = {
      title: 'TestTodo',
      userId: user.id
    }

    const todo = await todoService.createTodo(data)

    expect(todo.title).toBe(data.title)
    expect(todo.done).toBe(false)
    expect(todo.userId).toBe(user.id)
  })
})

describe('updateTodo() - unit', () => {
  it('todoの更新ができること。', async () => {
    const user = await common.createTestUser('TestUser')
    const todo = await common.createTestTodo(user)

    expect(todo.done).toBe(false)

    const spy = jest
      .spyOn(todoService, 'createOgp')
      .mockImplementation(() => Promise.resolve())

    const afterTodo = await todoService.updateTodo(todo.id)

    expect(afterTodo.id).toBe(todo.id)
    expect(afterTodo.done).toBe(true)
    expect(afterTodo.userId).toBe(todo.userId)
    expect(spy.mock.calls.length).toBe(1)

    spy.mockReset()
  })
  it('todoが存在しない場合、正しいエラーが発生すること。', async () => {
    await expect(todoService.updateTodo(0)).rejects.toEqual(
      new Error('Todoが存在しません。')
    )
  })
})
