import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "@/api/apiRoutes"
import useAsyncData from './useAsyncData'
import { WpResponseData, WPResponseItem } from '@/types/wordpressTypes'
import { getCustomField } from '@/utils/api'
import { CarouselKeys } from '@/types/customFieldsTypes'

Vue.use(VueCompositionApi)

const { data, fetch: fetchCarouselImages, status } = useAsyncData<WpResponseData>(apiRoutes.CarouselImages)

export default function useCarouselImages() {
  
  // TODO update
  const carousel = computed<WpResponseData>(() => {
    if (!data.value[0]) return [];
    // Displaying the first carousel only
    const wpRes: WPResponseItem = data.value[0];
    return getCustomField(wpRes, CarouselKeys.images);
  });


  return { fetchCarouselImages, carousel, status: computed(() => status.value) }
}
