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

export async function createBoard(name: any) {
  const user = await prisma.user.findFirst();
  let board;
  if (user) {
    board = await prisma.board.create({
      data: {
        shared: false,
        text: "",
        name: name,
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

export async function updateBoard(id: any, content: string) {
  const board = await prisma.board.update({
    where: {
      id: id,
    },
    data: {
      text: content,
    },
  });

  return board;
}

export async function getBoards() {
  const boards = await prisma.board.findMany();
  return boards;
}

export async function getBoardByID(id: number) {
  const board = await prisma.board.findUnique({ where: { id: id } });
  return board;
}
