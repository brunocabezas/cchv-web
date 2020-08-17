<template>
  <div class="newsPostMobileThumbnail">
    <div v-if="post" class="newsPostMedia">
      <router-link
        v-if="post.gallery && post.gallery[0]"
        :title="post.name"
        :to="getNewsPostUrlBySlug(post.slug)"
      >
        <ProgressiveImage height="100%" :src="post.gallery[0].url" />
      </router-link>
    </div>
    <div v-if="post" class="newsPostInfo">
      <div class="newsPostBadge">
        {{ getActvitiesGridTitleByType(post.is_activity).slice(0, -1) }}
      </div>
      <h4 class="newsPostTitle">
        <router-link :title="post.name" :to="getNewsPostUrlBySlug(post.slug)">{{
          post.title
        }}</router-link>
      </h4>
      <p>{{ post.date }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import ProgressiveImage from "@/components/ProgressiveImage.vue";
import useNews from "@/models/useNews";
import useActivities from "@/models/useActivities";

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
      getActvitiesGridTitleByType
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

  .newsPostMedia
    flex: 1;
    width: 250px;
    padding-left: 0;
    background-color: $blue;

  .newsPostInfo
    flex: 2;
    padding-right: 0;
    font-size: 18px;
    padding: 0 1em;

    .newsPostBadge
      background-color: $blue;
      color: white;
      padding: 5px 10px;
      display: inline-block;
      font-size: 14px;
      margin-bottom: 5px;

    .newsPostTitle
      margin-top: 0;
      margin-bottom: 0;

      a
        color: black;
        font-family: MontSerrat;
</style>
