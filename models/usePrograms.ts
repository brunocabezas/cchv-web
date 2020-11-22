import { computed, useAsync } from "@nuxtjs/composition-api";
import apiRoutes from "~/api/apiRoutes";
import { Program } from "@/types";
import client from "~/api/client";
import {
  WPResponseItem,
  WpImage,
  WPSelectCustomFieldValue,
  WpResponseData
} from "@/types/wordpressTypes";
import { getCustomFieldFromPost, getWPTitle } from "@/utils/api";
import { ProgramKeys } from "@/types/customFieldsKeysTypes";
import { ProgramExtraContent } from "@/types/customFieldsTypes";
import Urls from "@/utils/urls";
import { sortByOrder } from "@/utils/arrays";
import { DEFAULT_ORDER } from "@/utils/constants";

const mapProgramFromWpPost = (programPost: WPResponseItem): Program => {
  const extraContent = getCustomFieldFromPost<
    WPSelectCustomFieldValue<ProgramExtraContent>
  >(programPost, ProgramKeys.extra_content, {
    label: "",
    value: ProgramExtraContent.None
  });

  const isExternal = getCustomFieldFromPost<boolean>(
    programPost,
    ProgramKeys.is_external,
    false
  );
  return {
    id: programPost.id,
    name: getWPTitle(programPost),
    order: getCustomFieldFromPost(
      programPost,
      ProgramKeys.order,
      DEFAULT_ORDER
    ),
    // If program is not external, url is build with the slug
    nav_menu_url: isExternal
      ? getCustomFieldFromPost(programPost, ProgramKeys.url, "")
      : `${Urls.Programs}${programPost.slug}`,
    slug: programPost.slug,
    video_url: getCustomFieldFromPost(programPost, ProgramKeys.video_url, ""),
    is_external: isExternal,
    text: getCustomFieldFromPost(programPost, ProgramKeys.text, ""),
    gallery: getCustomFieldFromPost<WpImage[]>(
      programPost,
      ProgramKeys.gallery,
      []
    ),
    short_name: getCustomFieldFromPost(programPost, ProgramKeys.short_name, ""),
    extra_content: (extraContent && extraContent.value) || ""
  };
};

export default function usePrograms() {
  const data = useAsync<WpResponseData>(() =>
    client
      .get(apiRoutes.Programs)
      .then(res => res.data)
      .catch(() => [])
  );

  const programs = computed<Program[]>(() =>
    data.value ? data.value.map(mapProgramFromWpPost).sort(sortByOrder) : []
  );

  function getProgramBySlug(slug: string): Program | undefined {
    return programs.value.find(p => p.slug === slug);
  }

  function matchContentTypeWithProgram(
    contentType: ProgramExtraContent,
    program: Program
  ) {
    return !!(program && program.extra_content === contentType);
  }

  return {
    // Programs are used to build the navigation menu
    programs,
    isLoading: false,
    getProgramBySlug,
    matchContentTypeWithProgram
  };
}
