import { AuthHeader, TodoShow, TodoUpdateBody } from '$/types'
import { Todo } from '.prisma/client'

export type Methods = {
  get: {
    reqHeaders: AuthHeader
    resBody: { todo: TodoShow }
  }
  patch: {
    reqHeaders: AuthHeader
    reqBody: TodoUpdateBody
    resBody: { todo: Todo }
  }
}
