import { ref, Ref, computed } from "@nuxtjs/composition-api"
import useMediaQueries from './useMediaQueries'

export type Tabs = Tab[]
export type Tab = {
  title: string
  id: number
}

// carouselLength as computed
export default function useCarousel(carouselLength: Ref<Readonly<number>>) {
  
  const { onBigScreen } = useMediaQueries()
  const activeSlide = ref(0)

  function goToNextSlide() {
    if (activeSlide.value === carouselLength.value - 1) {
      activeSlide.value = 0
    } else {
      activeSlide.value = activeSlide.value + 1
    }
  }

  function goToPrevSlide() {
    if (activeSlide.value === 0) {
      activeSlide.value = carouselLength.value - 1
    } else {
      activeSlide.value = activeSlide.value - 1
    }
  }

  const isOnFirstSlide = computed(() => activeSlide.value === 0)
  const isOnLastSlide = computed(
    () => activeSlide.value + 1 === carouselLength.value
  )

  const paginationSize = computed(() => (onBigScreen.value ? 10 : 7))

  return {
    activeSlide,
    isOnFirstSlide,
    isOnLastSlide,
    goToNextSlide,
    goToPrevSlide,
    paginationSize,
  }
}
