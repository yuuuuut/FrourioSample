import { updateTodo } from '$/service/todo'
import { defineController } from './$relay'

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  patch: async ({ params }) => {
    try {
      const todo = await updateTodo(params.todoId)

      return { status: 201, body: { todo } }
    } catch (error) {
      return { status: 500, body: { error } }
    }
  }
}))
