
import { NavigationMenu, NavMenu } from '@/types'
import Urls from './urls'

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

// Defines the order of appeareance
export const NAVIGATION_MENU: NavigationMenu[] = [
  AboutPage,
  ProgramsPage,
  NewsPage,
]
