import { TodoUpdateBody } from '$/types'
import { Todo } from '.prisma/client'

export type Methods = {
  get: {
    resBody: string
  }
  patch: {
    reqBody: TodoUpdateBody
    resBody: { todo: Todo }
  }
}
