import { followers, followUser, unfollowUser } from '$/service/user'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ params }) => {
    try {
      const userId = params.userId

      const users = await followers(userId)

      return { status: 201, body: { users } }
    } catch (error) {
      return { status: 500, body: { error } }
    }
  },
  post: async ({ params, currentUserUid }) => {
    try {
      const userId = params.userId

      await followUser(userId, currentUserUid)

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
