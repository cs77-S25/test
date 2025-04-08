"use client";

import { Sidebar } from "@/components/sidebar";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@heroui/react";
import Link from "next/link";

export const DocCard = (props: any) => {
  return (
    <Card className={"h-72 hover:scale-105"}>
      <CardHeader className="p-5">{props.doc?.name}</CardHeader>
      <CardBody className="p-5">{props.doc?.text.substring(0, 50)}...</CardBody>
      <CardFooter>
        <Link href={`/document/${props.doc?.id}`}>
          <Button>View</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
