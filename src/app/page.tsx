"use client";

import { Sidebar } from "@/components/sidebar";
import { Card } from "@heroui/react";
import { BoardCard } from "@/components/board-card";

const numbers = [1, 2, 3, 4, 5];

export default function IndexPage() {
  return (
    <>
      <div className="w-full  grid grid-cols-5 gap-7 ">
        {numbers.map((number) => (
          <BoardCard key={number}>{number}</BoardCard>
        ))}
      </div>
    </>
  );
}
