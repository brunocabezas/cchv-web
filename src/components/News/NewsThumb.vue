<template>
  <div
    class="newsGridItem newsPostPreview"
    v-bind:class="{ 'newsPostPreview--small': small }"
  >
    <router-link
      class="newsPostPreview__link"
      :title="post.title"
      :to="getNewsPostUrl(post.id)"
    >
      <div
        class="newsPostPreview__thumbnail"
        v-bind:style="{ 'background-image': `url(${post.thumbnail})` }"
        :alt="post.title"
      />
    </router-link>
    <h3 class="newsPostPreview__title">
      <router-link
        class="newsPostPreview__link"
        :title="post.title"
        :to="getNewsPostUrl(post.id)"
        >{{ post.title }}</router-link
      >
    </h3>
    <p>{{ post.date }}</p>
    <p v-html="post.abstract"></p>
    <router-link
      :title="post.title"
      class="newsPostPreview__link"
      :to="getNewsPostUrl(post.id)"
      >Leer noticia completa</router-link
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import View from "@/types/viewTypes";
import AppUrls from "@/utils/urls";
import useNews from "../../factories/useNews";

export default defineComponent({
  props: {
    small: {
      type: Boolean,
      default: false
    },
    post: {
      type: Object as PropType<View.NewsPost>,
      required: true
    }
  },
  name: "NewsThumb",
  setup() {
    const { getNewsPostUrl } = useNews();

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
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 300px;
    width: 100%;

  &__link
    color: $blue;

    &:hover
      text-decoration: underline;
</style>
