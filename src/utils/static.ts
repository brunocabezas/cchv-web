import AppUrls from './urls';

// SOCIAL NETWORKS
export interface SocialNetwork { 
  url: string;
  label: string;
};

export const SOCIAL_NETWORKS : SocialNetwork[] = [
  { url: '', label: 'Facebook' },
  { url: '', label: 'Instagram' },
  { url: '', label: 'YouTube' },
]


// LAYOUT
export enum AboutPages {
  TeamPage,
  TransparencyPage
}

export interface SubPage {
  label: string,
  url: AppUrls, 
}

export interface Page {
  label: string,
  url: AppUrls, 
  pages?: SubPage[]
}

export type Pages = Page[]

// Defines the order of appeareance
// Uses types from app urls
const AboutPage: Page = {
  url: AppUrls.About,
  label: "Quienes Somos",
  pages: [
    {url: AppUrls.AboutTeam, label: 'Equipo'},
    {url: AppUrls.AboutTransparency, label: 'Transparencia'}
  ]
};
const ProgramsPage: Page = { url: AppUrls.Programs, label: "Programas" };
const TVPage: Page = { url: AppUrls.Media, label: "CCHV TV" };
export const NAVIGATION_MENU: Page[] = [AboutPage, ProgramsPage, TVPage];

// SOCIAL NETWORKS
export interface SocialNetwork { 
  url: string;
  label: string;
};
