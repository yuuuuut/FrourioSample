import { TodoCreateBody } from '$/types'
import { Todo } from '.prisma/client'

export type Methods = {
  get: {
    query?: {
      page: number
    }
    resBody: Todo[]
  }
  post: {
    reqBody: TodoCreateBody
    resBody: { todo: Todo }
  }
}
