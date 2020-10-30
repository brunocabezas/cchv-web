import { computed, useAsync } from "@nuxtjs/composition-api";
import apiRoutes from "../../api/apiRoutes";
import {
  WPSelectCustomFieldValue,
  WPResponseItem,
  WpResponseData
} from "@/types/wordpressTypes";
import { getCustomFieldFromPost, getWPTitle } from "@/utils/api";
import { SocialNetworksKeys } from "@/types/customFieldsKeysTypes";
import { SocialNetwork } from "@/types";
import { SocialNetworkType } from "@/types/customFieldsTypes";
import client from "~/api/client";

const mapSocialNetworkFromWpPost = (
  socialNetworkPost: WPResponseItem
): SocialNetwork => {
  const type = getCustomFieldFromPost<
    WPSelectCustomFieldValue<SocialNetworkType>
  >(socialNetworkPost, SocialNetworksKeys.type, {
    value: SocialNetworkType.Facebook,
    label: ""
  });
  const iconName = getIconNameByType(type);

  return {
    id: socialNetworkPost.id,
    name: getWPTitle(socialNetworkPost),
    iconName,
    scale: getIconScaleByType(type),
    [SocialNetworksKeys.type]: type,
    url: getCustomFieldFromPost(socialNetworkPost, SocialNetworksKeys.url, "")
  };
};

function getIconNameByType(
  socialNetworkType: WPSelectCustomFieldValue<SocialNetworkType>
): string {
  switch (socialNetworkType.value) {
    case SocialNetworkType.Facebook:
      return "brands/facebook-square";
    case SocialNetworkType.Instagram:
      return "brands/instagram";
    case SocialNetworkType.Youtube:
      return "brands/youtube";
    default:
      return "";
  }
}

function getIconScaleByType(
  socialNetworkType: WPSelectCustomFieldValue<SocialNetworkType>
): number {
  switch (socialNetworkType.value) {
    // Youtube icon height is smaller than the rest; therefore
    // the ratio must be bigger to compensate and have same height as other icons
    case SocialNetworkType.Youtube:
      return 3.3;
    default:
      return 2.7;
  }
}

export default function useSocialNetworks() {
  const data = useAsync<WpResponseData>(() =>
    client
      .get(apiRoutes.SocialNetworks)
      .then(res => res.data)
      .catch(() => [])
  );
  const socialNetworks = computed<SocialNetwork[]>(() =>
    data.value ? data.value.map(mapSocialNetworkFromWpPost) : []
  );

  return {
    // fetchSocialNetworks,
    socialNetworks,
    isLoading: false
  };
}
