"use client";

import { Sidebar } from "@/components/sidebar";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@heroui/react";
import Link from "next/link";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export const BoardCard = (props: any) => {
  const router = useRouter();
  return (
    <Card
      onPress={() => router.push(`/board/${props.board?.id}`)}
      isPressable
      isFooterBlurred
      className={
        "dark:bg-slate-800 w-36 border-dashed bg-transparent border-gray-600 hover:scale-105 hover:z-50 "
      }
    >
      <CardHeader>{props.board?.name}</CardHeader>
      <CardBody className="justify-items-center w-full text-sm ">
        {props.board?.description}
      </CardBody>
      <CardFooter className="text-sm">
        <Link href={`/board/${props.board?.id}`}>
          <div>View</div>
        </Link>
      </CardFooter>
    </Card>
  );
};
