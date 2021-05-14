import { UserCreateBody } from '$/types'
import { User } from '.prisma/client'

export type Methods = {
  get: {
    resBody: string
  }
  post: {
    reqBody: UserCreateBody
    resBody: { user: User }
  }
}
