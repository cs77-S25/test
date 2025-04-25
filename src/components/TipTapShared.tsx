"use client";
import "@/styles/tiptap.css";
import { useEditor, EditorContent } from "@tiptap/react";
import React, { useState } from "react";
import { CircularProgress } from "@heroui/react";
import { updateDoc } from "@/app/actions/actions";
import { useDebouncedCallback } from "use-debounce";
import * as Y from "yjs";
import { TiptapCollabProvider } from "@hocuspocus/provider";

// This allows font family to work
import "@tiptap/core";
import MenuBar from "@/components/MenuBar.js";
import { extensions } from "@/components/extensions";

const editorProps = {
  attributes: {
    class:
      "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none h-[65vh]  overflow-y-scroll",
  },
};
const doc = new Y.Doc(); // Initialize Y.Doc for shared editing

export default (props: any) => {
  const [loading, setLoading] = useState(true);

  let provider = new TiptapCollabProvider({
    name: `${props.name + "-" + props.id}`, // Unique document identifier for syncing. This is your document name.
    appId: process.env.NEXT_PUBLIC_APPID || "", // Your Cloud Dashboard AppID or `baseURL` for on-premises
    token: props.jwt,
    document: doc,
    preserveConnection: false,
    user: `${props.session?.user?.name}`,
    broadcast: true,
    // The onSynced callback ensures initial content is set only once using editor.setContent(), preventing repetitive content loading on editor syncs.
    onSynced(editor: any) {
      setLoading(false);
      //setEditorContent(props.content);
    },
  });

  const editor = useEditor({
    extensions: extensions,
    editorProps: editorProps,
    injectCSS: true,
    immediatelyRender: false,
    onUpdate(props: any) {
      UpdateBoard(props.editor.getHTML());
      //setEditorContent(props.editor.getHTML());
    },
  });

  const UpdateBoard = useDebouncedCallback(async (content: any) => {
    let updatedBoard = await updateDoc(props.id, content);
  }, 100);

  return (
    <>
      {loading ? (
        <CircularProgress className="justify-self-center" />
      ) : (
        <>
          <MenuBar name={props.name} editor={editor} />
          <EditorContent
            className={"dark:bg-neutral-900 bg-slate-50 rounded-md py-5 "}
            editor={editor}
          />
        </>
      )}
    </>
  );
};
