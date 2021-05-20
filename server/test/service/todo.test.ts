import moment from 'moment'

import * as todoService from '$/service/todo'

import { prismaMock } from '$/test/common'
import { Todo } from '@prisma/client'
import { TodoUpdateBody } from '$/types'

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

    const body: TodoUpdateBody = {
      done: false
    }

    const mockFn = prismaMock.todo.update.mockResolvedValue(todo)

    jest
      .spyOn(todoService, 'createOgp')
      .mockImplementation(() => Promise.resolve())

    await expect(todoService.updateTodo(todo.id, body)).resolves.toEqual(todo)
    expect(mockFn).toHaveBeenCalledWith({
      data: { done: false },
      where: { id: 1 }
    })
  })
})

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
