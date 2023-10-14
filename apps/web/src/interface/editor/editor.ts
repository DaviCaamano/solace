export interface Editor {
  id?: string;
  content: string;
  title: string;
  stale?: boolean;
  viewMode: EditorViewMode;
}

export enum EditorViewMode {
  preview = 'preview',
  editor = 'editor',
}
export enum ColorBoard {
  text = 'text',
  highlight = 'highlight',
  none = 'none',
}
