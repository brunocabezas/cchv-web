import BurgerButton from "vue-burger-button"
import HeaderNav from "@/components/layout/Header/HeaderNav.vue"
import Logo from "@/components/Logo.vue"
import SocialNetworks from "@/components/SocialNetworks.vue"
import { defineComponent, ref, computed } from "@vue/composition-api"
import { YOUTUBE_CHANNEL } from "@/utils/static"
import useMediaQueries from "@/hooks/useMediaQueries"
import "vue-burger-button/dist/vue-burger-button.css"

const Header = defineComponent({
  name: "Header",
  components: { Logo, HeaderNav, SocialNetworks, BurgerButton },
  setup() {
    const isMenuOpen = ref(false)

    function toggleMenu () {
      isMenuOpen.value = !isMenuOpen.value
    }
    const { onBiggerThanMediumScreen } = useMediaQueries()
    return {
      YOUTUBE_CHANNEL,
      isMenuOpen,
      toggleMenu,
      displayNavigationMenuButton: computed(()=> onBiggerThanMediumScreen.value),
    }
  },
})

export default Header
