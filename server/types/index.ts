import { User } from '.prisma/client'

export type UserCreateBody = Pick<User, 'id' | 'displayName' | 'photoUrl'>

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
