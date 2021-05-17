import { createTodo } from '$/service/todo'
import { defineController } from './$relay'

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: async ({ body }) => {
    try {
      const todo = await createTodo(body)

      return { status: 201, body: { todo } }
    } catch (error) {
      return { status: 500, body: { error } }
    }
  }
}))
