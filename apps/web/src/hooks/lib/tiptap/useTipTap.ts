import { Editor as TipTapEditor, useEditor as useTipTapEditor } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';

Color.configure({
  types: ['textStyle'],
});

import Text from '@tiptap/extension-text';
import { useEditorContext } from '@hooks';
import styles from '@styles/editor/editor.module.scss';

export const useTipTap = () => {
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

  return editor;
};
