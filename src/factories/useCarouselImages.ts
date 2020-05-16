import Vue from "vue"
import VueCompositionApi, { computed, Ref } from "@vue/composition-api"
import apiRoutes from "@/api/apiRoutes"
import useAsyncData, { AsyncDataStatus } from "./useAsyncData"
import { WpResponseData } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { CarouselImage } from "@/types/customFieldsTypes"
import { CarouselImageKeys } from "@/types/customFieldsKeysTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchCarouselImages, status } = useAsyncData<
  WpResponseData
>(apiRoutes.CarouselImages)

export default function useCarouselImages() {
  const isLoading = computed(() => status.value === AsyncDataStatus.Loading)

  const carousel: Readonly<Ref<readonly CarouselImage[]>> = computed(() => {
    return data.value.map((carouselImagePost) => ({
      id: carouselImagePost.id,
      name: getWPTitle(carouselImagePost),
      image: getCustomField(carouselImagePost, CarouselImageKeys.image),
      url: getCustomField(carouselImagePost, CarouselImageKeys.url),
    }))
  })

  return { fetchCarouselImages, carousel, isLoading }
}
