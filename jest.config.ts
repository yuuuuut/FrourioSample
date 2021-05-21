import { pathsToModuleNameMapper } from 'ts-jest/utils'
import type { Config } from '@jest/types'
import { compilerOptions } from './tsconfig.json'

const config: { projects: Config.InitialOptions[] } = {
  projects: [
    {
      testPathIgnorePatterns: ['<rootDir>/server'],
      testMatch: ['<rootDir>/test'],
      transform: {
        '^.+\\.tsx$': 'babel-jest',
        '^.+\\.ts$': 'ts-jest'
      },
      moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
        ...pathsToModuleNameMapper(compilerOptions.paths, {
          prefix: '<rootDir>/'
        })
      }
    },
    {
      clearMocks: true,
      resetMocks: true,
      restoreMocks: true,
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/server/test/**/*.ts'],
      setupFilesAfterEnv: ['<rootDir>/server/test/common.ts'],
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/'
      })
    }
  ]
}

export default config
