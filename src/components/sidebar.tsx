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
import useSWR from "swr";
import { Board } from "@prisma/client";
import { BoardCard } from "./board-card";
const fetcher = (url: any) => fetch(url).then((r) => r.json());

export const Sidebar = (props: any) => {
  useEffect(() => {}, []);
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  const { data, error, isLoading } = useSWR("/api/getboards", fetcher, {
    refreshInterval: 1000,
  });

  return (
    <div className="pt-10">
      <Accordion isCompact selectionMode="multiple" defaultExpandedKeys={"2"}>
        <AccordionItem
          key="2"
          aria-label="User 10001's Boards"
          title="User 10001's Boards"
        >
          <Accordion isCompact defaultExpandedKeys={"3"}>
            <AccordionItem key="3" aria-label="CS77" title="CS77">
              <div className="list-desc ml-3 font-light">
                {isLoading != true
                  ? data?.map((board: Board) => (
                      <Link href={`/board/${board.id}`}>
                        <li
                          key={board.id}
                          className="hover:text-orange-600 cursor-pointer "
                        >
                          {board.name}{" "}
                        </li>
                      </Link>
                    ))
                  : null}
              </div>
            </AccordionItem>
          </Accordion>
        </AccordionItem>
        <AccordionItem
          key="66"
          aria-label="User 10001's Boards"
          title="User 10001's Boards"
        >
          <Accordion isCompact>
            <AccordionItem
              key="55"
              aria-label="Accordion 3"
              title="Accordion 3"
            >
              {defaultContent}
            </AccordionItem>
          </Accordion>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
