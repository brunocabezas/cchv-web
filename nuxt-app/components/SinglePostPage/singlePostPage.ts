import {
  defineComponent,
  PropType,
  computed,
  useMeta
} from "@nuxtjs/composition-api";
import { SchoolProgram, Activity } from "@/types";
import Loader from "@/components/Loader.vue";
import useActivities from "@/models/useActivities";
import Media from "@/components/Media/Media.vue";
import DownloadLink from "@/components/DownloadLink.vue";
import useSchoolPrograms from "@/models/useSchoolPrograms";
import meta from "~/utils/meta";

export enum SinglePostDataType {
  SchoolProgram = "school_program",
  Workshop = "workshop"
}

const MEDIA_HEIGHT = "500px";
// Workshop is a variant of SchoolProgram
type FullWidthPageData = SchoolProgram | Activity;

const SinglePostPage = defineComponent({
  name: "SinglePostPage",
  head: {},
  props: {
    pageType: {
      type: String as PropType<SinglePostDataType>,
      default: SinglePostDataType.SchoolProgram
    },
    slug: {
      type: String,
      required: true
    }
  },
  components: { Loader, Media, DownloadLink },
  setup(props) {
    const {
      isLoading: isLoadingSchoolPrograms,
      schoolPrograms,
      workshops,
      fetchSchoolPrograms
    } = useSchoolPrograms();
    const { isLoading: isLoadingActivities } = useActivities();
    if (
      props.pageType === SinglePostDataType.SchoolProgram ||
      props.pageType === SinglePostDataType.Workshop
    ) {
      fetchSchoolPrograms();
    }

    const page = computed<FullWidthPageData | undefined>(() => {
      switch (props.pageType) {
        case SinglePostDataType.Workshop:
          return workshops.value.find(p => p.slug === props.slug);
        case SinglePostDataType.SchoolProgram:
          return schoolPrograms.value.find(p => p.slug === props.slug);
        default:
          return undefined;
      }
    });

    useMeta(() => ({
      title: !page.value ? "" : page.value.name,
      meta: !page.value
        ? []
        : meta({
            title: page.value.name,
            url: "https://bobross.com",
            description: page.value.text,
            mainImage: page.value.gallery[0] && page.value.gallery[0].url
          })
    }));

    const isLoading = computed(() => {
      switch (props.pageType) {
        case SinglePostDataType.Workshop:
          return !!isLoadingActivities.value;
        case SinglePostDataType.SchoolProgram:
          return !!isLoadingSchoolPrograms.value;
        default:
          return false;
      }
    });

    return {
      page,
      isLoading
    };
  }
});

export default SinglePostPage;
