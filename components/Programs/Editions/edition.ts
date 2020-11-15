import { defineComponent, ref, computed, PropType } from "@nuxtjs/composition-api"
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import Media from "@/components/Media/Media.vue"
import { MAIN_COLOR } from "@/utils/constants"
import Icon from "vue-awesome/components/Icon.vue"
import useMediaQueries from "@/hooks/useMediaQueries"
import { Edition } from "@/types"

const Edition = defineComponent({
  name: "Edition",
  components: {
    Media,
    "v-icon": Icon,
    "collapse-transition": CollapseTransition,
  },
  props: {
    edition: {
      type: Object as PropType<Edition>,
      required: true,
    },
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
      mediaHeight: computed(() => (onBigScreen.value ? "300px" : "200px")),
    }
  },
})

export default Edition
