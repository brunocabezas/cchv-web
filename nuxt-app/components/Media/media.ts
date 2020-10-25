import { defineComponent, PropType, ref, computed } from "@nuxtjs/composition-api"
import Loader from "@/components/Loader.vue"
import ProgressiveImage from "@/components/ProgressiveImage.vue"
import Icon from "vue-awesome/components/Icon.vue"
import { WpImage } from "@/types/wordpressTypes"
import { getIdFromUrl } from "vue-youtube"
import useCarousel from "@/hooks/useCarousel"
import useMediaQueries from "@/hooks/useMediaQueries"
import { MEDIA_MOBILE_HEIGHT } from "@/utils/constants"
import { Carousel, Slide } from '@jambonn/vue-concise-carousel';
import '@jambonn/vue-concise-carousel/dist/vue-concise-carousel.css'

type LightBoxItem = {
  src: string
  thumb: string
}

const Media = defineComponent({
  name: "Media",
  props: {
    gallery: {
      type: Array as PropType<WpImage[]>,
      required: false,
      default: () => [],
    },
    youtubeUrl: {
      type: String,
      default: "",
      required: false,
    },
    height: {
      type: String,
      default: "400px",
      required: false,
    },
    hideLightBox: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  components: {
    VueCarousel: Carousel,
    Loader,
    Slide,
    ProgressiveImage,
    "v-icon": Icon,
  },
  setup(props) {
    const { onBigScreen } = useMediaQueries()
    // Ref used to open lightbox
    const lightBoxRef = ref<any>(null)
    const lightBoxData = computed<LightBoxItem[]>(() =>
      props.gallery.map((img) => ({ src: img.url, thumb: img.url }))
    )
    // If video is available, include in count of carousel length
    const carouselLength = computed<number>(
      () => props.gallery.length + (!!props.youtubeUrl ? 1 : 0)
    )
    const {
      goToNextSlide,
      activeSlide: currentImage,
      goToPrevSlide,
    } = useCarousel(carouselLength)

    const youtubeVideoId = computed<string>(() =>
      props.youtubeUrl.length ? getIdFromUrl(props.youtubeUrl) : ""
    )

    const mediaHeight = computed(() => {
      return onBigScreen.value ? props.height : MEDIA_MOBILE_HEIGHT
    })

    function openLightBox(index: number) {
      lightBoxRef.value.showImage(index)
    }
    
    return {
      youtubeVideoId,
      // Carousel state
      currentImage,
      goToPrevItem: goToPrevSlide,
      goToNextItem: goToNextSlide,
      carouselLength,
      // Lightbox for images
      lightBoxData,
      lightBoxRef,
      openLightBox,
      mediaHeight,
      onBigScreen,
    }
  },
})

export default Media
