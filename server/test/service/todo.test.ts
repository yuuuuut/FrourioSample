import moment from 'moment'

import * as todoService from '$/service/todo'
import { prismaMock } from '$/test/common'

import { PrismaClient, Todo } from '@prisma/client'
import { TodoCreateBody } from '$/types'

describe('createTodo() - unit', () => {
  it('todoの作成ができること。', async () => {
    const todo: Todo = {
      id: 1,
      title: 'TestTitle',
      done: false,
      due_date: new Date(),
      userId: 'TestUser',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const mockFn = prismaMock.todo.create.mockResolvedValue(todo)

    await expect(
      todoService.createTodo({
        title: todo.title,
        due_date: todo.due_date,
        userId: todo.userId
      })
    ).resolves.toEqual(todo)
    expect(mockFn).toHaveBeenCalledWith({
      data: {
        due_date: todo.due_date,
        title: todo.title,
        userId: todo.userId
      }
    })
  })
})

describe('updateTodo() - unit', () => {
  it('todoの更新ができること。', async () => {
    const todo: Todo = {
      id: 1,
      title: 'Test',
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      due_date: new Date(),
      userId: 'TestUser'
    }

    const mockFn = prismaMock.todo.update.mockResolvedValue(todo)

    const spy = jest
      .spyOn(todoService, 'createOgp')
      .mockImplementation(() => Promise.resolve())

    await expect(todoService.updateTodo(todo.id)).resolves.toEqual(todo)
    expect(mockFn).toHaveBeenCalledWith({
      data: { done: true },
      where: { id: 1 }
    })
  })
})

/*
describe('createTodo() - unit', () => {
  it('todoの作成ができること。', async (done) => {
    const user = await prisma.user.create({
      data: {
        id: 'Test',
        displayName: 'TestName',
        photoUrl: 'TestPhoto'
      }
    })

    const data: TodoCreateBody = {
      title: 'TestTitle',
      due_date: new Date(),
      userId: user.id
    }

    const todo = await todoService.createTodo(data)

    const savedTodo = await prisma.todo.findUnique({
      where: { id: todo.id }
    })

    expect(savedTodo?.id).toBe(todo.id)

    await common.resetDatabase()
    /*
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
    await common.resetDatabase()
  })
  it('todoが存在しない場合、正しいエラーが発生すること。', async () => {
    await expect(todoService.updateTodo(0)).rejects.toEqual(
      new Error('Todoが存在しません。')
    )
  })
})
*/

describe('checkOverDueDate() - unit', () => {
  it('期限切れでない場合、falseを返すこと。', async () => {
    const date = '2021-01-10'
    const today = moment(date).toDate()
    const tommorow = moment(date).add(1, 'day').toDate()

    Date.now = () => new Date(today).getTime()

    const val = await todoService.__local__.checkOverDueDate(tommorow)

    expect(val).toBe(false)
  })
  it('期限切れの場合、trueを返すこと。', async () => {
    const date = '2021-01-10'
    const today = moment(date).toDate()
    const yesterday = moment(date).add(-1, 'day').toDate()

    Date.now = () => new Date(today).getTime()

    const val = await todoService.__local__.checkOverDueDate(yesterday)

    expect(val).toBe(true)
  })
  it('同じ日の場合、trueを返すこと。', async () => {
    const date = '2021-01-10'
    const today = moment(date).toDate()

    Date.now = () => new Date(today).getTime()

    const val = await todoService.__local__.checkOverDueDate(today)

    expect(val).toBe(true)
  })
})
