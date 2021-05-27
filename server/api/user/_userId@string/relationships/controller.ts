import { followUser, unfollowUser } from '$/service/user'
import { defineController } from './$relay'

export default defineController(() => ({
  post: async ({ params, currentUserUid }) => {
    try {
      await followUser(params.userId, currentUserUid)

      return { status: 201, body: { message: 'フォロー申請を送りました。' } }
    } catch (error) {
      return { status: 500, body: { error } }
    }
  },
  delete: async ({ params, currentUserUid }) => {
    try {
      await unfollowUser(params.userId, currentUserUid)

      return {
        status: 201,
        body: { message: 'フォロー申請を取り下げました。' }
      }
    } catch (error) {
      return { status: 500, body: { error } }
    }
  }
}))
