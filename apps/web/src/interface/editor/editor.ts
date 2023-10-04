export interface Editor {
  content: string;
  title: string;
}

export enum SlateType {
  code = 'code',
  paragraph = 'paragraph',
}

export enum ColorBoard {
  text = 'text',
  highlight = 'highlight',
  none = 'none',
}
