import { defineComponent, computed } from "@vue/composition-api"
import Loader from "@/components/Loader.vue"
import useNews from "@/factories/useNews"
import { AsyncDataStatus } from "@/factories/useAsyncData"

export default defineComponent({
  name: "NewsPost",
  props: { postId: {
    type: Number,
    required: true
  } },
  components: { Loader },
  setup(props) {
    const { getNewsPostById, fetchNews, status } = useNews()

    fetchNews()

    const post = computed(() => {
      return getNewsPostById(props.postId)
    })

    return {
      post,
      loading: computed(() => status.value === AsyncDataStatus.Loading),
    }
  },
})
