"use client";

import { Sidebar } from "@/components/sidebar";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@heroui/react";
import { DocCard } from "@/components/doc-card";

import React, { useCallback, useEffect } from "react";
import { createDoc, getBoardByID } from "@/app/actions/actions";
import { Board, Docs } from "@prisma/client";
import useSWR from "swr";
import { useRouter } from "next/navigation";
const fetcher = (url: any) => fetch(url).then((r) => r.json());

export default function IndexPage({
  params,
}: {
  params: Promise<{ boardid: string }>;
}) {
  const router = useRouter();
  const [docName, setDocName] = React.useState("");
  const [board, setBoard] = React.useState<Board | null>();
  //const [documents, setDocuments] = React.useState<Docs[] | undefined>([]);

  const [id, setID] = React.useState<Number | undefined>();
  const { data, error, isLoading } = useSWR(
    `/api/getDocs?boardid=${id}`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  const getData = useCallback(async () => {
    const slug = await decodeURIComponent((await params).boardid);
    setID(parseInt(slug));
    const theBoard = await getBoardByID(parseInt(slug));
    //setDocuments(theBoard?.docs);
  }, []);

  async function newDocument() {
    if (docName != "") {
      let newDoc = await createDoc(docName, id);
      if (newDoc) {
        setDocName("");
        router.refresh();
      }
    }
  }

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <div className="w-full h-[87vh] overflow-y-scroll  grid grid-cols-5 gap-7 lg:pt-2 lg:pl-2 ">
        <Card
          className={
            "h-72 grid grid-rows-3 border-4 border-dashed bg-transparent border-gray-600 hover:scale-105 hover:z-50"
          }
        >
          <CardBody className="text-center mt-auto row-start-1 font-semibold text-2xl">
            New Document
          </CardBody>
          <div
            onClick={() => newDocument()}
            className="text-5xl text-center mt-auto row-start-2"
          >
            +
          </div>
          <CardFooter>
            {" "}
            <Input
              value={docName}
              onValueChange={setDocName}
              label="Name"
            ></Input>
          </CardFooter>
        </Card>
        <Card
          isPressable
          className={
            "h-72 grid grid-rows-3 bg-transparent border-4 border-dashed border-gray-600 hover:scale-105 hover:z-50"
          }
        >
          <CardBody className="text-center mt-auto row-start-1 font-semibold text-2xl">
            Template 1
          </CardBody>
          <div className="text-5xl text-center mt-auto row-start-2">+</div>
        </Card>
        {!isLoading
          ? data?.map((doc: Docs) => <DocCard key={doc.id} doc={doc}></DocCard>)
          : null}
      </div>
    </>
  );
}
