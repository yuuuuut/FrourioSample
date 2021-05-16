import { indexUser, createUser } from '$/service/user'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ query }) => {
    try {
      const take = 5
      const page = query?.page || 1
      const skip = query?.page === 1 ? 0 : take * (page - 1)

      const users = await indexUser(take, skip)

      return { status: 200, body: { users } }
    } catch (error) {
      return { status: 500, body: { error } }
    }
  },
  post: async ({ body }) => {
    try {
      const user = await createUser(body)

      return { status: 201, body: { user } }
    } catch (error) {
      return { status: 500, body: { error } }
    }
  }
}))
