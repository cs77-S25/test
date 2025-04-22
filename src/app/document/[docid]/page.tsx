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
import Tiptap from "@/components/tiptap";
import TipTapShared from "@/components/TipTapShared";
import { theDocs } from "@/lib/types";

export default function IndexPage({
  params,
}: {
  params: Promise<{ docid: string }>;
}) {
  const [boardName, setBoardName] = React.useState("");
  const [document, setDocument] = React.useState<theDocs | null>();
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
        {document != null ? (
          document?.shared_access.length > 0 ? (
            <TipTapShared
              content={document?.text}
              id={document.id}
              name={document?.name}
            ></TipTapShared>
          ) : (
            <Tiptap
              content={document?.text}
              id={document.id}
              name={document?.name}
            />
          )
        ) : null}
      </div>
    </>
  );
}
