import { NAVIGATION_MENU } from "./navigationMenu"
import { Program } from "@/types"
import { Ref } from "@vue/composition-api"
import { NavMenu } from "@/types"
import { ProgramKeys } from "@/types/customFieldsKeysTypes"

export interface menuHoverState {
  [menuLabel: string]: Ref<boolean>
}

// Adds pages from api that has is_external as true
export const addPagesToProgramsNavigationMenu = (
  programs: readonly Program[]
) =>
  NAVIGATION_MENU.map((navMenu) => {
    // If menu is programs, define pages with programs
    if (navMenu.id === NavMenu.Programs) {
      const externalProgramsFromAPI = programs.map((p) => ({
        is_external: p.is_external,
        label: p.name,
        url: p[ProgramKeys.url],
      }))
      return Object.assign({}, navMenu, {
        // Draw programs navigation menu using programs from usePrograms()
        pages: externalProgramsFromAPI,
      })
    }
    return navMenu
  })
