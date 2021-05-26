import { AuthHeader, UserShow } from '$/types'

export type Methods = {
  get: {
    reqHeaders: AuthHeader
    resBody: { user: UserShow }
  }
}
