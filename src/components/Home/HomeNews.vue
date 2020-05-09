<template>
  <div class="news homeSection">
    <h1 class="news__title homeSection__title">
      <router-link :to="newsGridUrl"
        >noticias
        <v-icon color="#00009f" name="chevron-right" scale="1.5"> </v-icon>
      </router-link>
    </h1>
    <Loader v-if="!ready" />
    <div v-if="ready" class="newsList">
      <div v-bind:key="post.ID" v-for="post in news" class="newsPost">
        <div
          class="newsPost__thumbnail"
          v-bind:style="{ 'background-image': `url(${post.thumbnail})` }"
          :alt="post.title"
        />
        <h3 class="newsPost__title">{{ post.title }}</h3>
        <p>{{ post.date }}</p>
        <p>{{ post.abstract }}</p>
        <a>Leer noticia completa</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, computed, Ref } from "@vue/composition-api"
import { useAsyncState } from "@vueuse/core"
import apiRoutes from "@/api/apiRoutes"
import Icon from "vue-awesome/components/Icon.vue"
import client from "@/api/client"
import Loader from "@/components/Loader.vue"
import { getCustomField, getWPTitle } from "@/utils/api"
import { NewsKeys } from "@/types/customFieldsTypes"
import { WpResponseData } from "@/types/wordpressTypes"
import AppUrls from "@/utils/urls"
import View from "@/types/viewTypes.ts"
import helpers from "@/utils/customFields"

const initialState: WpResponseData = []

const HomeNews = createComponent({
  name: "HomeNews",
  components: { Loader, "v-icon": Icon },
  setup() {
    const { state, ready } = useAsyncState<WpResponseData>(
      client.get(apiRoutes.HomeNews).then((t) => t.data),
      initialState
    )

    const news: Readonly<Ref<Readonly<View.News>>> = computed(() => {
      return helpers.mapNewsToView(state.value)
    })

    return { ready, news, newsGridUrl: AppUrls.News }
  },
})
export default HomeNews
</script>

<style lang="stylus" scoped>
@import '../../styles/variables.styl';

.news
  &__title
    color: $blue;

  .newsList
    display: flex;

    .newsPost
      flex: 1;
      padding: 1em;

      &:first-child
        padding-left: 0;

      &:last-child
        padding-right: 0;

      &__title
        color: $blue;

      &__thumbnail
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        height: 300px;
        width: 100%;
</style>
