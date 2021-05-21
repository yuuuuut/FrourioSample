import { createTodo, indexTodo } from '$/service/todo'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ query }) => {
    try {
      const take = 5
      const page = query?.page || 1
      const skip = query?.page === 1 ? 0 : take * (page - 1)

      const todos = await indexTodo(take, skip)

      return { status: 200, body: todos }
    } catch (error) {
      return { status: 500, body: { error } }
    }
  },
  post: async ({ body }) => {
    try {
      const todo = await createTodo(body)

      return { status: 201, body: { todo } }
    } catch (error) {
      return { status: 500, body: { error } }
    }
  }
}))
