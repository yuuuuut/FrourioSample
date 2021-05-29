import { AuthHeader } from '$/types'
import { User } from '.prisma/client'

export type Methods = {
  get: {
    query?: {
      type: 'follwings' | 'followers'
    }
    reqHeaders: AuthHeader
    resBody: { users: User[] }
  }
  post: {
    reqHeaders: AuthHeader
    resBody: { message: string }
  }
  delete: {
    reqHeaders: AuthHeader
    resBody: { message: string }
  }
}
