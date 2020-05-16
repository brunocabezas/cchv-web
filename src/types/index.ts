import AppUrls from "@/utils/urls"

// LAYOUT
export enum AboutPages {
  TeamPage,
  TransparencyPage,
}

export interface SubPage {
  label: string
  url: AppUrls
}

export interface Page {
  label: string
  url: AppUrls
  pages?: SubPage[]
}

export type Pages = Page[]
