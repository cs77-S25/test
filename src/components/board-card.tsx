"use client";

import { Sidebar } from "@/components/sidebar";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@heroui/react";

export const BoardCard = (props: any) => {
  return (
    <Card className={"h-full h-72"}>
      <CardHeader>Board Title Here</CardHeader>
      <CardBody>short preview/description of the work thats here</CardBody>
      <CardFooter>
        <Button>Edit</Button>
      </CardFooter>
    </Card>
  );
};
