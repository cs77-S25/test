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
import React from "react";
import { createBoard } from "@/app/actions/actions";
import useSWR from "swr";
import { Board } from "@prisma/client";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 111, 12, 13, 14, 15, 16];
const fetcher = (url: any) => fetch(url).then((r) => r.json());

export default function IndexPage() {
  const [boardName, setBoardName] = React.useState("");
  const { data, error, isLoading } = useSWR("/api/getboards", fetcher, {
    refreshInterval: 1000,
  });

  async function newBoard() {
    console.log("hi");
    if (boardName != "") {
      let newBoard = await createBoard(boardName);
      console.log(newBoard);
    }
  }

  return (
    <>
      <div className="w-full h-[87vh] overflow-y-scroll  grid grid-cols-5 gap-7 lg:pt-2 lg:pl-2 ">
        <Card
          className={
            "h-72 grid grid-rows-3 border-4 border-dashed bg-transparent border-gray-600 hover:scale-105 hover:z-50"
          }
        >
          <CardBody className="text-center mt-auto row-start-1 font-semibold text-2xl">
            Blank
          </CardBody>
          <div
            onClick={() => newBoard()}
            className="text-5xl text-center mt-auto row-start-2"
          >
            +
          </div>
          <CardFooter>
            {" "}
            <Input
              value={boardName}
              onValueChange={setBoardName}
              label="Name"
            ></Input>
          </CardFooter>
        </Card>
        <Card
          isPressable
          onPress={() => console.log("HELLOO")}
          className={
            "h-72 grid grid-rows-3 bg-transparent border-4 border-dashed border-gray-600 hover:scale-105 hover:z-50"
          }
        >
          <CardBody className="text-center mt-auto row-start-1 font-semibold text-2xl">
            Template 1
          </CardBody>
          <div className="text-5xl text-center mt-auto row-start-2">+</div>
        </Card>
        {isLoading != true
          ? data?.map((board: Board) => (
              <BoardCard key={board.id} board={board}></BoardCard>
            ))
          : null}
      </div>
    </>
  );
}
