import {
  followers,
  createRelationship,
  unfollowUser,
  indexRelationship
} from '$/service/user'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ currentUserUid }) => {
    try {
      const users = await indexRelationship(currentUserUid)

      return { status: 200, body: { users } }
    } catch (error) {
      return { status: 500, body: { error } }
    }
  },
  post: async ({ params, currentUserUid }) => {
    try {
      const userId = params.userId

      await createRelationship(userId, currentUserUid)

      return { status: 201, body: { message: 'フォロー申請を送りました。' } }
    } catch (error) {
      return { status: 500, body: { error } }
    }
  },
  delete: async ({ params, currentUserUid }) => {
    try {
      const userId = params.userId

      await unfollowUser(userId, currentUserUid)

      return {
        status: 201,
        body: { message: 'フォロー申請を取り下げました。' }
      }
    } catch (error) {
      return { status: 500, body: { error } }
    }
  }
}))
