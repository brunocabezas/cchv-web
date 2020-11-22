import { computed, ssrRef, useAsync } from "@nuxtjs/composition-api";
import apiRoutes from "~/api/apiRoutes";
import { WpResponseData, WPResponseItem } from "@/types/wordpressTypes";
import { getCustomFieldFromPost, getWPTitle } from "@/utils/api";
import { CarouselImageKeys } from "@/types/customFieldsKeysTypes";
import { CarouselImage } from "@/types";
import { DEFAULT_ORDER, DOMAIN } from "@/utils/constants";
import { sortByOrder } from "@/utils/arrays";
import client from "~/api/client";

const mapCarouselImageFromWpPost = (
  carouselImagePost: WPResponseItem
): CarouselImage => {
  const imgUrl = getCustomFieldFromPost(
    carouselImagePost,
    CarouselImageKeys.url,
    ""
  );
  const isInternal = imgUrl.includes(DOMAIN);
  let url: string = imgUrl;

  // Internal urls already inlcude DOMAIN,
  // should be removed to be used with <router-link />
  if (isInternal) {
    const urlSlices = url.split(`${DOMAIN}/`);
    urlSlices.shift(); // remove domain name
    url = urlSlices.join("");
  }

  return {
    id: carouselImagePost.id,
    name: getWPTitle(carouselImagePost),
    image: getCustomFieldFromPost(
      carouselImagePost,
      CarouselImageKeys.image,
      ""
    ),
    video_url: getCustomFieldFromPost(
      carouselImagePost,
      CarouselImageKeys.video_url,
      ""
    ),
    order: getCustomFieldFromPost<number>(
      carouselImagePost,
      CarouselImageKeys.order,
      DEFAULT_ORDER
    ),
    url,
    isInternal
  };
};

export default function useCarouselImages() {
  const loading = ssrRef(false);
  const data = useAsync<WpResponseData>(() => {
    loading.value = true;
    return client
      .get(apiRoutes.CarouselImages)
      .then(res => res.data)
      .catch(() => [])
      .finally(() => {
        loading.value = false;
      });
  });
  const carousel = computed<CarouselImage[]>(() =>
    data.value
      ? data.value.map(mapCarouselImageFromWpPost).sort(sortByOrder)
      : []
  );
  return { carousel, isLoading: computed(() => loading.value) };
}
