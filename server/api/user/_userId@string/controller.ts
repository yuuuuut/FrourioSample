import { defineController } from './$relay'
import { showUser } from '$/service/user'

export default defineController(() => ({
  get: async ({ params }) => {
    try {
      const user = await showUser(params.userId)
      return { status: 200, body: { user } }
    } catch (error) {
      return { status: error.status || 500 }
    }
  }
}))
