import React from "react";
import { genJWT, getDocByID } from "@/app/actions/actions";
import Tiptap from "@/components/tiptap";
import TipTapShared from "@/components/TipTapShared";
import { auth } from "@/app/auth";

export default async function IndexPage({
  params,
}: {
  params: Promise<{ docid: string }>;
}) {
  const slug = await params;

  const document = await getDocByID(parseInt(slug.docid));
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
