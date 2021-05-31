import moment from 'moment'

import * as todoService from '$/service/todo'

import { TodoShow, TodoUpdateBody } from '$/types'
import { prismaMock } from '$/test/common'
import { Todo } from '@prisma/client'

describe('indexTodo() - unit', () => {
  it('todoの一覧が取得できること。', async () => {
    const todos: Todo[] = [
      {
        id: 1,
        title: 'TestTitle',
        due_date: new Date(),
        done: false,
        userId: 'TestUser',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'TestTitle',
        due_date: new Date(),
        done: false,
        userId: 'TestUser',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: 'TestTitle',
        due_date: new Date(),
        done: false,
        userId: 'TestUser',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    const mockFn = prismaMock.todo.findMany.mockResolvedValue(todos)

    const skip = 0
    const take = 5

    await expect(todoService.indexTodo('A', take, skip)).resolves.toEqual(todos)
    expect(mockFn).toHaveBeenCalledWith({ skip, take, where: { userId: 'A' } })
    expect(mockFn.mock.calls[0][0]?.skip).toBe(skip)
    expect(mockFn.mock.calls[0][0]?.take).toBe(take)
  })
})

describe('showTodo() - unit', () => {
  it('Todoが存在する場合、取得ができること。', async () => {
    const todo: TodoShow = {
      id: 1,
      title: 'TestTitle',
      due_date: new Date(),
      done: false,
      userId: 'TestUser',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    prismaMock.todo.findUnique.mockResolvedValue(todo)

    await expect(todoService.showTodo(todo.id)).resolves.toEqual({
      ...todo
    })
  })
  it('Todoが存在しない場合、エラーが発生すること。', async () => {
    await expect(todoService.showTodo(0)).rejects.toMatchObject({
      message: 'Todoが存在しません。'
    })
  })
})

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
  it('todoをfalseに更新した場合、checkOverDueDate と createOgp が呼ばれないこと。', async () => {
    const todo: Todo = {
      id: 1,
      title: 'Test',
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      due_date: new Date(),
      userId: 'TestUser'
    }

    const body: TodoUpdateBody = {
      done: false
    }

    // Prisma Mock
    const mockFn = prismaMock.todo.update.mockResolvedValue(todo)

    await expect(todoService.updateTodo(todo.id, body)).resolves.toEqual(todo)
    expect(mockFn).toHaveBeenCalledWith({
      data: { done: false },
      where: { id: 1 }
    })
  })
  it('todoをtrueに更新した場合、checkOverDueDate と createOgp が呼ばれること。', async () => {
    const todo: Todo = {
      id: 1,
      title: 'Test',
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      due_date: new Date(),
      userId: 'TestUser'
    }

    const body: TodoUpdateBody = {
      done: true
    }

    // Prisma Mock
    const mockFn = prismaMock.todo.update.mockResolvedValue(todo)

    // checkOverDueDate Mock
    const checkOverDueDateMock = jest
      .spyOn(todoService, 'checkOverDueDate')
      .mockImplementation(() => Promise.resolve(true))

    // createOgp Mock
    const createOgpMock = jest
      .spyOn(todoService, 'createOgp')
      .mockImplementation(() => Promise.resolve())

    await expect(todoService.updateTodo(todo.id, body)).resolves.toEqual(todo)
    expect(mockFn).toHaveBeenCalledWith({
      data: { done: true },
      where: { id: 1 }
    })

    expect(checkOverDueDateMock).toHaveBeenCalledTimes(1)
    expect(createOgpMock).toHaveBeenCalled()
  })
})

describe('checkOverDueDate() - unit', () => {
  it('期限切れでない場合、falseを返すこと。', async () => {
    const date = '2021-01-10'
    const today = moment(date).toDate()
    const tommorow = moment(date).add(1, 'day').toDate()

    Date.now = () => new Date(today).getTime()

    const val = await todoService.checkOverDueDate(tommorow)

    expect(val).toBe(false)
  })
  it('期限切れの場合、trueを返すこと。', async () => {
    const date = '2021-01-10'
    const today = moment(date).toDate()
    const yesterday = moment(date).add(-1, 'day').toDate()

    Date.now = () => new Date(today).getTime()

    const val = await todoService.checkOverDueDate(yesterday)

    expect(val).toBe(true)
  })
  it('同じ日の場合、trueを返すこと。', async () => {
    const date = '2021-01-10'
    const today = moment(date).toDate()

    Date.now = () => new Date(today).getTime()

    const val = await todoService.checkOverDueDate(today)

    expect(val).toBe(true)
  })
})
