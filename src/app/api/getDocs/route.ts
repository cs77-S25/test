// api/test.ts
import { NextResponse, NextRequest } from "next/server";

import prisma from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";
import { auth } from "@/app/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = await new URL(request.url);
  const boardID: any = await searchParams.get("boardid");
  let boards;

  const session = await auth();

  if (session?.user && session.user.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (user) {
      if (boardID != undefined) {
        boards = await prisma.docs.findMany({
          where: {
            boardid: parseInt(boardID),
            owner: {
              id: user?.id,
            },
          },
        });
      }
    }
  }

  return NextResponse.json(boards, { status: 200 });
}
