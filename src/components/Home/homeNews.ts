import { defineComponent, computed } from "@vue/composition-api"
import Icon from "vue-awesome/components/Icon.vue"
import Loader from "@/components/Loader.vue"
import NewsThumb from "@/components/News/NewsThumb.vue"
import AppUrls from "@/utils/urls"
import useNews from "@/factories/useNews"
import { AsyncDataStatus } from "@/factories/useAsyncData"

const HomeNews = defineComponent({
  name: "HomeNews",
  components: { NewsThumb, Loader, "v-icon": Icon },
  setup() {
    const { news, fetchNews, status } = useNews()

    fetchNews()

    return {
      status,
      loading: computed(()=>status.value === AsyncDataStatus.Loading),
      news,
      newsGridUrl: AppUrls.News,
    }
  },
})
export default HomeNews
