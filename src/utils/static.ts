import AppUrls from "./urls"
import { Page } from "@/types"

// Date format from https://github.com/iamkun/dayjs
export const MAIN_COLOR = "#344284"
export const DATE_FORMAT = "DD [de] MMMM, YYYY"
export const CONTACT_EMAIL = "info@cchv.cl"
export const YOUTUBE_CHANNEL =
  "https://www.youtube.com/channel/UC3aHIBlFx2pWVt1_tvnibCw/videos"
export const NEWSLETTER_SUBSCRIBE_URL =
  "https://bienaldeartesmediales.us11.list-manage.com/subscribe/post?u=21121cf28dc5ae821ecbf30c9&amp;id=4459a2b85e"

// Defines the order of appeareance
// Uses types from app urls
const AboutPage: Page = {
  id: AppUrls.About,
  url: AppUrls.About,
  label: "Somos",
  pages: [
    { id: AppUrls.AboutHistory, url: AppUrls.AboutHistory, label: "Historia" },
    { id: AppUrls.AboutTeam, url: AppUrls.AboutTeam, label: "Equipo" },
    {
      id: AppUrls.AboutTransparency,
      url: AppUrls.AboutTransparency,
      label: "Transparencia",
    },
  ],
}
const ProgramsPage: Page = {
  id: AppUrls.Programs,
  label: "Programas",
  // Program pages will get filled with API pages that are external
  pages: [
    {
      id: AppUrls.DowneyProgram,
      url: AppUrls.DowneyProgram,
      label: "Concurso Internacional Juan Downey",
    },
    {
      id: AppUrls.SchoolProgram,
      url: AppUrls.SchoolProgram,
      label: "Escuela de la intuición",
    },
    {
      id: AppUrls.MagneticFieldsProgram,
      url: AppUrls.MagneticFieldsProgram,
      label: "Campos Magnéticos",
    },
  ],
}

const NewsPage: Page = {
  id: AppUrls.News,
  url: AppUrls.News,
  label: "Noticias",
}

export const NAVIGATION_MENU: Page[] = [AboutPage, ProgramsPage, NewsPage]
