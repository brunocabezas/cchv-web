import { defineComponent, computed, ref } from "@vue/composition-api"
import { Carousel, Slide } from "vue-carousel"
import Icon from "vue-awesome/components/Icon.vue"
import useVideos from "@/models/useVideos"
import Loader from "@/components/Loader.vue"
import { YOUTUBE_CHANNEL_LABEL } from "@/utils/static"
import useCarousel from "@/hooks/useCarousel"
import { getIdFromUrl as getYoutubeIdFromUrl } from "vue-youtube"

const HomeVideosCarousel = defineComponent({
  name: "HomeVideosCarousel",
  components: { Loader, Slide, Carousel, "v-icon": Icon },
  setup() {
    const { videos, fetchVideos, isLoading } = useVideos()
    const carouselLength = computed<number>(() => videos.value.length)
    const {
      goToNextSlide,
      activeSlide: activeVideo,
      goToPrevSlide,
    } = useCarousel(carouselLength)

    fetchVideos()

    return {
      goToNextSlide,
      goToPrevSlide,
      activeVideo,
      videos,
      isLoading,
      getYoutubeIdFromUrl,
      YOUTUBE_CHANNEL_LABEL,
    }
  },
})
export default HomeVideosCarousel
