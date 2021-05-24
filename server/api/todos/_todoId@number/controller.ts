import { showTodo, updateTodo } from '$/service/todo'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ params, currentUserUid }) => {
    try {
      const todo = await showTodo(params.todoId)

      if (todo.userId !== currentUserUid) {
        throw Object.assign(new Error('権限のないユーザーです。'), {
          status: 403
        })
      }

      return { status: 200, body: { todo } }
    } catch (error) {
      return { status: error.status || 500, body: { error: error.message } }
    }
  },
  patch: async ({ params, body }) => {
    try {
      const todo = await updateTodo(params.todoId, body)

      return { status: 201, body: { todo } }
    } catch (error) {
      return { status: 500, body: { error } }
    }
  }
}))
