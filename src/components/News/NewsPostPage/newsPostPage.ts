import { defineComponent, computed } from "@vue/composition-api"
import Loader from "@/components/Loader.vue"
import useNews from "@/factories/useNews"

export default defineComponent({
  name: "NewsPostPage",
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  components: { Loader },
  setup(props) {
    const { getNewsPostById, fetchNews, isLoading } = useNews()

    fetchNews()

    const post = computed(() => {
      return getNewsPostById(props.postId)
    })

    return {
      post,
      isLoading,
    }
  },
})
