import { defineController } from './$relay'
import { showUser } from '$/service/user'

export default defineController(() => ({
  get: async ({ params, query, currentUserUid }) => {
    try {
      if (params.userId !== currentUserUid) {
        throw Object.assign(new Error('権限のないユーザーです。'), {
          status: 403
        })
      }

      const take = 5
      const page = query?.page || 1
      const skip = query?.page === 1 ? 0 : take * (page - 1)

      const user = await showUser(params.userId, take, skip)
      return { status: 200, body: { user } }
    } catch (error) {
      return { status: error.status || 500, body: { error: error.message } }
    }
  }
}))
