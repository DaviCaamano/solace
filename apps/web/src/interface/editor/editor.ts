export interface Editor {
  content: string;
  title: string;
  id?: string;
}

export enum ColorBoard {
  text = 'text',
  highlight = 'highlight',
  none = 'none',
}
