import {
  defineComponent,
  ref,
  computed,
  reactive,
  Ref,
} from "@vue/composition-api"
import { NAVIGATION_MENU } from "@/utils/static"
import usePrograms from "@/factories/usePrograms"
import AppUrls from "../../../utils/urls"
import { Page } from "../../../types"
import View from "@/types/viewTypes"

type menuHoverState = {
  [menuLabel: string]: Ref<boolean>
}

// TODO move to helpers
// create object with navMenu.label as keys and boolean values
// allows to manage hover state on headerNav
const mapNavMenuToHoverState = (navMenu: readonly Page[]): menuHoverState =>
  navMenu.reduce(
    (acc, m) =>
      m.pages && m.pages.length > 0
        ? Object.assign({}, acc, { [m.label]: ref(false) })
        : acc,
    {}
  )

// Adds pages from api that has is_external as true
const addPagesToProgramsNavigationMenu = (programs: readonly View.Program[]) =>
  NAVIGATION_MENU.map((navMenu) => {
    // If menu is programs, define pages with usePrograms()
    if (navMenu.id === AppUrls.Programs) {
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

export default defineComponent({
  name: "HeaderNav",
  setup() {
    const { fetchPrograms, programs } = usePrograms()
    // //  Map programs from usePograms() to navigation menu
    const navigationMenu = computed<Page[]>(() =>
      addPagesToProgramsNavigationMenu(programs.value)
    )

    const hoverState = reactive<menuHoverState>(
      mapNavMenuToHoverState(navigationMenu.value)
    )

    fetchPrograms()

    function onHover(menuLabel: string) {
      hoverState[menuLabel] = true
    }

    function onHoverLeave(menuLabel: string) {
      hoverState[menuLabel] = false
    }

    return {
      navigationMenu,
      hoverState,
      onHover,
      onHoverLeave,
    }
  },
})
