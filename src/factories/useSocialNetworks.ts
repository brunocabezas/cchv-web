import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import useAsyncData from "@/factories/useAsyncData"
import { WpResponseData } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { SocialNetworksKeys } from "@/types/customFieldsKeysTypes"
import { SocialNetwork } from "@/types/viewTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchSocialNetworks, isLoading } = useAsyncData<
  WpResponseData
>(apiRoutes.SocialNetworks)

export default function useSocialNetworks() {
  const socialNetworks = computed<SocialNetwork[]>(() => {
    return data.value.map(
      (socialNetworkPost): SocialNetwork => ({
        id: socialNetworkPost.id,
        name: getWPTitle(socialNetworkPost),
        type: getCustomField(socialNetworkPost, SocialNetworksKeys.type),
        url: getCustomField(socialNetworkPost, SocialNetworksKeys.url),
      })
    )
  })

  return {
    fetchSocialNetworks,
    socialNetworks,
    isLoading,
  }
}
