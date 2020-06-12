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

export enum NavMenu {
  About,
  Programs,
  News,
}

export interface NavigationMenu {
  label: string
  url?: AppUrls
  id: NavMenu
  pages?: SubPage[]
  is_external?: boolean
}
