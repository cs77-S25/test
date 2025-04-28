import CodeBlock from "@tiptap/extension-code-block";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";

import "@tiptap/core";

import FontFamily from "@tiptap/extension-font-family"; //fonts are not working -----------------------Commented out - J

export const extensions = [
  FontFamily,
  TextStyle,
  Underline,
  //FontFamily, ------------------------------------------------------------ Commented Out - J
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
