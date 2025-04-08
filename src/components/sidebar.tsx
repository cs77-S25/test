"use client";
//Just for pathname highlighting though, could always go back if it becomes too slow
import React, { useEffect } from "react";
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
import { Board } from "@prisma/client";
import { BoardCard } from "./board-card";

const fetcher = (url: any) => fetch(url).then((r) => r.json());

export const Sidebar = (props: any) => {
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, []);
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  const { data, error, isLoading } = useSWR("/api/getboards", fetcher, {
    refreshInterval: 1000,
  });

  return (
    <div className="pt-10">
      <Accordion isCompact selectionMode="multiple" defaultExpandedKeys={["1"]}>
        <AccordionItem key="1" aria-label="CS77" title="CS77">
          <div className="list-desc ml-3 font-light grid grid-cols-1">
            {isLoading != true
              ? data?.map((board: Board) => (
                  <Link key={board.id} href={`/board/${board.id}`}>
                    <li
                      key={board.id}
                      className={`hover:text-orange-600 cursor-pointer ${
                        pathname == "/board/" + board.id
                          ? "text-orange-600"
                          : "text-white"
                      }`}
                    >
                      {board.name}{" "}
                    </li>
                  </Link>
                ))
              : null}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
