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
