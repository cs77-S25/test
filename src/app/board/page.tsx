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
import { createBoard, createDoc } from "@/app/actions/actions";
import useSWR from "swr";
import { Board } from "@prisma/client";
import AddIcon from "@mui/icons-material/Add";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 111, 12, 13, 14, 15, 16];
const fetcher = (url: any) => fetch(url).then((r) => r.json());

export default function IndexPage() {
  const [boardName, setBoardName] = React.useState("");
  const { data, error, isLoading } = useSWR("/api/getboards", fetcher, {
    refreshInterval: 1000,
  });

  async function newBoard() {
    if (boardName != "") {
      let newBoard = await createBoard(boardName);
      console.log(newBoard);
    }
  }

  return (
    <>
      <div className="w-full h-[87vh] overflow-y-scroll  grid grid-cols-1 grid-rows-3 lg:pt-2 lg:pl-2 ">
        <div className="w-full bg-gray-600 row-span-1 p-5 grid grid-cols-6 gap-5">
          <Card
            className={
              "w-36 rounded-sm grid grid-rows-3 border-4 border-dashed bg-transparent border-gray-600 hover:scale-105 hover:z-50"
            }
          >
            <CardBody
              onClick={() => newBoard()}
              className="text-5xl text-center mt-auto row-start-2"
            >
              <AddIcon fontSize="large" className=""></AddIcon>
            </CardBody>

            <CardFooter className="text-small text-center justify-items-center">
              New Board
            </CardFooter>
          </Card>
          <Card
            isPressable
            onPress={() => console.log("HELLOO")}
            className={
              " w-36 rounded-sm grid grid-rows-3 bg-transparent border-4 border-dashed border-gray-600 hover:scale-105 hover:z-50"
            }
          >
            <CardBody className="text-center mt-auto row-start-1 font-semibold text-xl">
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
        <div className="w-full bg-gray-800 row-span-2"></div>
      </div>
    </>
  );
}

/*

<Input
                value={boardName}
                onValueChange={setBoardName}
                label="Name"
              ></Input>


 <Card
          className={
            "h-72 grid grid-rows-3 border-4 border-dashed bg-transparent border-gray-600 hover:scale-105 hover:z-50"
          }
        >
          <CardBody className="text-center mt-auto row-start-1 font-semibold text-2xl">
            New Board
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

*/
