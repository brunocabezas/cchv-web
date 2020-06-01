import { defineComponent, computed } from "@vue/composition-api"
import Loader from "@/components/Loader.vue"
import ProgressiveImage from "@/components/ProgressiveImage.vue"
import Media from "@/components/Media/Media.vue"
import useNews from "@/factories/useNews"

export default defineComponent({
  name: "NewsPostPage",
  props: {
    postSlug: {
      type: String,
      required: true,
    },
  },
  components: { Loader, Media, ProgressiveImage },
  setup(props) {
    const {
      getNewsPostBySlug,
      fetchNews,
      isLoading,
      getNewsPostUrl,
    } = useNews()

    fetchNews()

    const post = computed(() => {
      return getNewsPostBySlug(props.postSlug)
    })

    return { getNewsPostUrl, post, isLoading }
  },
})
