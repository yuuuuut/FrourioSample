import { defineController } from './$relay'
import { showUser } from '$/service/user'

export default defineController(() => ({
  get: async ({ params, query, currentUserUid }) => {
    try {
      const type = query?.type || ''
      const userId = params.userId

      if (type !== 'search') {
        if (userId !== currentUserUid) {
          throw Object.assign(new Error('権限のないユーザーです。'), {
            status: 403
          })
        }
      }

      const user = await showUser(userId)
      return { status: 200, body: { user } }
    } catch (error) {
      return { status: error.status || 500, body: { error: error.message } }
    }
  }
}))
