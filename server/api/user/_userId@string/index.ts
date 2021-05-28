import { AuthHeader, UserShow } from '$/types'

export type Methods = {
  get: {
    query?: {
      type: 'search'
    }
    reqHeaders: AuthHeader
    resBody: { user: UserShow }
  }
}
