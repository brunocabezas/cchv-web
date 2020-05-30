import { defineComponent, computed, reactive } from "@vue/composition-api"
import usePrograms from "@/factories/usePrograms"
import { Page } from "@/types"
import {
  mapNavMenuToHoverState,
  addPagesToProgramsNavigationMenu,
  menuHoverState,
} from "@/utils/headerUtils"

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
