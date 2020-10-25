import Vue from "vue"
import VueCompositionApi, { computed } from "@nuxtjs/composition-api"
import apiRoutes from "../../api/apiRoutes"
import useAsyncData from "@/hooks/useAsyncData"
import { WPResponseItem } from "@/types/wordpressTypes"
import { getCustomFieldFromPost, getWPTitle } from "@/utils/api"
import { CarouselImageKeys } from "@/types/customFieldsKeysTypes"
import { CarouselImage } from "@/types"
import { DEFAULT_ORDER, DOMAIN } from "@/utils/constants"
import { sortByOrder } from "@/utils/arrays"

Vue.use(VueCompositionApi)

const { data, fetch: fetchCarouselImages, isLoading } = useAsyncData<
  WPResponseItem
>(apiRoutes.CarouselImages)

const mapCarouselImageFromWpPost = (
  carouselImagePost: WPResponseItem
): CarouselImage => {
  const imgUrl = getCustomFieldFromPost(
    carouselImagePost,
    CarouselImageKeys.url,
    ""
  )
  const isInternal = imgUrl.includes(DOMAIN)
  let url: string = imgUrl

  // Internal urls already inlcude DOMAIN,
  // should be removed to be used with <router-link />
  if (isInternal) {
    const urlSlices = url.split(`${DOMAIN}/`)
    urlSlices.shift() // remove domain name
    url = urlSlices.join("")
  }

  return {
    id: carouselImagePost.id,
    name: getWPTitle(carouselImagePost),
    image: getCustomFieldFromPost(
      carouselImagePost,
      CarouselImageKeys.image,
      ""
    ),
    video_url: getCustomFieldFromPost(
      carouselImagePost,
      CarouselImageKeys.video_url,
      ""
    ),
    order: getCustomFieldFromPost<number>(
      carouselImagePost,
      CarouselImageKeys.order,
      DEFAULT_ORDER
    ),
    url,
    isInternal,
  }
}

export default function useCarouselImages() {
  const carousel = computed<CarouselImage[]>(() =>
    data.value.map(mapCarouselImageFromWpPost).sort(sortByOrder)
  )
  return { fetchCarouselImages, carousel, isLoading }
}
