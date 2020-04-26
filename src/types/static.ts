 

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

export interface Page {
  label: string,
  url: string,
}

export type Pages = Page[]

const AboutPage: Page = { url: "", label: "about" };
const ProgramsPage: Page = { url: "", label: "programs" };
const CCHVTVPage: Page = { url: "", label: "TV" };
// Defines the order of appeareance
export const NAVIGATION_MENU: Page[] = [AboutPage, ProgramsPage, CCHVTVPage];
