// api/test.ts
import { NextResponse, NextRequest } from "next/server";

import prisma from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  const user = await prisma.user.findFirst();
  const boards = await prisma.board.findMany({
    where: {
      owner: {
        id: user?.id,
      },
    },
  });

  //console.log(plans);
  return NextResponse.json(boards, { status: 200 });
}
