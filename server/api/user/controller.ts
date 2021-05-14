import { createUser } from '$/service/user'
import { defineController } from './$relay'

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello, world!' }),
  post: async ({ body }) => {
    try {
      const user = await createUser(body)

      return { status: 201, body: { user } }
    } catch (error) {
      return { status: 500, body: { error } }
    }
  }
}))
