import { AuthHeader, RequestShow } from '$/types'

export type Methods = {
  get: {
    reqHeaders: AuthHeader
    resBody: { requests: RequestShow[] }
  }
  post: {
    reqHeaders: AuthHeader
    resBody: { message: string }
  }
}
