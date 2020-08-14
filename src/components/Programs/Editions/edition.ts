import { defineComponent, ref } from "@vue/composition-api"
import CollapseTransition from "@ivanv/vue-collapse-transition"
import Media from "@/components/Media/Media.vue"
import { MAIN_COLOR } from "@/utils/static"
import Icon from "vue-awesome/components/Icon.vue"
import useMediaQueries from "@/hooks/useMediaQueries"

const Edition = defineComponent({
  name: "Edition",
  components: {
    Media,
    "v-icon": Icon,
    "collapse-transition": CollapseTransition,
  },
  props: { 
    edition: Object
  },
  setup() {
    const isOpen = ref(false)
    const { onBigScreen } = useMediaQueries()

    function toggleIsOpen() {
      isOpen.value = !isOpen.value
    }
    return {
      isOpen,
      toggleIsOpen,
      MAIN_COLOR,
      onBigScreen,
    }
  },
})

export default Edition
