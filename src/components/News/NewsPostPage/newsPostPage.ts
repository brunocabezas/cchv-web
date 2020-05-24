import { defineComponent, computed } from "@vue/composition-api"
import Loader from "@/components/Loader.vue"
import Media from "@/components/Media.vue"
import useNews from "@/factories/useNews"

export default defineComponent({
  name: "NewsPostPage",
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  components: { Loader, Media },
  setup(props) {
    const { getNewsPostById, fetchNews, isLoading, getNewsPostUrl } = useNews()

    fetchNews()

    const post = computed(() => {
      return getNewsPostById(props.postId)
    })

    return { getNewsPostUrl, post, isLoading }
  },
})
