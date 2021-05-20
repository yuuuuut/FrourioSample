import { updateTodo } from '$/service/todo'
import { defineController } from './$relay'

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  patch: async ({ params, body }) => {
    try {
      const todo = await updateTodo(params.todoId, body)

      return { status: 201, body: { todo } }
    } catch (error) {
      return { status: 500, body: { error } }
    }
  }
}))
