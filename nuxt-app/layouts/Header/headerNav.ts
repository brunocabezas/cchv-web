import { defineComponent, computed } from "@nuxtjs/composition-api";
import usePrograms from "@/models/usePrograms";
import { addPagesToProgramsNavigationMenu } from "@/utils/headerUtils";
import { NavigationMenu } from "@/types";
import useMediaQueries from "@/hooks/useMediaQueries";

export default defineComponent({
  name: "HeaderNav",
  setup() {
    const { programs } = usePrograms()
    const { onBigScreen } = useMediaQueries();
    // //  Map programs from usePograms() to navigation menu
    const navigationMenu = computed<NavigationMenu[]>(() => {
      return programs.value.length > 0
        ? addPagesToProgramsNavigationMenu(programs.value, onBigScreen.value)
        : [];
    });

    return {
      navigationMenu
    };
  }
});
