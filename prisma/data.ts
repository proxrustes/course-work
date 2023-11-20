import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.user.create({
  data: {
    Name: "Student",
    Password: "Student",
    Access_Level: 1,
  },
});

prisma.user.create({
  data: {
    Name: "Professor",
    Password: "Professor",
    Access_Level: 2,
  },
});

prisma.user.create({
  data: {
    Name: "Department Head",
    Password: "Department Head",
    Access_Level: 3,
  },
});
prisma.user.create({
  data: {
    Name: "Dean",
    Password: "Dean",
    Access_Level: 4,
  },
});
prisma.user.create({
  data: {
    Name: "Admin",
    Password: "Admin",
    Access_Level: 5,
  },
});
prisma.user.create({
  data: {
    Name: "DB Operator",
    Password: "DB Operator",
    Access_Level: 6,
  },
});
