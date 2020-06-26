import { defineComponent, ref } from "@vue/composition-api"
import { Carousel as VueCarousel, Slide } from "vue-carousel"
import Icon from "vue-awesome/components/Icon.vue"
import Loader from "@/components/Loader.vue"
import ProgressiveImage from "@/components/ProgressiveImage.vue"
import useCarouselImages from "@/factories/useCarouselImages"
import { getIdFromUrl as getYoutubeIdFromUrl } from "vue-youtube"

const HomeCarousel = defineComponent({
  name: "HomeCarousel",
  components: { Loader, VueCarousel, ProgressiveImage, Slide, "v-icon": Icon },
  setup() {
    const activeImg = ref(0)
    const { carousel, fetchCarouselImages, isLoading } = useCarouselImages()

    fetchCarouselImages()

    function goToNextImg() {
      if (activeImg.value === carousel.value.length - 1) {
        activeImg.value = 0
      } else {
        activeImg.value = activeImg.value + 1
      }
    }

    function goToPrevImg() {
      if (activeImg.value === 0) {
        activeImg.value = carousel.value.length - 1
      } else {
        activeImg.value = activeImg.value - 1
      }
    }

    return {
      isLoading,
      carousel,
      activeImg,
      getYoutubeIdFromUrl,
      goToNextImg,
      goToPrevImg,
    }
  },
})
export default HomeCarousel
