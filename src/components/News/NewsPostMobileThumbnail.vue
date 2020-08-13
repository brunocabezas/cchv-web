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
    <div class="newsPostInfo">
      <h5 class="newsPostTitle">
        <router-link :title="post.name" :to="getNewsPostUrlBySlug(post.slug)">{{
          post.title
        }}</router-link>
      </h5>
      <p>{{ post.date }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import ProgressiveImage from "@/components/ProgressiveImage.vue";
import useNews from "@/models/useNews";

const NewsPostMobileThumbnail = defineComponent({
  name: "NewsPostMobileThumbnail",
  components: {
    ProgressiveImage
  },
  props: {
    post: Object
  },
  setup() {
    const { getNewsPostUrlBySlug } = useNews();
    return {
      getNewsPostUrlBySlug
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

    .newsPostTitle
      margin-top: 0;
      margin-bottom: 0;

      a
        color: black;
        font-family: MontSerrat;
</style>
