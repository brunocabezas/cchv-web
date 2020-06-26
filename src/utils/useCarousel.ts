import { ref } from "@vue/composition-api"

export type Tabs = Tab[]
export type Tab = {
  title: string
  id: number
}

// recieves tabs with reference
export default function useCarousel(carouselLength: number) {
  const activeSlide = ref(0)

  function goToNextSlide() {
    if (activeSlide.value === carouselLength - 1) {
      activeSlide.value = 0
    } else {
      activeSlide.value = activeSlide.value + 1
    }
  }

  function goToPrevSlide() {
    if (activeSlide.value === 0) {
      activeSlide.value = carouselLength - 1
    } else {
      activeSlide.value = activeSlide.value - 1
    }
  }

  return {
    activeSlide,
    goToNextSlide,
    goToPrevSlide,
  }
}
