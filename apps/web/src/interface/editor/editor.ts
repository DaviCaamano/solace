export interface Editor {
  id?: string;
  content: string;
  title: string;
  stale?: boolean;
}

export enum ColorBoard {
  text = 'text',
  highlight = 'highlight',
  none = 'none',
}
