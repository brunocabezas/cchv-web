import { NAVIGATION_MENU } from "./static"
import { Program } from "@/types/viewTypes"
import { ref, Ref } from "@vue/composition-api"
import { NavigationMenu, NavMenu } from "@/types"

export interface menuHoverState {
  [menuLabel: string]: Ref<boolean>
}

// allows to manage hover state on headerNav
export const mapNavMenuToHoverState = (
  navMenu: readonly NavigationMenu[]
): menuHoverState =>
  navMenu.reduce(
    (acc, m) =>
      m.pages && m.pages.length > 0
        ? Object.assign({}, acc, { [m.label]: ref(false) })
        : acc,
    {}
  )

// Adds pages from api that has is_external as true
export const addPagesToProgramsNavigationMenu = (
  programs: readonly Program[]
) =>
  NAVIGATION_MENU.map((navMenu) => {
    // If menu is programs, define pages with usePrograms()
    if (navMenu.id === NavMenu.Programs) {
      const externalProgramsFromAPI = programs
        // Only getting external
        .filter((p) => p.is_external)
        .map((p) => ({
          is_external: true,
          label: p.name,
          url: p.url,
        }))
      return Object.assign({}, navMenu, {
        // Draw programs navigation menu using programs from usePrograms()
        pages: [...externalProgramsFromAPI, ...(navMenu.pages || [])],
      })
    }
    return navMenu
  })
