import { defineComponent, computed } from "@vue/composition-api"
import Loader from "@/components/Loader.vue"
import ProgressiveImage from "@/components/ProgressiveImage.vue"
import Media from "@/components/Media/Media.vue"
import ActivitySchedule from "@/components/Activities/ActivitySchedule.vue"
import useNews from "@/factories/useNews"

export default defineComponent({
  name: "NewsPostPage",
  props: {
    postSlug: {
      type: String,
      required: true,
    },
  },
  components: { Loader, Media, ProgressiveImage, ActivitySchedule },
  setup(props) {
    const {
      getNewsPostBySlug,
      fetchNews,
      isLoading,
      getNewsPostUrlBySlug,
      getLatestNews,
    } = useNews()

    fetchNews()

    const post = computed(() => getNewsPostBySlug(props.postSlug))

    const filteredLatestNews = computed(() => getLatestNews(post))

    return {
      getNewsPostUrlBySlug,
      latestNews: filteredLatestNews,
      post,
      isLoading,
    }
  },
})
