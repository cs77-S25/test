"use server";

import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";
import { auth } from "@/app/auth";

async function checkUser() {
  const session = await auth();

  if (session?.user) {
    return session;
  }
}

export async function checkUserExists(session: any) {
  if (session?.user) {
    console.log("authenticated Proceeding with User check...");
    if (session?.user.email && session.user.name) {
      let today = new Date();
      const user = await prisma.user.upsert({
        where: {
          email: session.user.email || Prisma.skip,
        },
        update: {
          lastLogin: today,
          name: session?.user?.name || Prisma.skip,
        },
        create: {
          email: session?.user?.email,
          name: session?.user?.name,
          lastLogin: today,
          authType: "google",
        },
      });
    }
    console.log("error creating Local User");
  }
}

export async function createDoc(name: any, boardId: Number | any) {
  const session = await auth();
  let doc;

  if (session?.user && session?.user.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (user) {
      doc = await prisma.docs.create({
        data: {
          shared: false,
          text: "",
          name: name,
          board: {
            connect: {
              id: boardId,
            },
          },
          owner: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }
  }
  return doc;
}

export async function updateDoc(id: any, content: string) {
  const board = await prisma.docs.update({
    where: {
      id: id,
    },
    data: {
      text: content,
    },
  });

  return board;
}

export async function getDocs() {
  const docs = await prisma.docs.findMany();

  return docs;
}

export async function getDocByID(id: number) {
  const board = await prisma.docs.findUnique({ where: { id: id } });
  return board;
}

// BOARDS #####################################################################

export async function createBoard(name: any, description: string) {
  const session = await auth();

  if (session?.user && session?.user.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    let board;
    if (user) {
      board = await prisma.board.create({
        data: {
          shared: false,
          name: name,
          description: description,
          owner: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }
    return board;
  }
}

export async function deleteBoard(id: any) {
  if (id) {
    const session = await auth();

    if (session?.user && session?.user.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (user) {
        await prisma.board.delete({
          where: {
            id: id,
          },
        });
      }
    }
  }
}

export async function getBoards() {
  const boards = await prisma.board.findMany({
    include: {
      docs: true,
    },
  });
  return boards;
}

export async function getUserInfo() {
  const session = await auth();

  if (session?.user && session?.user.email) {
    const boards = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        boards: { include: { docs: true } },
      },
    });

    return boards;
  }
}

export async function updateSideBarOpen(things: Set<React.Key> | "all") {
  let newSideBarOpen: string[] = [];
  for (const thing of things) {
    newSideBarOpen.push(thing.toString());
  }

  const session = await auth();

  if (session?.user && session?.user.email) {
    const boards = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: { sidebarOpen: newSideBarOpen },
    });

    return boards;
  }
}

export async function getBoardByID(id: number) {
  const board = await prisma.board.findUnique({
    where: { id: id },
    include: {
      docs: true,
    },
  });
  return board;
}
