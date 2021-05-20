import { Todo, User } from '.prisma/client'

export type UserCreateBody = Pick<User, 'id' | 'displayName' | 'photoUrl'>
export type TodoCreateBody = Pick<Todo, 'title' | 'due_date' | 'userId'>
export type TodoUpdateBody = Pick<Todo, 'done'>

export type UserShow = {
  id: string
  displayName: string
  photoUrl: string
  createdAt: Date
  updatedAt: Date
}

export type UserInfo = {
  id: string
  name: string
  icon: string
}

export type AuthHeader = {
  authorization: string
}
