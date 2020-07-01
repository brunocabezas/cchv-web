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
      <div
        class="newsPostPreview__thumbnail"
        v-bind:style="{ 'background-image': `url(${post.thumbnail})` }"
        :alt="post.title"
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
    <p v-ellipsis="6" class="newsPostPreview__abstract">
      {{ post.abstract }}
    </p>
    <router-link
      :title="post.title"
      class="newsPostPreview__link"
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
import { NewsPost } from "@/types/viewTypes";
import Icon from "vue-awesome/components/Icon.vue";
import AppUrls from "@/utils/urls";
import useNews from "../../factories/useNews";
import { MAIN_COLOR } from "../../utils/static";

export default defineComponent({
  name: "NewsThumb",
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
  components: { "v-icon": Icon },
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
    position: absolute;
    bottom: 0;
    color: #344284;
    width: calc(100% - 30px);

  &__date, &__abstract
    margin: 10px 0;

  &__date
    color: darken($grey, 40);
    margin-top: 0;
    font-size: 14px;

  &__title
    margin-bottom: 0;

    .newsPostPreview__link
      margin-bottom: 5px;
      font-family: NoeDisplay;

  &.newsPostPreview--small
    .newsPostPreview__title
      font-size: 18px;

    .newsPostPreview__thumbnail
      height: 150px;

  &__thumbnail
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 300px;
    width: 100%;
    transition: all 0.2s;

    &:hover
      opacity: 0.85;

  &__link
    color: $blue;
    transition: all 0.2s;
    display: block;
    position: relative;

    .fa-icon
      position: absolute;
      right: 0;
      top: 4px;

    &:hover
      text-decoration: underline;
      opacity: 0.8;
</style>
