import { TodoShow, TodoUpdateBody } from '$/types'
import { Todo } from '.prisma/client'

export type Methods = {
  get: {
    resBody: { todo: TodoShow }
  }
  patch: {
    reqBody: TodoUpdateBody
    resBody: { todo: Todo }
  }
}
