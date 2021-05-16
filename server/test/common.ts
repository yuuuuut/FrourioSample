import util from 'util'

jest.setTimeout(30000)

// eslint-disable-next-line @typescript-eslint/no-var-requires
const exec = util.promisify(require('child_process').exec)

export const resetDatabase = async () => {
  await exec(`yarn migrate:reset`)
}
