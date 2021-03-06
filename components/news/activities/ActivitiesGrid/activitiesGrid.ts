import { defineComponent, computed, PropType } from "@nuxtjs/composition-api";
import useActivities from "@/models/useActivities";
import { ActivityType } from "@/types/customFieldsTypes";
import ProgressiveImage from "@/components/ProgressiveImage.vue";
import ActivitySchedule from "@/components/news/activities/ActivitySchedule.vue";
import { Activity } from "@/types";
import useWpCategories from "@/models/useWpCategories";
import { WpCategory } from "@/types/wordpressTypes";
import useNews from "@/models/useNews";
import useMediaQueries from "@/hooks/useMediaQueries";
import { MOBILE_IMG_HEIGHT } from "@/utils/constants";

// While onPages prop is set false, max acitivities to be displayed will be determined by MAX_ACTIVITIES
const MAX_ACTIVITIES = 3;

const ActivitiesGrid = defineComponent({
  name: "ActivitiesGrid",
  components: { ProgressiveImage, ActivitySchedule },
  props: {
    type: {
      type: String as PropType<ActivityType>,
      required: true
    },
    onPage: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props) {
    const {
      getActvitiesGridTitleByType,
      getActivityUrlBySlug,
      getActvitiesByType,
      isLoading,
      getActivitiesGridUrlByActivityType
    } = useActivities(props.type);
    const { onBigScreen } = useMediaQueries();
    const { activityCategories } = useWpCategories();

    const cat = computed<WpCategory | undefined>(() =>
      activityCategories.value.find(cat => cat.slug === props.type)
    );

    const catEmpty = computed<boolean>(() =>
      cat.value ? !!cat.value.count : false
    );

    const { getNewsPostUrlBySlug } = useNews();

    const title = computed<string>(() =>
      getActvitiesGridTitleByType(props.type)
    );
    // Limit Activities to MAX_ACTIVITIES
    const activities = computed<Activity[]>(() =>
      !props.onPage
        ? getActvitiesByType(props.type).slice(0, MAX_ACTIVITIES)
        : getActvitiesByType(props.type)
    );
    const activitiesGridUrl = computed<string>(() =>
      getActivitiesGridUrlByActivityType(props.type)
    );
    // Page title
    const pageLinkTitle = computed<string>(
      () =>
        `Ver ${
          props.type === ActivityType.Performance ? `todas` : `todos`
        } los ${title.value}`
    );
    return {
      activities,
      title,
      onBigScreen,
      noActivitiesToDisplay: catEmpty,
      loading: isLoading,
      getNewsPostUrlBySlug,
      getActivityUrlBySlug,
      activitiesGridUrl,
      pageLinkTitle,
      imageSize: computed(() =>
        onBigScreen.value ? "200px" : MOBILE_IMG_HEIGHT
      )
    };
  }
});

export default ActivitiesGrid;
