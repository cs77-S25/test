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
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import { Button, Card, CardBody, CardHeader, ButtonGroup } from "@heroui/react";
import { updateDoc } from "@/app/actions/actions";
import { useDebouncedCallback } from "use-debounce";

//Icons:
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import CodeIcon from "@mui/icons-material/Code";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import FormatClearIcon from "@mui/icons-material/FormatClear";
import FormatTextdirectionLToRIcon from "@mui/icons-material/FormatTextdirectionLToR";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

//Fonts:
//import FontFamily from '@tiptap/extension-font-family';
//import Document from '@tiptap/extension-document';
//import Paragraph from '@tiptap/extension-paragraph';
//import Text from '@tiptap/extension-text';

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  //TextStyle.configure({ types: [ListItem.name] }),

  StarterKit.configure({
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

const editorProps = {
  attributes: {
    class:
      "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none h-[65vh]  overflow-y-scroll",
  },
};

export default (props: any) => {
  const [editorContent, setEditorContent] = React.useState<any>("");

  const UpdateBoard = useDebouncedCallback(async (content: any) => {
    let updatedBoard = await updateDoc(props.id, content);
  }, 100);

  const MenuBar = (props: any) => {
    const { editor } = useCurrentEditor();

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
            onPress={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive("paragraph") ? "is-active" : ""}
          >
            <FormatTextdirectionLToRIcon></FormatTextdirectionLToRIcon>
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
          {/* <Button
                onPress={() => editor.chain().focus().setColor("#958DF1").run()}
                className={
                  editor.isActive("textStyle", { color: "#958DF1" })
                    ? "is-active"
                    : ""
                }
              >
                Purple
              </Button> */}
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
      </>
    );
  };

  useEffect(() => {}, []);

  return (
    <>
      <EditorProvider
        immediatelyRender
        editorProps={editorProps}
        extensions={extensions}
        slotBefore={<MenuBar name={props.name} />}
        content={props.content}
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
