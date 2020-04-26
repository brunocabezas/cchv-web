
export enum AboutPages {
  TeamPage,
  TransparencyPage
}

export interface Page {
  label: string,
  url: string,
}

export type Pages = Page[]
