import { Editor as TipTapEditor, useEditor as useTipTapEditor } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Strike from '@tiptap/extension-strike';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Link from '@tiptap/extension-link';
import CharacterCount from '@tiptap/extension-character-count';

import styles from './tip-tap.module.scss';

Color.configure({
  types: ['textStyle'],
});

import Text from '@tiptap/extension-text';
import { useEditorContext } from '@hooks';

const characterLimit = 10000;
export const useTipTap = (): [TipTapEditor | null, number] => {
  const {
    editor: { content },
    setContent,
  } = useEditorContext();

  const editor: TipTapEditor | null = useTipTapEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Strike,
      Subscript,
      Superscript,
      Link.configure({
        protocols: ['ftp', 'mailto'],
        HTMLAttributes: {
          class: 'font-medium cursor-pointer',
        },
      }),
      CharacterCount.configure({
        limit: characterLimit,
      }),
    ],
    content,
    autofocus: true,
    editable: true,
    injectCSS: false,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: styles.editor,
      },
    },
  });

  return [editor, characterLimit];
};
