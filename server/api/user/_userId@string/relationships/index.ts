import { AuthHeader } from '$/types'
import { User } from '.prisma/client'

export type Methods = {
  get: {
    reqHeaders: AuthHeader
    resBody: { users: User[] }
  }
}
