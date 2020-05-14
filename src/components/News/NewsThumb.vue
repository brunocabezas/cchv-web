<template>
  <div
    class="newsGridItem newsPostPreview"
    v-bind:class="{ 'newsPostPreview--small': small }"
  >
    <div
      class="newsPostPreview__thumbnail"
      v-bind:style="{ 'background-image': `url(${post.imageUrl})` }"
      :alt="post.title"
    />
    <h3 class="newsPostPreview__title">
      <router-link
        class="newsPostPreview__link"
        :title="post.title"
        :to="getNewsPostUrl(post.id)"
        >{{ post.title }}</router-link
      >
    </h3>
    <p>{{ post.date }}</p>
    <p>{{ post.abstract }}</p>
    <router-link
      :title="post.title"
      class="newsPostPreview__link"
      :to="getNewsPostUrl(post.id)"
      >Leer noticia completa</router-link
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import View from "@/types/viewTypes";
import AppUrls from "@/utils/urls";

export default defineComponent({
  props: {
    small: {
      type: Boolean,
      default: false
    },
    post: {
      default: {}
    }
  },
  name: "NewsThumb",
  setup() {
    function getNewsPostUrl(postId: number) {
      return `${AppUrls.NewsPost}${postId}`;
    }

    return { getNewsPostUrl };
  }
});
</script>
<style scoped lang="stylus">
@import '../../styles/variables.styl';

.newsPostPreview
  margin: 0 1px;
  padding: 5px 5px 15px 5px;

  &.newsPostPreview--small .newsPostPreview__thumbnail
    height: 200px;

  &__thumbnail
    height: 300px;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;

  &__link
    color: $blue;

    &:hover
      text-decoration: underline;
</style>
