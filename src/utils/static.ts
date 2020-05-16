import AppUrls from "./urls"
import { Page } from "@/types"

// Date format from https://github.com/iamkun/dayjs
export const DATE_FORMAT = "DD [de] MMMM, YYYY"
export const CONTACT_EMAIL = "info@cchv.cl"
export const YOUTUBE_CHANNEL =
  "https://www.youtube.com/channel/UC3aHIBlFx2pWVt1_tvnibCw/videos"
export const NEWSLETTER_SUBSCRIBE_URL =
  "https://bienaldeartesmediales.us11.list-manage.com/subscribe/post?u=21121cf28dc5ae821ecbf30c9&amp;id=4459a2b85e"

// Defines the order of appeareance
// Uses types from app urls
const AboutPage: Page = {
  url: AppUrls.About,
  label: "Quienes Somos",
  pages: [
    { url: AppUrls.AboutTeam, label: "Equipo" },
    { url: AppUrls.AboutTransparency, label: "Transparencia" },
  ],
}
const ProgramsPage: Page = { url: AppUrls.Programs, label: "Programas" }

// const TVPage: Page = { url: AppUrls., label: "CCHV TV" }
export const NAVIGATION_MENU: Page[] = [AboutPage, ProgramsPage]
