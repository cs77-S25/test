"use client";
//Just for pathname highlighting though, could always go back if it becomes too slow
import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem, Link } from "@heroui/react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
  Card,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { usePathname } from "next/navigation";

import useSWR from "swr";
import { Board } from "@/lib/types";
import { BoardCard } from "./board-card";
import { getBoards, updateSideBarOpen } from "@/app/actions/actions";
import { Docs, User } from "@prisma/client";
import { useRouter } from "next/navigation";
const fetcher = (url: any) => fetch(url).then((r) => r.json());

export const Sidebar = (props: {
  boards: Board[];
  userInfo: User | null | undefined;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState<any>(new Set([]));

  useEffect(() => {
    setSelectedKeys(props.userInfo?.sidebarOpen);
  }, []);

  return (
    <div className="pt-10  overflow-y-scroll ">
      <Accordion
        isCompact
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys: "all" | Set<React.Key>) => {
          setSelectedKeys(keys);
          updateSideBarOpen(keys);
        }}
      >
        {props.boards?.map((board: Board) => (
          <AccordionItem
            key={board.id}
            aria-label={board.name}
            title={board.name}
            onPress={() => router.push(`/board/${board.id}`)}
            classNames={{
              title: ` cursor-pointer ${
                pathname == "/board/" + board.id
                  ? "text-secondary"
                  : "dark:text-white text-black"
              }`,
            }}
          >
            <div className="list-desc ml-3 font-light grid grid-cols-1">
              {board.docs?.map((doc: Docs) => (
                <Link key={doc.id} href={`/document/${doc.id}`}>
                  <li
                    key={doc.id}
                    className={`hover:text-secondary cursor-pointer ${
                      pathname == "/document/" + doc.id
                        ? "text-secondary"
                        : "dark:text-white text-black"
                    }`}
                  >
                    {doc.name}{" "}
                  </li>
                </Link>
              ))}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
