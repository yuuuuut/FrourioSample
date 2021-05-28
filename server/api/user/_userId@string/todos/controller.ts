import { indexTodo } from '$/service/todo'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ query, params, currentUserUid }) => {
    try {
      const userId = params.userId

      if (userId !== currentUserUid) {
        throw Object.assign(new Error('権限のないユーザーです。'), {
          status: 403
        })
      }

      const take = 5
      const page = query?.page || 1
      const skip = query?.page === 1 ? 0 : take * (page - 1)

      const todos = await indexTodo(userId, take, skip)

      return { status: 200, body: { todos } }
    } catch (error) {
      return { status: 500, body: { error } }
    }
  }
}))
