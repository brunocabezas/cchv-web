import { defineComponent, computed, reactive } from "@vue/composition-api"
import usePrograms from "@/factories/usePrograms"
import {
  mapNavMenuToHoverState,
  addPagesToProgramsNavigationMenu,
  menuHoverState,
} from "@/utils/headerUtils"
import { NavigationMenu } from "@/types"

export default defineComponent({
  name: "HeaderNav",
  setup() {
    const { fetchPrograms, programs } = usePrograms()
    // //  Map programs from usePograms() to navigation menu
    const navigationMenu = computed<NavigationMenu[]>(() =>
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
