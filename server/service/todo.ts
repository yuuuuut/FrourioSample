import { TodoCreateBody } from '$/types'
import prisma from '$/prisma/prisma'

/**
 * create
 */
export const createTodo = async (body: TodoCreateBody) => {
  const { title, userId } = body

  const todo = await prisma.todo.create({
    data: {
      title,
      userId
    }
  })

  return todo
}

/**
 * update
 */
export const updateTodo = async (id: number) => {
  try {
    const todo = await prisma.todo.update({
      where: { id },
      data: {
        done: true
      }
    })

    return todo
  } catch (e) {
    if (e.code === 'P2025') {
      throw Object.assign(new Error('Todoが存在しません。'), { status: 404 })
    } else {
      throw Object.assign(new Error(e), { status: 500 })
    }
  }
}
