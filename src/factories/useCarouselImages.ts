import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import useAsyncData from "./useAsyncData"
import { WpResponseData } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { CarouselImageKeys } from "@/types/customFieldsKeysTypes"
import View from "@/types/viewTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchCarouselImages, isLoading } = useAsyncData<
  WpResponseData
>(apiRoutes.CarouselImages)

export default function useCarouselImages() {
  const carousel = computed<View.Carousel>(() => {
    return data.value.map(
      (carouselImagePost): View.CarouselImage => ({
        id: carouselImagePost.id,
        name: getWPTitle(carouselImagePost),
        image: getCustomField(carouselImagePost, CarouselImageKeys.image),
        url: getCustomField(carouselImagePost, CarouselImageKeys.url),
      })
    )
  })

  return { fetchCarouselImages, carousel, isLoading }
}
