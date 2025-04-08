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
import { getDocByID } from "@/app/actions/actions";
import useSWR from "swr";
import { Docs } from "@prisma/client";
import Tiptap from "@/components/Tip";

export default function IndexPage({
  params,
}: {
  params: Promise<{ docid: string }>;
}) {
  const [boardName, setBoardName] = React.useState("");
  const [document, setDocument] = React.useState<Docs | null>();
  const [id, setID] = React.useState<Number | undefined>();

  const getData = useCallback(async () => {
    const slug = await decodeURIComponent((await params).docid);
    setID(parseInt(slug));
    const theDocument = await getDocByID(parseInt(slug));
    setDocument(theDocument);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <div className="w-full ">
        <div className="text-center text-3xl mb-10">{document?.name}</div>
        {document != null ? (
          <Tiptap content={document?.text} id={document.id} />
        ) : null}
      </div>
    </>
  );
}
