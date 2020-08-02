import { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import useAsyncData from "@/utils/useAsyncData"
import {
  WPSelectCustomFieldValue,
  WPResponseItem,
} from "@/types/wordpressTypes"
import { getCustomFieldFromPost, getWPTitle } from "@/utils/api"
import { SocialNetworksKeys } from "@/types/customFieldsKeysTypes"
import { SocialNetwork } from "@/types"
import { SocialNetworkType } from "@/types/customFieldsTypes"

const { data, fetch: fetchSocialNetworks, isLoading } = useAsyncData<
  WPResponseItem
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
  const getIconScaleByType = (
    socialNetworkType: WPSelectCustomFieldValue<SocialNetworkType>
  ): number => {
    switch (socialNetworkType.value) {
      // Youtube icon height is smaller than the rest; therefore
      // the ratio is bigger to compensate a display icons of same height
      case SocialNetworkType.Youtube:
        return 3.3
      default:
        return 2.7
    }
  }
  const socialNetworks = computed<SocialNetwork[]>(() => {
    return data.value.map(
      (socialNetworkPost): SocialNetwork => {
        const type = getCustomFieldFromPost<
          WPSelectCustomFieldValue<SocialNetworkType>
        >(socialNetworkPost, SocialNetworksKeys.type, {
          value: SocialNetworkType.Facebook,
          label: "",
        })
        const iconName = getIconNameByType(type)

        return {
          id: socialNetworkPost.id,
          name: getWPTitle(socialNetworkPost),
          iconName,
          scale: getIconScaleByType(type),
          [SocialNetworksKeys.type]: type,
          url: getCustomFieldFromPost(
            socialNetworkPost,
            SocialNetworksKeys.url,
            ""
          ),
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
