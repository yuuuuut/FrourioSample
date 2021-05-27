import { AuthHeader } from '$/types'

export type Methods = {
  post: {
    reqHeaders: AuthHeader
    resBody: { message: string }
  }
}
