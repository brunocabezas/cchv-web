import { defineComponent, ref, computed } from "@vue/composition-api"
import { Carousel as VueCarousel, Slide } from "vue-carousel"
import Icon from "vue-awesome/components/Icon.vue"
import Loader from "@/components/Loader.vue"
import ProgressiveImage from "@/components/ProgressiveImage.vue"
import useCarouselImages from "@/models/useCarouselImages"
import { MAIN_COLOR } from "@/utils/static"
import { getIdFromUrl as getYoutubeIdFromUrl } from "vue-youtube"
import useCarousel from "@/hooks/useCarousel"
import useMediaQueries from "@/hooks/useMediaQueries"

const HomeCarousel = defineComponent({
  name: "HomeCarousel",
  components: { Loader, VueCarousel, ProgressiveImage, Slide, "v-icon": Icon },
  setup() {
    const { onBigScreen } = useMediaQueries()
    const { carousel, fetchCarouselImages, isLoading } = useCarouselImages()
    const { paginationSize } = useCarousel(ref(carousel.value.length))
    const carouselLength = computed<number>(() => carousel.value.length)

    fetchCarouselImages()

    const {
      goToNextSlide,
      activeSlide: activeImg,
      goToPrevSlide,
    } = useCarousel(carouselLength)

    return {
      isLoading,
      carousel,
      activeImg,
      iconScale: computed(() => (onBigScreen.value ? "1.5" : "0.8")),
      getYoutubeIdFromUrl,
      goToNextImg: goToNextSlide,
      goToPrevImg: goToPrevSlide,
      paginationSize,
      MAIN_COLOR,
    }
  },
})
export default HomeCarousel
