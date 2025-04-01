"use client";

import { Sidebar } from "@/components/sidebar";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@heroui/react";

export const BoardCard = (props: any) => {
  return (
    <Card className={"h-72"}>
      <CardHeader>{props.board?.name}</CardHeader>
      <CardBody>short preview/description of the work thats here</CardBody>
      <CardFooter>
        <Button>Edit</Button>
      </CardFooter>
    </Card>
  );
};
