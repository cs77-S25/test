"use client";
import "@/styles/tiptap.css";
import { useEditor, EditorContent } from "@tiptap/react";
import React, { useState } from "react";
import { CircularProgress } from "@heroui/react";
import { updateDoc } from "@/app/actions/actions";
import { useDebouncedCallback } from "use-debounce";
import * as Y from "yjs";
import { TiptapCollabProvider } from "@hocuspocus/provider";
import CodeBlock from "@tiptap/extension-code-block";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import CharacterCount from "@tiptap/extension-character-count";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";

import "@tiptap/core";

import FontFamily from "@tiptap/extension-font-family"; //fonts are not working -----------------------Commented out - J

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
  const UpdateBoard = useDebouncedCallback(async (content: any) => {
    let updatedBoard = await updateDoc(props.id, content);
  }, 100);

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
      //console.log(props.content);
      //setEditorContent(props.content);
    },
  });

  const editor = useEditor({
    enableContentCheck: true,
    onContentError: ({ disableCollaboration }) => {
      disableCollaboration();
    },
    onCreate: ({ editor: currentEditor }) => {
      provider.on("synced", () => {
        setLoading(false);
        UpdateBoard(props.editor.getHTML());
        if (currentEditor.isEmpty) {
          currentEditor.commands.setContent(
            "Fetching Failed... Please refresh the page to try again."
          );
        }
      });
    },
    extensions: [
      FontFamily,
      Underline,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ mergeNestedSpanStyles: true }),
      StarterKit.configure({
        history: false,
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      CharacterCount,
      Collaboration.extend().configure({
        document: doc,
      }),
      CollaborationCursor.extend().configure({
        provider,
      }),
    ],
    editorProps: editorProps,
    injectCSS: true,
    immediatelyRender: false,
    onUpdate(props: any) {
      UpdateBoard(props.editor.getHTML());
      //setEditorContent(props.editor.getHTML());
    },
  });

  return (
    <>
      {loading ? (
        <CircularProgress
          className="justify-self-center"
          label="Fetching Shared Document.... Connecting"
        />
      ) : (
        <>
          <MenuBar name={props.name} editor={editor} />
          <div>
            character-count {editor?.storage.characterCount.characters()}
          </div>
          <EditorContent
            className={"dark:bg-neutral-900 bg-slate-50 rounded-md py-5 "}
            editor={editor}
          />
        </>
      )}
    </>
  );
};
