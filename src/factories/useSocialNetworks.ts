import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import useAsyncData from "@/utils/useAsyncData"
import {
  WpResponseData,
  WPSelectCustomFieldValue,
} from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { SocialNetworksKeys } from "@/types/customFieldsKeysTypes"
import { SocialNetwork } from "@/types/viewTypes"
import { SocialNetworkType } from "@/types/customFieldsTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchSocialNetworks, isLoading } = useAsyncData<
  WpResponseData
>(apiRoutes.SocialNetworks)

export default function useSocialNetworks() {
  const getIconNameByType = (
    socialNetworkType: WPSelectCustomFieldValue<SocialNetworkType>
  ): string => {
    switch (socialNetworkType.value) {
      case SocialNetworkType.Facebook:
        return "brands/facebook-square"
      case SocialNetworkType.Instagram:
        return "brands/instagram"
      case SocialNetworkType.Youtube:
        return "brands/youtube"
      default:
        return ""
    }
  }
  const socialNetworks = computed<SocialNetwork[]>(() => {
    return data.value.map(
      (socialNetworkPost): SocialNetwork => {
        const type = getCustomField<
          WPSelectCustomFieldValue<SocialNetworkType>
        >(socialNetworkPost, SocialNetworksKeys.type)
        const iconName = getIconNameByType(type)

        return {
          id: socialNetworkPost.id,
          name: getWPTitle(socialNetworkPost),
          iconName,
          [SocialNetworksKeys.type]: type,
          url: getCustomField(socialNetworkPost, SocialNetworksKeys.url),
        }
      }
    )
  })

  return {
    fetchSocialNetworks,
    socialNetworks,
    isLoading,
  }
}
