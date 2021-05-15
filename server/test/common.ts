import { mockDeep, mockReset, MockProxy } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'

import prisma from '../prisma/prisma'

jest.mock('../prisma/prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>()
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as MockProxy<PrismaClient>
