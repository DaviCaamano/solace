export interface Editor {
  id?: string;
  content: string;
  title: string;
}

export enum ColorBoard {
  text = 'text',
  highlight = 'highlight',
  none = 'none',
}
