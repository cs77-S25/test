"use client";
import "@/styles/tiptap.css";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import {
  Editor,
  EditorProvider,
  useCurrentEditor,
  useEditor,
  EditorContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import { Button, Card, CardBody, CardHeader, ButtonGroup } from "@heroui/react";
import { genJWT, updateDoc } from "@/app/actions/actions";
import { useDebouncedCallback } from "use-debounce";

//Icons:
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import CodeIcon from "@mui/icons-material/Code";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import FormatClearIcon from "@mui/icons-material/FormatClear";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

// This allows font family to work
import "@tiptap/core";
//Load env vars

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontFamily: {
      setFontFamily: (font: string) => ReturnType;
    };
  }
}

//Fonts:
//import FontFamily from '@tiptap/extension-font-family'; //fonts are not working -----------------------Commented out - J
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import ColorLensIcon from "@mui/icons-material/ColorLens";

import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";
import { TiptapCollabProvider } from "@hocuspocus/provider";
import { WebrtcProvider } from "y-webrtc";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { useSession } from "next-auth/react";

const editorProps = {
  attributes: {
    class:
      "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none h-[65vh]  overflow-y-scroll",
  },
};
const doc = new Y.Doc(); // Initialize Y.Doc for shared editing
const provider = new WebrtcProvider(
  "tiptap-collaboration-cursor-extension",
  doc
);

export default (props: any) => {
  const session = useSession();
  const extensions = [
    Document,
    Paragraph,
    Text,
    TextStyle,
    Color,
    Collaboration.configure({
      document: doc, // Configure Y.Doc for collaboration
    }),
    CollaborationCursor.configure({
      provider,
      user: {
        name: `${session?.data?.user?.name}`,
        color: "#77BA99",
      },
    }),
    //FontFamily, ------------------------------------------------------------ Commented Out - J

    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    //TextStyle.configure({ types: [ListItem.name] }),

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
  ];

  const [editorContent, setEditorContent] = React.useState<any>("");

  const UpdateBoard = useDebouncedCallback(async (content: any) => {
    let updatedBoard = await updateDoc(props.id, content);
  }, 100);

  //const { editor } = useCurrentEditor();

  // Connect to your Collaboration server
  useEffect(() => {
    const fetchData = async () => {
      let jwt = await genJWT();
      const provider = new TiptapCollabProvider({
        name: `${props.name + "-" + props.id}`, // Unique document identifier for syncing. This is your document name.
        appId: process.env.NEXT_PUBLIC_APPID || "", // Your Cloud Dashboard AppID or `baseURL` for on-premises
        token: jwt,
        document: doc,
        preserveConnection: true,

        // The onSynced callback ensures initial content is set only once using editor.setContent(), preventing repetitive content loading on editor syncs.
        onSynced(editor: any) {
          setEditorContent(props.content);
        },
      });
    };

    fetchData(); // Call the async function
  }, []);

  const MenuBar = (props: any) => {
    let editor = props.editor;
    if (!editor) {
      return null;
    }

    return (
      <>
        <div>{props.name}</div>
        <ButtonGroup>
          <Button
            color="secondary"
            variant="ghost"
            onPress={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            <FormatItalicIcon></FormatItalicIcon>
          </Button>
          <Button
            color="secondary"
            variant="ghost"
            onPress={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <FormatBoldIcon></FormatBoldIcon>
          </Button>
          <Button
            color="secondary"
            variant="ghost"
            onPress={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            <StrikethroughSIcon></StrikethroughSIcon>
          </Button>
          <Button
            color="secondary"
            variant="ghost"
            onPress={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "is-active" : ""}
          >
            <CodeIcon></CodeIcon>
          </Button>
          <Button
            color="secondary"
            variant="ghost"
            onPress={() => editor.chain().focus().unsetAllMarks().run()}
          >
            <ClearAllIcon></ClearAllIcon>
          </Button>
          <Button
            color="secondary"
            variant="ghost"
            onPress={() => editor.chain().focus().clearNodes().run()}
          >
            <FormatClearIcon></FormatClearIcon>
          </Button>

          <Button
            color="secondary"
            variant="ghost"
            onPress={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            <FormatListBulletedIcon></FormatListBulletedIcon>
          </Button>
          <Button
            color="secondary"
            variant="ghost"
            onPress={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            <FormatListNumberedIcon></FormatListNumberedIcon>
          </Button>
          <Button
            color="secondary"
            variant="ghost"
            onPress={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "is-active" : ""}
          >
            <FormatQuoteIcon></FormatQuoteIcon>
          </Button>
          <Button
            color="secondary"
            variant="ghost"
            onPress={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <UndoIcon></UndoIcon>
          </Button>
          <Button
            color="secondary"
            variant="ghost"
            onPress={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <RedoIcon></RedoIcon>
          </Button>
          <Button color="secondary" variant="ghost">
            <ColorLensIcon></ColorLensIcon>
            <input
              type="color"
              onInput={(event) => {
                const input = event.target as HTMLInputElement;
                editor.chain().focus().setColor(input.value).run();
              }}
              value={editor.getAttributes("textStyle").color}
              data-testid="setColor"
            />
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button color="secondary" variant="bordered">
            Size:
          </Button>
          <Button
            color="secondary"
            variant="ghost"
            onPress={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={
              editor.isActive("heading", { level: 4 }) ? "is-active" : ""
            }
          >
            1
          </Button>
          <Button
            color="secondary"
            variant="ghost"
            onPress={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
          >
            2
          </Button>
          <Button
            color="secondary"
            variant="ghost"
            onPress={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            3
          </Button>
          <Button
            color="secondary"
            variant="ghost"
            onPress={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            4
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <button
            onClick={() => editor.chain().focus().setFontFamily("Inter").run()}
            className={
              editor.isActive("textStyle", { fontFamily: "Inter" })
                ? "is-active"
                : ""
            }
            data-test-id="inter"
          >
            Inter
          </button>
          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .setFontFamily('"Comic Sans MS", "Comic Sans"')
                .run()
            }
            className={
              editor.isActive("textStyle", {
                fontFamily: '"Comic Sans MS", "Comic Sans"',
              })
                ? "is-active"
                : ""
            }
            data-test-id="comic-sans"
          >
            Comic Sans
          </button>
          <button
            onClick={() => editor.chain().focus().setFontFamily("serif").run()}
            className={
              editor.isActive("textStyle", { fontFamily: "serif" })
                ? "is-active"
                : ""
            }
            data-test-id="serif"
          >
            Serif
          </button>
          <button
            onClick={() =>
              editor.chain().focus().setFontFamily("monospace").run()
            }
            className={
              editor.isActive("textStyle", { fontFamily: "monospace" })
                ? "is-active"
                : ""
            }
            data-test-id="monospace"
          >
            Monospace
          </button>
          <button
            onClick={() =>
              editor.chain().focus().setFontFamily("cursive").run()
            }
            className={
              editor.isActive("textStyle", { fontFamily: "cursive" })
                ? "is-active"
                : ""
            }
            data-test-id="cursive"
          >
            Cursive
          </button>
          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .setFontFamily("var(--title-font-family)")
                .run()
            }
            className={
              editor.isActive("textStyle", {
                fontFamily: "var(--title-font-family)",
              })
                ? "is-active"
                : ""
            }
            data-test-id="css-variable"
          >
            CSS variable
          </button>
          <button
            onClick={() =>
              editor.chain().focus().setFontFamily('"Exo 2"').run()
            }
            className={
              editor.isActive("textStyle", { fontFamily: '"Exo 2"' })
                ? "is-active"
                : ""
            }
            data-test-id="exo2"
          >
            Exo 2
          </button>
        </ButtonGroup>
      </>
    );
  };

  const { editor } = useCurrentEditor();

  return (
    <>
      <EditorProvider
        immediatelyRender
        editorProps={editorProps}
        extensions={extensions}
        slotBefore={<MenuBar name={props.name} editor={editor} />}
        content={editorContent}
        editorContainerProps={{
          className: "bg-neutral-900 rounded-md py-5 ",
        }}
        onUpdate={({ editor }) => {
          UpdateBoard(editor.getHTML());
          setEditorContent(editor.getHTML());
        }}
      ></EditorProvider>
    </>
  );
};
