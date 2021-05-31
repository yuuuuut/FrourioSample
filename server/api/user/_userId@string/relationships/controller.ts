import { defineController } from './$relay'

import { indexRelationship } from '$/service/relationship'

export default defineController(() => ({
  get: async ({ currentUserUid }) => {
    try {
      const users = await indexRelationship(currentUserUid)

      return { status: 200, body: { users } }
    } catch (error) {
      return { status: 500, body: { error } }
    }
  }
}))
