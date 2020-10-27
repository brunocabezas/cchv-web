import { computed, useAsync } from "@nuxtjs/composition-api";
import apiRoutes from "../../api/apiRoutes";
import { WpResponseData, WPResponseItem } from "@/types/wordpressTypes";
import { getCustomFieldFromPost, getWPTitle } from "@/utils/api";
import {
  SponsorCategoryKeys,
  SponsorKeys
} from "@/types/customFieldsKeysTypes";
import { Sponsor, SponsorsCategory } from "@/types";
import { filterUndef, sortByOrder } from "@/utils/arrays";
import { DEFAULT_ORDER } from "@/utils/constants";
import client from "~/api/client";

// Map WpResponseItem to SponsorsCategory
const mapWpResponseToView = (
  sponsorCategoryPost: WPResponseItem,
  sponsors: WpResponseData
): SponsorsCategory => {
  const sponsorsIds = getCustomFieldFromPost<number[]>(
    sponsorCategoryPost,
    SponsorCategoryKeys.sponsors,
    []
  );
  
  const sponsorsFromState = sponsorsIds.map((sponsorId: number) =>
    sponsors.find(s => s.id === sponsorId)
  );

  const viewSponsors: Sponsor[] = filterUndef(sponsorsFromState).map(
    (sponsor): Sponsor => ({
      id: sponsor.id,
      order: getCustomFieldFromPost<number>(
        sponsor,
        SponsorKeys.order,
        DEFAULT_ORDER
      ),
      logo: getCustomFieldFromPost(sponsor, SponsorKeys.logo, ""),
      url: getCustomFieldFromPost(sponsor, SponsorKeys.url, "")
    })
  );

  return {
    id: sponsorCategoryPost.id,
    name: getWPTitle(sponsorCategoryPost),
    order: getCustomFieldFromPost<number>(
      sponsorCategoryPost,
      SponsorCategoryKeys.order,
      DEFAULT_ORDER
    ),
    sponsors: viewSponsors.sort(sortByOrder)
  };
};

export default function useSponsors() {
  const sponsors = useAsync(() =>
    client.get(apiRoutes.Sponsors).then(res => res.data)
  );
  
  const categories = useAsync(() =>
    client.get(apiRoutes.SponsorsCategories).then(res => res.data)
  ); 

  const sponsorsCategories = computed<SponsorsCategory[]>(() =>
    !categories.value
      ? []
      : categories.value
          .map((wp: any) => mapWpResponseToView(wp, sponsors.value))
          .sort(sortByOrder)
  );

  return {
    sponsorsCategories,
    isLoading: false
  };
}
