import { UserShow } from '$/types'
import { User } from '.prisma/client'

export type Methods = {
  get: {
    resBody: { user: UserShow }
  }
}
