import { PrismaClient } from '@prisma/client'
import util from 'util'

import prisma from '$/prisma/prisma'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const exec = util.promisify(require('child_process').exec)

// Jest Setting
jest.setTimeout(30000)

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
