import { AuthHeader } from '$/types'
import { Todo } from '.prisma/client'

export type Methods = {
  get: {
    query?: {
      page: number
    }
    reqHeaders: AuthHeader
    resBody: { todos: Todo[] }
  }
}
