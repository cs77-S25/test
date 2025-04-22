"use client";

import { deleteDoc } from "@/app/actions/actions";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  ButtonGroup,
} from "@heroui/react";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
export const DocCard = (props: any) => {
  return (
    <Card
      isFooterBlurred
      className={"dark:bg-slate-800 w-44 h-56 border-dashed  "}
    >
      <Link
        href={`/document/${props.doc?.id}`}
        className="cursor-pointer h-full"
      >
        <CardHeader className="p-5">{props.doc?.name}</CardHeader>

        <CardBody className="p-5">
          {props.doc?.text.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 20)}...
        </CardBody>
      </Link>
      <CardFooter className="justify-end">
        <ButtonGroup>
          <Button isIconOnly>
            <PersonAddAlt1Icon />
          </Button>
          <Button
            isIconOnly
            onPress={() => {
              deleteDoc(props.board?.id);
            }}
          >
            <DeleteIcon />
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
