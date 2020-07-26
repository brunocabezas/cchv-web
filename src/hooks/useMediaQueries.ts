import { ref, Ref, watch, computed, reactive } from "@vue/composition-api"
import useWindowSize from "./useWindowsSize"

export enum Viewport {
  SM,
  MD,
  LG,
}

interface ViewportSize {
  name: Viewport
  size: number
}

const SM: ViewportSize = {
  name: Viewport.SM,
  size: 500,
}

const MD: ViewportSize = {
  name: Viewport.MD,
  size: 800,
}
const LG: ViewportSize = {
  name: Viewport.LG,
  // as $boxed_content_max_width
  size: 1280,
}

const getViewportSizeByWidth = (width: number) => {
  if (width >= LG.size) {
    return LG
  } else if (width <= SM.size) {
    return SM
  } else {
    return MD
  }
}

// recieves tabs with reference
export default function useMediaQueries() {
  const { width } = useWindowSize()
  const viewport = computed<Viewport>(() => {
    console.log(width.value, getViewportSizeByWidth(width.value).name)
    return getViewportSizeByWidth(width.value).name
  })
  const onSmallScreen = computed<boolean>(() => viewport.value === Viewport.SM)
  const onMediumScreen = computed<boolean>(() => viewport.value === Viewport.MD)
  const onBigScreen = computed<boolean>(() => viewport.value === Viewport.LG)

  return {
    viewport,
    onSmallScreen,
    onBigScreen,
    onMediumScreen,
  }
}
