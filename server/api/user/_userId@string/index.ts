import { AuthHeader, UserShow } from '$/types'

export type Methods = {
  get: {
    query?: {
      page: number
    }
    reqHeaders: AuthHeader
    resBody: { user: UserShow }
  }
}
