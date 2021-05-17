import prisma from '$/prisma/prisma'

import { createTodo, updateTodo } from '$/service/todo'
import { createTestTodo, createTestUser, resetDatabase } from '../common'
import { TodoCreateBody } from '$/types'

beforeEach(async () => {
  await resetDatabase()
})

afterAll(async (done) => {
  await resetDatabase()
  await prisma.$disconnect()
  done()
})

describe('createTodo() - unit', () => {
  it('todoの作成ができること。', async () => {
    const user = await createTestUser('TestUser')

    const data: TodoCreateBody = {
      title: 'TestTodo',
      userId: user.id
    }

    const todo = await createTodo(data)

    expect(todo.title).toBe(data.title)
    expect(todo.done).toBe(false)
    expect(todo.userId).toBe(user.id)
  })
})

describe('updateTodo() - unit', () => {
  it('todoの更新ができること。', async () => {
    const user = await createTestUser('TestUser')
    const todo = await createTestTodo(user)

    const afterTodo = await updateTodo(todo.id)

    expect(afterTodo.id).toBe(todo.id)
    expect(afterTodo.done).toBe(true)
    expect(afterTodo.userId).toBe(todo.userId)
  })
  it('todoが存在しない場合、正しいエラーが発生すること。', async () => {
    await expect(updateTodo(0)).rejects.toEqual(
      new Error('Todoが存在しません。')
    )
  })
})
