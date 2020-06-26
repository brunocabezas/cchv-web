import { defineComponent } from "@vue/composition-api"
import { Carousel, Slide } from "vue-carousel"
import useVideos from "@/factories/useVideos"
import useCarousel from "@/utils/useCarousel"

const HomeVideosCarousel = defineComponent({
  name: "HomeVideosCarousel",
  components: { Slide, Carousel },
  setup() {
    const { videos, fetchVideos, isLoading } = useVideos()
    const {
      goToNextSlide,
      activeSlide: activeVideo,
      goToPrevSlide,
    } = useCarousel(videos.value.length)

    fetchVideos()

    return {
      goToNextSlide,
      goToPrevSlide,
      activeVideo,
      videos,
      isLoading,
    }
  },
})
export default HomeVideosCarousel
