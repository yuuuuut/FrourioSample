import { TodoCreateBody } from '$/types'
import { Todo } from '.prisma/client'

export type Methods = {
  post: {
    reqBody: TodoCreateBody
    resBody: { todo: Todo }
  }
}
