import { computed } from "@nuxtjs/composition-api"
import apiRoutes from "../../api/apiRoutes"
import useAsyncData from "@/hooks/useAsyncData"
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
  const mapSocialNetworkFromWpPost = (
    socialNetworkPost: WPResponseItem
  ): SocialNetwork => {
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

  const socialNetworks = computed<SocialNetwork[]>(() =>
    data.value.map(mapSocialNetworkFromWpPost)
  )

  function getIconNameByType(
    socialNetworkType: WPSelectCustomFieldValue<SocialNetworkType>
  ): string {
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
  
  function getIconScaleByType(
    socialNetworkType: WPSelectCustomFieldValue<SocialNetworkType>
  ): number {
    switch (socialNetworkType.value) {
      // Youtube icon height is smaller than the rest; therefore
      // the ratio must be bigger to compensate and have same height as other icons
      case SocialNetworkType.Youtube:
        return 3.3
      default:
        return 2.7
    }
  }

  return {
    fetchSocialNetworks,
    socialNetworks,
    isLoading,
  }
}
