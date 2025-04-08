// api/test.ts
import { NextResponse, NextRequest } from "next/server";

import prisma from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = await new URL(request.url);
  const boardID: any = (await searchParams.get("boardid")) || Prisma.skip;

  const user = await prisma.user.findFirst();
  console.log(user);
  let boards;

  boards = await prisma.docs.findMany({
    where: {
      owner: {
        id: user?.id,
      },
      boardid: parseInt(boardID),
    },
  });

  //console.log(plans);
  return NextResponse.json(boards, { status: 200 });
}
