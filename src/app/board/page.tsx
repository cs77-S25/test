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
import NotesIcon from "@mui/icons-material/Notes";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";

const fetcher = (url: any) => fetch(url).then((r) => r.json());

export default function IndexPage() {
  const [boardName, setBoardName] = React.useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data, error, isLoading } = useSWR("/api/getboards", fetcher, {
    refreshInterval: 1000,
  });

  async function newBoard() {
    if (boardName != "") {
      let newBoard = await createBoard(boardName);
      console.log(newBoard);
      if (newBoard) {
        setBoardName("");
      }
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create New Board
              </ModalHeader>
              <ModalBody>
                <Input
                  value={boardName}
                  onValueChange={setBoardName}
                  label="Name"
                ></Input>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    newBoard();
                  }}
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="w-full h-[87vh] overflow-y-scroll lg:pt-2 lg:pl-2 ">
        <div className="w-full row-span-1 p-5 grid grid-cols-6 gap-5 h-56 bg-slate-500 bg-opacity-15 rounded-lg">
          <Card
            onPress={onOpen}
            isPressable
            isFooterBlurred
            className={
              "dark:bg-slate-800 w-36  bg-transparent hover:scale-105 hover:z-50 h-full"
            }
          >
            <CardBody className="justify-items-center w-full text-6xl ">
              <AddIcon
                fontSize="inherit"
                className="ml-auto mr-auto mt-auto mb-auto "
              ></AddIcon>
            </CardBody>
            <CardFooter className="text-sm">New Board</CardFooter>
          </Card>

          <Card
            isPressable
            isFooterBlurred
            className={
              "dark:bg-slate-800 w-36 border-dashed bg-transparent border-gray-600 hover:scale-105 hover:z-50 h-full"
            }
          >
            <CardBody
              onClick={() => newBoard()}
              className="justify-items-center w-full text-6xl "
            >
              <NotesIcon
                fontSize="inherit"
                className="ml-auto mr-auto mt-auto mb-auto "
              ></NotesIcon>
            </CardBody>
            <CardFooter className="text-sm">Template 1</CardFooter>
          </Card>
        </div>
        <div className="overflow-y-scroll h-[55vh] grid grid-cols-6 gap-2 justify-items-center mt-5">
          {isLoading != true
            ? data?.map((board: Board) => (
                <BoardCard key={board.id} board={board}></BoardCard>
              ))
            : null}
        </div>
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
