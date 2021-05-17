import prisma from '$/prisma/prisma'

import { createTodo } from '$/service/todo'
import { createTestUser, resetDatabase } from '../common'
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
