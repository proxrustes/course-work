import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  
  await prisma.user.create({
  data: {
    name: "Student",
    password: "Student",
    access_level: 1,
  },
})

await prisma.user.create({
  data: {
    name: "Professor",
    password: "Professor",
    access_level: 2,
  },
})

await prisma.user.create({
  data: {
    name: "Department Head",
    password: "Department Head",
    access_level: 3,
  },
})
await prisma.user.create({
  data: {
    name: "Dean",
    password: "Dean",
    access_level: 4,
  },
})
await prisma.user.create({
  data: {
    name: "Admin",
    password: "Admin",
    access_level: 5,
  },
})
await prisma.user.create({
  data: {
    name: "DB Operator",
    password: "DB Operator",
    access_level: 6,
  },
})

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })