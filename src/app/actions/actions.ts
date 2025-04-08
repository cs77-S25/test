"use server";

import prisma from "../lib/prisma";

export async function createUser(data: any) {
  const user = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      username: data.username,
      password: data.password,
    },
  });
  return user;
}

export async function createDoc(name: any, boardId: Number | any) {
  const user = await prisma.user.findFirst();
  let board;
  if (user) {
    board = await prisma.docs.create({
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
  return board;
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
  const boards = await prisma.docs.findMany();
  return boards;
}

export async function getDocByID(id: number) {
  const board = await prisma.docs.findUnique({ where: { id: id } });
  return board;
}

// BOARDS #####################################################################

export async function createBoard(name: any) {
  const user = await prisma.user.findFirst();
  let board;
  if (user) {
    board = await prisma.board.create({
      data: {
        shared: false,
        name: name,
        description: "",
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

export async function getBoards() {
  const boards = await prisma.board.findMany();
  return boards;
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
