import { defineComponent, PropType, ref, computed } from "@vue/composition-api"
import { Carousel as VueCarousel, Slide } from "vue-carousel"
import LightBox from "vue-image-lightbox"
import Loader from "@/components/Loader.vue"
import ProgressiveImage from "@/components/ProgressiveImage.vue"
import Icon from "vue-awesome/components/Icon.vue"
import { WpImage } from "@/types/wordpressTypes"

const MediaCarousel = defineComponent({
  name: "MediaCarousel",
  props: {
    images: {
      type: Array as PropType<WpImage[]>,
      required: true,
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
    const lightBoxRef = ref<any>(null)
    const lightBoxData = computed(() => {
      if (!props.images) return []
      return props.images.map((img) => ({ src: img.url, thumb: img.url }))
    })

    function goToNextItem(): void {
      if (currentImage.value === props.images.length - 1) {
        currentImage.value = 0
      } else {
        currentImage.value = currentImage.value + 1
      }
    }

    function goToPrevItem(): void {
      if (currentImage.value === 0) {
        currentImage.value = props.images.length - 1
      } else {
        currentImage.value = currentImage.value - 1
      }
    }

    function openLightBox(index: number) {
      lightBoxRef.value.showImage(index)
    }

    return {
      currentImage,
      openLightBox,
      goToPrevItem,
      goToNextItem,
      lightBoxData,
      lightBoxRef,
    }
  },
})

export default MediaCarousel
