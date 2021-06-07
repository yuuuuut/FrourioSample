import { AuthHeader, TodoCreateBody } from '$/types'
import { Todo } from '.prisma/client'

export type Methods = {
  post: {
    reqHeaders: AuthHeader
    reqBody: TodoCreateBody
    resBody: { todo: Todo }
  }
}
