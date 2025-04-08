import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      name: "Test",
      username: "test123",
      password: "password",
    },
  });

  const board = await prisma.board.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "cs77",
      description: "Social Computing",
      shared: false,
      owner: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  const doc = await prisma.docs.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "TEST DOC 1",
      text: "Social Computing Rocks! Here is a note saying that!",
      shared: false,
      owner: {
        connect: {
          id: user.id,
        },
      },
      board: {
        connect: {
          id: board.id,
        },
      },
    },
  });

  console.log({ board, user, doc });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
