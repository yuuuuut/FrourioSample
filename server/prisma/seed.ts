// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const main = async () => {
  await prisma.user.createMany({
    data: [
      { id: 'Test1', displayName: 'TestName1', photoUrl: 'TestPhoto1' },
      { id: 'Test2', displayName: 'TestName2', photoUrl: 'TestPhoto2' },
      { id: 'Test3', displayName: 'TestName3', photoUrl: 'TestPhoto3' },
      { id: 'Test4', displayName: 'TestName4', photoUrl: 'TestPhoto4' },
      { id: 'Test5', displayName: 'TestName5', photoUrl: 'TestPhoto5' },
      { id: 'Test6', displayName: 'TestName6', photoUrl: 'TestPhoto6' },
      { id: 'Test7', displayName: 'TestName7', photoUrl: 'TestPhoto7' },
      { id: 'Test8', displayName: 'TestName8', photoUrl: 'TestPhoto8' },
      { id: 'Test9', displayName: 'TestName9', photoUrl: 'TestPhoto9' }
    ]
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
