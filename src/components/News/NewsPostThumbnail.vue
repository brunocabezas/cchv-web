<template>
  <div
    class="newsGridItem newsPostPreview"
    v-bind:class="{ 'newsPostPreview--small': small }"
  >
    <router-link
      class="newsPostPreview__link"
      :title="post.title"
      :to="getNewsPostUrlBySlug(post.slug)"
    >
      <ProgressiveImage
        class="newsPostPreview__thumbnail"
        :src="post.thumbnail"
        :height="small ? `150px` : `300px`"
      />
    </router-link>
    <h3 class="newsPostPreview__title">
      <router-link
        v-html="post.title"
        class="newsPostPreview__link"
        :title="post.title"
        :to="getNewsPostUrlBySlug(post.slug)"
      ></router-link>
    </h3>
    <p class="newsPostPreview__date">{{ post.date }}</p>

    <ellipsis
      class="newsPostPreview__abstract"
      :data="post.abstract"
      :line-clamp="6"
    >
    </ellipsis>

    <router-link
      :title="post.title"
      class="newsPostPreview__link newsPostPreview__readMoreLink"
      :to="getNewsPostUrlBySlug(post.slug)"
    >
      <i>Leer más ...</i>
      <v-icon :color="MAIN_COLOR" name="chevron-right" scale="1 "> </v-icon>
    </router-link>
    <hr />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import Icon from "vue-awesome/components/Icon.vue";
import { NewsPost } from "@/types";
import Urls from "@/utils/urls";
import useNews from "@/models/useNews";
import ProgressiveImage from "@/components/ProgressiveImage.vue";
import { MAIN_COLOR } from "@/utils/static";

export default defineComponent({
  name: "NewsPostThumbnail",
  props: {
    small: {
      type: Boolean,
      default: false
    },
    post: {
      type: Object as PropType<NewsPost>,
      required: true
    }
  },
  components: { ProgressiveImage, "v-icon": Icon },
  setup() {
    const { getNewsPostUrlBySlug } = useNews();

    return { getNewsPostUrlBySlug, MAIN_COLOR };
  }
});
</script>
<style lang="stylus">
@import '../../styles/variables.styl';

.newsPostPreview
  margin: 0 1px;
  padding: 5px 5px 15px 5px;
  position: relative;
  max-width: 50%;

  hr
    @media (max-width: $md)
      display: none;

  @media (max-width: $md)
    max-width: none;
    padding: 5px 15px;

  &__date, &__abstract
    margin: 10px 0;

  &__abstract
    text-align: justify;

    @media (max-width: $md)
      display: none;

  &__date
    color: darken($grey, 40);
    margin-top: 0;
    font-size: 14px;

    @media (max-width: $md)
      color: black;
      padding-bottom: $mobile_padding;
      border-bottom: 1px solid $blue;

  &__title
    margin-bottom: 0;

    .newsPostPreview__link
      margin-bottom: 5px;
      font-family: NoeDisplay;

      &:hover
        text-decoration: underline;

  &.newsPostPreview--small
    .newsPostPreview__title
      font-size: 18px;

    &:hover
      opacity: 0.85;

  .newsPostPreview__link
    color: $blue;
    transition: all 0.2s;
    display: block;
    position: relative;

    &.newsPostPreview__readMoreLink
      @media (max-width: $md)
        display: none;

    .fa-icon
      position: absolute;
      right: 0;
      top: 4px;

    &:hover
      text-decoration: underline;
      opacity: 0.8;
</style>
