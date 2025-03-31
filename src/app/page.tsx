"use client";

import { Sidebar } from "@/components/sidebar";
import { Card } from "@heroui/react";
import { BoardCard } from "@/components/board-card";

const numbers = [1, 2, 3, 4, 5];

export default function IndexPage() {
  return (
    <>
      {numbers.map((number) => (
        <BoardCard>{number}</BoardCard>
      ))}
    </>
  );
}
