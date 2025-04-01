"use client";

import { Sidebar } from "@/components/sidebar";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@heroui/react";
import { BoardCard } from "@/components/board-card";
import React, { useCallback, useEffect } from "react";
import { getBoardByID } from "@/app/actions/actions";
import useSWR from "swr";
import { Board } from "@prisma/client";
import Tiptap from "@/components/tiptap";

export default function IndexPage({
  params,
}: {
  params: Promise<{ boardid: string }>;
}) {
  const [boardName, setBoardName] = React.useState("");
  const [board, setBoard] = React.useState<Board | null>();
  const [id, setID] = React.useState<Number | undefined>();

  const getData = useCallback(async () => {
    const slug = await decodeURIComponent((await params).boardid);
    setID(parseInt(slug));
    const theboard = await getBoardByID(parseInt(slug));
    setBoard(theboard);
  }, []);

  useEffect(() => {
    getData();
    console.log(board);
  }, [getData]);

  return (
    <>
      <div className="w-full ">
        <div className="text-center text-3xl mb-10">{board?.name}</div>
        {board != undefined ? <Tiptap content={board?.text} id={id} /> : null}
      </div>
    </>
  );
}
