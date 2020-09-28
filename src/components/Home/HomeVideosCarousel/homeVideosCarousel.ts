import { defineComponent, computed, ref } from "@vue/composition-api"
import { Carousel, Slide } from "vue-carousel"
import Icon from "vue-awesome/components/Icon.vue"
import useVideos from "@/models/useVideos"
import Loader from "@/components/Loader.vue"
import { YOUTUBE_CHANNEL_LABEL, MAIN_COLOR } from "@/utils/constants"
import useCarousel from "@/hooks/useCarousel"
import { getIdFromUrl as getYoutubeIdFromUrl } from "vue-youtube"
import useMediaQueries from "@/hooks/useMediaQueries"

const HomeVideosCarousel = defineComponent({
  name: "HomeVideosCarousel",
  components: { Loader, Slide, Carousel, "v-icon": Icon },
  setup() {
    const { videos, fetchVideos, isLoading } = useVideos()
    const carouselLength = computed<number>(() => videos.value.length)
    const displayControls = ref(true)
    const {
      goToNextSlide,
      activeSlide: activeVideo,
      goToPrevSlide,
      paginationSize,
    } = useCarousel(carouselLength)
    const { onBigScreen } = useMediaQueries()

    fetchVideos()

    return {
      goToNextSlide,
      goToPrevSlide,
      activeVideo,
      videos,
      onPlay: () => {
        displayControls.value = false
      },
      onPause: () => {
        displayControls.value = true
      },
      onStop: () => {
        displayControls.value = true
      },
      displayControls,
      isLoading,
      getYoutubeIdFromUrl,
      iconScale: computed(() => (onBigScreen.value ? "1.5" : "0.8")),
      YOUTUBE_CHANNEL_LABEL,
      MAIN_COLOR,
      paginationSize,
    }
  },
})
export default HomeVideosCarousel
