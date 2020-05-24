import AppUrls from "@/utils/urls"

// LAYOUT
export enum AboutPages {
  TeamPage,
  TransparencyPage,
}

export interface SubPage {
  label: string
  url: AppUrls
  id: AppUrls
}

export interface Page {
  label: string
  url?: AppUrls
  id: AppUrls
  pages?: SubPage[]
  is_external?: boolean
}

export type Pages = Page[]
