import { defineController } from './$relay'

import { updateRequest, createRequest, indexRequest } from '$/service/request'

export default defineController(() => ({
  get: async ({ currentUserUid }) => {
    try {
      const requests = await indexRequest(currentUserUid)

      return { status: 200, body: { requests } }
    } catch (error) {
      return { status: 500, body: { error } }
    }
  },
  post: async ({ params, currentUserUid }) => {
    try {
      const userId = params.userId

      await createRequest(userId, currentUserUid)

      return { status: 201, body: { message: '友達申請を送りました。' } }
    } catch (error) {
      return { status: 500, body: { error } }
    }
  },
  patch: async ({ params, currentUserUid }) => {
    try {
      const userId = params.userId

      await updateRequest(userId, currentUserUid)

      return { status: 201, body: { message: '友達申請を許可しました。' } }
    } catch (error) {
      return { status: 500, body: { error } }
    }
  }
}))
