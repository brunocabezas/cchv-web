import { defineComponent } from "@vue/composition-api"
import Icon from "vue-awesome/components/Icon.vue"
import { MAIN_COLOR } from "@/utils/static"
import Loader from "@/components/Loader.vue"
import NewsPostThumbnail from "@/components/News/NewsPostThumbnail.vue"
import Urls from "@/utils/urls"
import useNews from "@/models/useNews"

const HomeNews = defineComponent({
  name: "HomeNews",
  components: { NewsPostThumbnail, Loader, "v-icon": Icon },
  setup() {
    const { homeNews: news, fetchNews, isLoading } = useNews()

    fetchNews({ per_page: 5 })

    return { isLoading, news, newsGridUrl: Urls.News, MAIN_COLOR }
  },
})
export default HomeNews
