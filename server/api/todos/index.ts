import { TodoCreateBody } from '$/types'
import { Todo } from '.prisma/client'

export type Methods = {
  get: {
    resBody: string
  }
  post: {
    reqBody: TodoCreateBody
    resBody: { todo: Todo }
  }
}
