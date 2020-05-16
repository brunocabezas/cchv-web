import { defineComponent } from "@vue/composition-api"
import Icon from "vue-awesome/components/Icon.vue"
import Loader from "@/components/Loader.vue"
import NewsThumb from "@/components/News/NewsThumb.vue"
import AppUrls from "@/utils/urls"
import useNews from "@/factories/useNews"

const HomeNews = defineComponent({
  name: "HomeNews",
  components: { NewsThumb, Loader, "v-icon": Icon },
  setup() {
    const { news, fetchNews, isLoading } = useNews()

    fetchNews()

    return { isLoading, news, newsGridUrl: AppUrls.News }
  },
})
export default HomeNews
