"use client";

import "@/styles/tiptap.css";

import { EditorContent, useEditor } from "@tiptap/react";
import React, { useState } from "react";
import { updateDoc } from "@/app/actions/actions";
import { useDebouncedCallback } from "use-debounce";
// This allows font family to work
import "@tiptap/core";
import MenuBar from "@/components/MenuBar";

import { CircularProgress } from "@heroui/react";
import { extensions } from "./extensions";

const editorProps = {
  attributes: {
    class:
      "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none h-[65vh]  overflow-y-scroll",
  },
};

export default (props: any) => {
  const editor = useEditor({
    extensions: extensions,
    editorProps: editorProps,
    injectCSS: true,
    immediatelyRender: false,
    content: props.content,
    onUpdate(props: any) {
      UpdateBoard(props.editor.getHTML());
    },
  });

  const UpdateBoard = useDebouncedCallback(async (content: any) => {
    let updatedBoard = await updateDoc(props.id, content);
  }, 100);
  return (
    <>
      {!editor ? (
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
