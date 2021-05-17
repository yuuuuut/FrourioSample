import { Todo } from '.prisma/client'

export type Methods = {
  get: {
    resBody: string
  }
  patch: {
    resBody: { todo: Todo }
  }
}
