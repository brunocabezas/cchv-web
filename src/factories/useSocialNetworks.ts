import Vue from "vue"
import VueCompositionApi, { Ref, computed } from "@vue/composition-api"
import apiRoutes from "@/api/apiRoutes"
import useAsyncData, { AsyncDataStatus } from "@/factories/useAsyncData"
import { WpResponseData } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { SocialNetwork } from "@/types/customFieldsTypes"
import { SocialNetworksKeys } from "@/types/customFieldsKeysTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchSocialNetworks, status } = useAsyncData<
  WpResponseData
>(apiRoutes.SocialNetworks)

export default function useSocialNetworks() {
  const isLoading = computed(() => status.value === AsyncDataStatus.Loading)

  const socialNetworks: Readonly<Ref<readonly SocialNetwork[]>> = computed(
    () => {
      return data.value.map((socialNetworkPost) => ({
        id: socialNetworkPost.id,
        name: getWPTitle(socialNetworkPost),
        url: getCustomField(socialNetworkPost, SocialNetworksKeys.url),
      }))
    }
  )

  return {
    fetchSocialNetworks,
    socialNetworks,
    isLoading,
  }
}
