import { defineController } from './$relay'
import { showUser } from '$/service/user'

export default defineController(() => ({
  get: async ({ params, currentUserUid }) => {
    try {
      if (params.userId !== currentUserUid) {
        throw Object.assign(new Error('権限のないユーザーです。'), {
          status: 403
        })
      }

      const user = await showUser(params.userId)
      return { status: 200, body: { user } }
    } catch (error) {
      return { status: error.status || 500, body: { error: error.message } }
    }
  }
}))
