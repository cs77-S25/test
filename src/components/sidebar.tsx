"use client";
//Just for pathname highlighting though, could always go back if it becomes too slow
import React, { useCallback, useEffect, useState } from "react";
import { Accordion, AccordionItem, Divider, Link } from "@heroui/react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { usePathname } from "next/navigation";

import useSWR from "swr";
import { Board, theUser } from "@/lib/types";
import { BoardCard } from "./board-card";
import {
  getBoards,
  getUserInfo,
  updateSideBarOpen,
} from "@/app/actions/actions";
import { Docs, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { auth } from "@/app/auth";
const fetcher = (url: any) => fetch(url).then((r) => r.json());

export const Sidebar = (props: any) => {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState<any>(new Set([]));

  useEffect(() => {
    setSelectedKeys(props.userInfo?.sidebarOpen);
  }, [props.userInfo]);

  return (
    <div className="pt-10 overflow-y-scroll ">
      <Accordion
        isCompact
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys: "all" | Set<React.Key>) => {
          setSelectedKeys(keys);
          updateSideBarOpen(keys);
        }}
      >
        {props.userInfo
          ? props.userInfo?.boards
              ?.sort((a: any, b: any) => {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
              })
              .map((board: Board) => (
                <AccordionItem
                  key={board.id}
                  aria-label={board.name}
                  title={board.name}
                  classNames={{
                    title: ` cursor-pointer ${
                      pathname == "/board/" + board.id
                        ? "text-secondary"
                        : "dark:text-white text-black"
                    }`,
                  }}
                >
                  <div className="list-desc ml-3 font-light grid grid-cols-1">
                    {board.docs
                      ?.sort((a: any, b: any) => {
                        if (a.name < b.name) {
                          return -1;
                        }
                        if (a.name > b.name) {
                          return 1;
                        }
                        return 0;
                      })
                      .map((doc: Docs) => (
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
              ))
          : null}
      </Accordion>

      <Divider className="mt-10" />
      <div className="text-center text-xl mt-5">Shared Boards</div>
      <Accordion
        isCompact
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys: "all" | Set<React.Key>) => {
          setSelectedKeys(keys);
          updateSideBarOpen(keys);
        }}
      >
        {props.userInfo
          ? props.userInfo?.shared_boards
              ?.sort((a: any, b: any) => {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
              })
              .map((board: Board) => (
                <AccordionItem
                  key={board.id}
                  aria-label={board.name}
                  title={board.name}
                  classNames={{
                    title: ` cursor-pointer ${
                      pathname == "/board/" + board.id
                        ? "text-secondary"
                        : "dark:text-white text-black"
                    }`,
                  }}
                >
                  <div className="list-desc ml-3 font-light grid grid-cols-1">
                    {board.docs
                      ?.sort((a: any, b: any) => {
                        if (a.name < b.name) {
                          return -1;
                        }
                        if (a.name > b.name) {
                          return 1;
                        }
                        return 0;
                      })
                      .map((doc: Docs) => (
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
              ))
          : null}
      </Accordion>
    </div>
  );
};
