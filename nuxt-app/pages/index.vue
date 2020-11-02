<template>
  <div>
    <HomeCarousel />
    <HomeNews />
    <HomeVideos />
  </div>
</template>

<script lang="ts">
import { defineComponent, useMeta } from "@nuxtjs/composition-api";
import HomeCarousel from "@/components/home/HomeCarousel/HomeCarousel.vue";
import HomeNews from "@/components/home/HomeNews/HomeNews.vue";
import HomeVideos from "@/components/home/HomeVideosCarousel/HomeVideosCarousel.vue";

import Vue from "vue";
import { name } from "dayjs/locale/*";
import meta from "~/utils/meta";

export default defineComponent({
  name: "Home",
  head: {},
  components: { HomeCarousel, HomeNews, HomeVideos },
  setup() {
    useMeta(() => ({
      title: "CChV",
      meta: meta({
        title: "CChV",
        url: 'https://www.cchv.cl',
        description:
          "La Corporación Chilena de Video y Artes Electrónicas (CChV) se fundó en 1993 bajo la dirección del videoartista, académico y teórico Néstor Olhagaray (1946 – 2020). Su creación respondió a la necesidad de dar continuidad al legado del Festival Franco-Chileno de Videoarte, un hito para la difusión y desarrollo de las artes mediales en Chile que, con el apoyo de la Embajada de Francia, ofrecía a los artistas nacionales un espacio de libertad creativa y una posibilidad de diálogo con otros creadores y realizadores franceses."
      })
    }));
  }
});
</script>
<style lang="stylus">
@import '~/assets/variables.styl';

.homeSection
  max-width: $boxed_content_max_width;
  page_padding();
  position: relative;
  margin: 0 auto;

  @media (max-width: $md)
    width: auto;
    padding-top: 0;

  &__title
    color: $blue;
    margin-bottom: 15px;

    @media (max-width: $md)
      padding: 0 10px;
      margin: 10px 0;
</style>
