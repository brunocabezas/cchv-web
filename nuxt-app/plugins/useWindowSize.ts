import { ref, computed } from "@nuxtjs/composition-api";
import { Viewport } from "~/hooks/useMediaQueries";

export default function useWindowSize() {
  const isOnBrowser = process.client;
  if (isOnBrowser) {
    const width = ref(window.innerWidth);
    const height = ref(window.innerHeight);
    const update = () => {
      if (isOnBrowser) {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
      }
    };

    const widthPixel = computed(() => `${width.value}px`);
    const heightPixel = computed(() => `${height.value}px`);

    window.addEventListener("resize", update);

    return { width, height, widthPixel, heightPixel };
  } else {
    return {
      width: ref(Viewport.LG),
      height: ref(0),
      widthPixel: ref(0),
      heightPixel: ref(0)
    };
  }
}
