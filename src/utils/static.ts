import Urls from "./urls"
import { NavigationMenu, NavMenu } from "@/types"

export const DOMAIN = "cchv.cl"
export const DEFAULT_TITLE = "CChV"
export const MAIN_COLOR = "#344284"
export const DARKER_MAIN_COLOR = "#1a2142"
// Date format from https://github.com/iamkun/dayjs
export const DATE_FORMAT = "DD [de] MMMM, YYYY"
export const CUSTOM_FIELDS_DATE_FORMAT = "DD/MM/YYYY"
export const CONTACT_EMAIL = "contacto@cchv.cl"
// A specific sponsor is bigger than others; this is due it's category
export const BIG_SPONSOR_CATEGORY_LABEL = "Financia"
export const YOUTUBE_CHANNEL =
  "https://www.youtube.com/channel/UC3aHIBlFx2pWVt1_tvnibCw/videos"
export const NEWSLETTER_SUSCRIBE_URL =
  "https://bienaldeartesmediales.us11.list-manage.com/subscribe/post?u=21121cf28dc5ae821ecbf30c9&amp;id=4459a2b85e"
export const DEFAULT_ORDER = 0

// Defines the order of appeareance
// Uses types from app urls
const AboutPage: NavigationMenu = {
  id: NavMenu.About,
  label: "Somos",
  pages: [
    { id: Urls.AboutHistory, url: Urls.AboutHistory, label: "Historia" },
    { id: Urls.AboutTeam, url: Urls.AboutTeam, label: "Equipo" },
    {
      id: Urls.AboutTransparency,
      url: Urls.AboutTransparency,
      label: "Transparencia",
    },
  ],
}
const ProgramsPage: NavigationMenu = {
  id: NavMenu.Programs,
  label: "Programas",
  // Program pages will get filled with API pages that are external
  pages: [
    {
      id: Urls.DowneyProgram,
      url: Urls.DowneyProgram,
      label: "Concurso Internacional Juan Downey",
    },
    {
      id: Urls.SchoolPrograms,
      url: Urls.SchoolPrograms,
      label: "Escuela de la intuición",
    },
    {
      id: Urls.MagneticFieldsProgram,
      url: Urls.MagneticFieldsProgram,
      label: "Campos Magnéticos",
    },
  ],
}

const NewsPage: NavigationMenu = {
  id: NavMenu.News,
  url: Urls.News,
  label: "Noticias",
}

export const NAVIGATION_MENU: NavigationMenu[] = [
  AboutPage,
  ProgramsPage,
  NewsPage,
]
