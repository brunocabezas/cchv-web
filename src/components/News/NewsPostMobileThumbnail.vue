<template>
  <div class="newsPostMobileThumbnail">
    <div v-if="post" class="newsPostMedia">
      <router-link
        v-if="post.gallery && post.gallery[0]"
        :title="post.name"
        :to="getNewsPostUrlBySlug(post.slug)"
      >
        <ProgressiveImage :height="MOBILE_IMG_HEIGHT" :src="post.gallery[0].url" />
      </router-link>
    </div>
    <div v-if="post" class="newsPostInfo">
      <div class="newsPostBadge">
        {{ getActvitiesGridTitleByType(post.is_activity).slice(0, -1) }}
      </div>
      <h4 class="newsPostTitle">
        <router-link v-html="post.title" :title="post.name" :to="getNewsPostUrlBySlug(post.slug)"> </router-link>
      </h4>
      <p class="newsPostDate">{{ post.date }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import ProgressiveImage from "@/components/ProgressiveImage.vue";
import useNews from "@/models/useNews";
import useActivities from "@/models/useActivities";
import { MOBILE_IMG_HEIGHT } from '@/utils/constants';

const NewsPostMobileThumbnail = defineComponent({
  name: "NewsPostMobileThumbnail",
  components: {
    ProgressiveImage
  },
  props: {
    post: Object
  },
  setup() {
    const { getActvitiesGridTitleByType } = useActivities();
    const { getNewsPostUrlBySlug } = useNews();
    return {
      getNewsPostUrlBySlug,
      getActvitiesGridTitleByType,
      MOBILE_IMG_HEIGHT,
    };
  }
});

export default NewsPostMobileThumbnail;
</script>

<style lang="stylus">
@import '../../styles/variables.styl';

.newsPostMobileThumbnail
  display: flex;
  width: 100%;
  margin-bottom: 1em;
  padding-bottom: 1em;
  border-bottom: 1px solid darken($grey, 10);

  &:last-child
    margin-bottom: 0;
    border-bottom: none;

  .newsPostMedia
    flex: 6;
    // min-width: 200px;
    padding-left: 0;

  .newsPostInfo
    flex: 5;
    padding-right: 0;
    font-size: 18px;
    padding: 0 0 0 1em;

  .newsPostBadge
    background-color: $blue;
    color: white;
    padding: 4px 10px;
    display: inline-block;
    font-size: 14px;
    margin-bottom: 5px;

  .newsPostDate
    margin-bottom: 0;

  .newsPostTitle
    margin-top: 0;
    margin-bottom: 0;
    font-size: 16px;

    p
      a
        color: black;
        font-family: MontSerrat;
</style>
