import util from 'util'

import { mockDeep, MockProxy, mockReset } from 'jest-mock-extended'
import { PrismaClient, User } from '@prisma/client'
import prisma from '../prisma/prisma'

////////////////////
//  Jest Settings
///////////////////
jest.setTimeout(60000)
jest.mock('../prisma/prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>()
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as MockProxy<PrismaClient>

// eslint-disable-next-line @typescript-eslint/no-var-requires
const exec = util.promisify(require('child_process').exec)

// Database Table Names
const tableNames = [
  'users',
  'todos',
  'profiles',
  '_CategoryToTodo',
  '_relationships'
]

/**
 * DatabaseをCleanupします。
 */
export const resetDatabase = async () => {
  const prisma = new PrismaClient()
  try {
    for (const tableName of tableNames) {
      await prisma.$queryRaw(`DELETE FROM ${tableName};`)
    }
  } catch (err) {
    console.error(err)
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * Testデータを挿入します。
 */
export const seedingDatabase = async () => {
  await exec(`yarn prisma:seed`)
}

/**
 * TestUserデータを作成します。
 */
export const createTestUser = async (id: string) => {
  const user = await prisma.user.create({
    data: {
      id,
      displayName: 'TestUserName',
      photoUrl: 'TestUserPhoto'
    }
  })

  return user
}

/**
 * TestTodoデータを作成します。
 */
export const createTestTodo = async (user: User) => {
  const todo = await prisma.todo.create({
    data: {
      title: 'TestTitle',
      due_date: new Date(),
      userId: user.id
    }
  })

  return todo
}
