import { defineComponent, PropType, ref, computed } from "@vue/composition-api"
import { Carousel as VueCarousel, Slide } from "vue-carousel"
import LightBox from "vue-image-lightbox"
import Loader from "@/components/Loader.vue"
import ProgressiveImage from "@/components/ProgressiveImage.vue"
import Icon from "vue-awesome/components/Icon.vue"
import { WpImage } from "@/types/wordpressTypes"
import { getIdFromUrl } from "vue-youtube"

type LightBoxItem = {
  src: string
  thumb: string
}

const Media = defineComponent({
  name: "Media",
  props: {
    gallery: {
      type: Array as PropType<WpImage[]>,
      required: true,
    },
    youtubeUrl: {
      type: String,
      default: "",
      required: false,
    },
    height: {
      type: String,
      default: "500px",
      required: false,
    },
  },
  components: {
    VueCarousel,
    LightBox,
    Loader,
    Slide,
    ProgressiveImage,
    "v-icon": Icon,
  },
  setup(props) {
    const currentImage = ref<number>(0)
    // Ref used to open lightbox
    const lightBoxRef = ref<any>(null)
    const lightBoxData = computed<LightBoxItem[]>(() =>
      props.gallery
        ? props.gallery.map((img) => ({ src: img.url, thumb: img.url }))
        : []
    )
    // If video is available, add to carousel data array
    const carouselLength =
      props.youtubeUrl.length > 0
        ? props.gallery.length + 1
        : props.gallery.length

    const youtubeVideoId = computed<string>(() =>
      props.youtubeUrl.length ? getIdFromUrl(props.youtubeUrl) : ""
    )

    function goToNextItem() {
      if (currentImage.value === carouselLength - 1) {
        currentImage.value = 0
      } else {
        currentImage.value = currentImage.value + 1
      }
    }

    function goToPrevItem() {
      if (currentImage.value === 0) {
        currentImage.value = carouselLength - 1
      } else {
        currentImage.value = currentImage.value - 1
      }
    }

    function openLightBox(index: number) {
      lightBoxRef.value.showImage(index)
    }

    return {
      youtubeVideoId,
      // Carousel state
      currentImage,
      goToPrevItem,
      goToNextItem,
      // Lightbox for images
      lightBoxData,
      lightBoxRef,
      openLightBox,
    }
  },
})

export default Media
