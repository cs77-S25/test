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
import { genJWT, getDocByID } from "@/app/actions/actions";
import useSWR from "swr";
import { Docs } from "@prisma/client";
import Tiptap from "@/components/tiptap";
import TipTapShared from "@/components/TipTapShared";
import { theDocs } from "@/lib/types";
import { useSession } from "next-auth/react";
import { auth } from "@/app/auth";

export default async function IndexPage({
  params,
}: {
  params: Promise<{ docid: string }>;
}) {
  const slug = await decodeURIComponent((await params).docid);
  const document = await getDocByID(parseInt(slug));
  let jwt = await genJWT();
  const session = await auth();

  return (
    <>
      <div className="w-full ">
        {document != null ? (
          document?.shared_access.length > 0 ? (
            <TipTapShared
              content={document?.text}
              id={document.id}
              name={document?.name}
              jwt={jwt}
              session={session}
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
