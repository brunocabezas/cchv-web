import { computed } from "@nuxtjs/composition-api"
import useWindowSize from "~/plugins/useWindowsSize.client"

export enum Viewport {
  SM = 550,
  MD = 750,
  LG = 1280,
}

// interface ViewportSize {
//   name: Viewport
//   size: number
// }

// const SM: ViewportSize = {
//   name: Viewport.SM,
//   size: 550,
// }

// const MD: ViewportSize = {
//   name: Viewport.MD,
//   size: 750,
// }
// const LG: ViewportSize = {
//   name: Viewport.LG,
//   // as $boxed_content_max_width
//   size: 1280,
// }

const getViewportSizeByWidth = (width: number): Viewport => {
  if (width >= Viewport.LG) {
    return Viewport.LG
  } else if (width <= Viewport.SM) {
    return Viewport.SM
  } else {
    return Viewport.MD
  }
}

export default function useMediaQueries() {
  const { width } = useWindowSize()
  // const viewport = computed<Viewport>(() => getViewportSizeByWidth(width.value))
  const onSmallScreen = computed<boolean>(() => width.value <= Viewport.SM)
  const onMediumScreen = computed<boolean>(
    () => width.value < Viewport.MD && width.value > Viewport.SM
  )
  const onBigScreen = computed<boolean>(
    () => width.value >= Viewport.LG || width.value >= Viewport.MD
  )
  const onScreenBiggerThanSmall = computed<boolean>(() => {
    console.log(width.value)
    console.log(onBigScreen.value || onMediumScreen.value)
    return onBigScreen.value || onMediumScreen.value
  })

  return {
    // viewport,
    onSmallScreen,
    onBigScreen,
    onMediumScreen,
    onScreenBiggerThanSmall,
  }
}
