"use client";
import "@/styles/tiptap.css";

import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";

import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import {
  Editor,
  EditorContent,
  EditorProvider,
  useCurrentEditor,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import React, { useEffect } from "react";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { updateDoc } from "@/app/actions/actions";
import { useDebouncedCallback } from "use-debounce";

export default (props: any) => {
  const [editorContent, setEditorContent] = React.useState("");

  const editorProps = {
    attributes: {
      class:
        "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none h-[50vh] overflow-y-scroll",
    },
  };

  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    //@ts-ignore
    TextStyle.configure({ types: [ListItem.name] }),
    Highlight.configure({
      multicolor: true,
    }),
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

  const MenuBar = () => {
    const { editor } = useCurrentEditor();
    if (!editor) {
      return null;
    }
    return (
      <div className="control-group">
        <div className="button-group">
          <Button
            onPress={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            Bold
          </Button>
          <Button
            onPress={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            Italic
          </Button>
          <Button
            onPress={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            Strike
          </Button>
          <Button
            onPress={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "is-active" : ""}
          >
            Code
          </Button>
          <Button onPress={() => editor.chain().focus().unsetAllMarks().run()}>
            Clear marks
          </Button>
          <Button onPress={() => editor.chain().focus().clearNodes().run()}>
            Clear nodes
          </Button>
          <Button
            onPress={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive("paragraph") ? "is-active" : ""}
          >
            Paragraph
          </Button>
          <Button
            onPress={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            H1
          </Button>
          <Button
            onPress={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            H2
          </Button>
          <Button
            onPress={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
          >
            H3
          </Button>
          <Button
            onPress={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={
              editor.isActive("heading", { level: 4 }) ? "is-active" : ""
            }
          >
            H4
          </Button>
          <Button
            onPress={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={
              editor.isActive("heading", { level: 5 }) ? "is-active" : ""
            }
          >
            H5
          </Button>
          <Button
            onPress={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
            className={
              editor.isActive("heading", { level: 6 }) ? "is-active" : ""
            }
          >
            H6
          </Button>
          <Button
            onPress={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            Bullet list
          </Button>
          <Button
            onPress={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            Ordered list
          </Button>
          <Button
            onPress={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "is-active" : ""}
          >
            Code block
          </Button>
          <Button
            onPress={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "is-active" : ""}
          >
            Blockquote
          </Button>
          <Button
            onPress={() => editor.chain().focus().setHorizontalRule().run()}
          >
            Horizontal rule
          </Button>
          <Button onPress={() => editor.chain().focus().setHardBreak().run()}>
            Hard break
          </Button>
          <Button
            onPress={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            Undo
          </Button>
          <Button
            onPress={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            Redo
          </Button>
          <Button
            onPress={() => editor.chain().focus().setColor("#958DF1").run()}
            className={
              editor.isActive("textStyle", { color: "#958DF1" })
                ? "is-active"
                : ""
            }
          >
            Purple
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive("highlight") ? "is-active" : ""}
          >
            Toggle highlight
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHighlight({ color: "#ffc078" }).run()
            }
            className={
              editor.isActive("highlight", { color: "#ffc078" })
                ? "is-active"
                : ""
            }
          >
            Orange
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHighlight({ color: "#8ce99a" }).run()
            }
            className={
              editor.isActive("highlight", { color: "#8ce99a" })
                ? "is-active"
                : ""
            }
          >
            Green
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHighlight({ color: "#74c0fc" }).run()
            }
            className={
              editor.isActive("highlight", { color: "#74c0fc" })
                ? "is-active"
                : ""
            }
          >
            Blue
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHighlight({ color: "#b197fc" }).run()
            }
            className={
              editor.isActive("highlight", { color: "#b197fc" })
                ? "is-active"
                : ""
            }
          >
            Purple
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHighlight({ color: "red" }).run()
            }
            className={
              editor.isActive("highlight", { color: "red" }) ? "is-active" : ""
            }
          >
            Red ('red')
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHighlight({ color: "#ffa8a8" }).run()
            }
            className={
              editor.isActive("highlight", { color: "#ffa8a8" })
                ? "is-active"
                : ""
            }
          >
            Red (#ffa8a8)
          </Button>
          <Button
            onClick={() => editor.chain().focus().unsetHighlight().run()}
            disabled={!editor.isActive("highlight")}
          >
            Unset highlight
          </Button>
        </div>
      </div>
    );
  };

  const UpdateBoard = useDebouncedCallback(async (content: any) => {
    let updatedBoard = await updateDoc(props.id, content);
    console.log(updatedBoard);
  }, 100);

  useEffect(() => {
    console.log(editorContent);
  }, []);

  return (
    <Card>
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        editorProps={editorProps}
        content={props.content}
        onUpdate={({ editor }) => {
          UpdateBoard(editor.getHTML());
          setEditorContent(editor.getHTML());
        }}
      ></EditorProvider>
    </Card>
  );
};

//https://tiptap.dev/docs/hocuspocus/guides/collaborative-editing
