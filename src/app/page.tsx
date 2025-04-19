"use client";

import { Sidebar } from "@/components/sidebar";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { BoardCard } from "@/components/board-card";
import { useSession } from "next-auth/react";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 111, 12, 13, 14, 15, 16];

export default function IndexPage() {
  const session = useSession();

  return (
    <>
      hihihi
      <div className="w-full h-[87vh] overflow-y-scroll  grid grid-cols-5 gap-7 lg:pt-2 lg:pl-2 "></div>
    </>
  );
}
