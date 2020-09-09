import BurgerButton from "vue-burger-button"
import { Slide } from "vue-burger-menu"
import HeaderNav from "@/components/layout/Header/HeaderNav.vue"
import Logo from "@/components/Logo.vue"
import SocialNetworks from "@/components/SocialNetworks.vue"
import { defineComponent, ref, computed, watch } from "@vue/composition-api"
import {
  YOUTUBE_CHANNEL_LABEL,
  YOUTUBE_CHANNEL_URL,
  CONTACT_EMAIL,
} from "@/utils/constants"
import useMediaQueries from "@/hooks/useMediaQueries"
import "vue-burger-button/dist/vue-burger-button.css"

const Header = defineComponent({
  name: "Header",
  components: { Logo, HeaderNav, SocialNetworks, BurgerButton, Slide },
  setup() {
    const isNavOpen = ref(false)
    const { onBigScreen } = useMediaQueries()

    function toggleMenu(e: MouseEvent) {
      e.stopPropagation()
      isNavOpen.value = !isNavOpen.value
    }

    function onMenuChange(state: boolean) {
      isNavOpen.value = state
    }

    watch(onBigScreen, (newValue) => {
      if (!newValue) {
        onMenuChange(false)
      }
    })

    return {
      YOUTUBE_CHANNEL_LABEL,
      YOUTUBE_CHANNEL_URL,
      CONTACT_EMAIL,
      toggleMenu,
      onMenuChange,
      isNavOpen: computed(() => isNavOpen.value),
      onBigScreen: computed(() => onBigScreen.value),
    }
  },
})

export default Header
