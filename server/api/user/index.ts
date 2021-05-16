import { UserCreateBody } from '$/types'
import { User } from '.prisma/client'

export type Methods = {
  get: {
    query?: {
      page: number
    }
    resBody: { users: User[] }
  }
  post: {
    reqBody: UserCreateBody
    resBody: { user: User }
  }
}
