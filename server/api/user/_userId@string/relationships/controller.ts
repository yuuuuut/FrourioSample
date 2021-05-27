import { followUser } from '$/service/user'
import { defineController } from './$relay'

export default defineController(() => ({
  post: async ({ params, currentUserUid }) => {
    try {
      await followUser(params.userId, currentUserUid)

      return { status: 201, body: { message: 'フォロー申請を送りました。' } }
    } catch (error) {
      console.log(error.message)
      return { status: 500, body: { error } }
    }
  }
}))
