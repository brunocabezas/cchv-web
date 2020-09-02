<template>
  <div class="pageRow programVideos">
    <h1 class="pageTitle">Videos Ganadores</h1>
    <Loader :loading="isLoading" />
    <div class="programVideosList">
      <div
        v-bind:key="video.id"
        v-for="video in programVideos"
        class="programVideoContainer"
      >
        <div class="programVideo">
          <div class="programVideo__meta">
            <div v-if="!onBigScreen" class="programVideo__player">
              <Media
                :gallery="video.thumbnail ? [{ url: video.thumbnail }] : []"
                :youtubeUrl="video.url"
                height="100%"
              />
            </div>
            <h2 v-if="video.event" class="programVideo__title">
              {{ video.event }}
            </h2>
            <h3 class="programVideo__title">{{ video.name }}</h3>
            <div class="programVideo__videoData">
              <div>Autor: {{ video.author }}</div>
              <div>Duración: {{ video.duration }}</div>
              <div>Año: {{ video.year }}</div>
              <div>País: {{ video.country }}</div>
            </div>
            <div
              class="pageBody pageText programVideo__text"
              v-html="video.text"
            />
          </div>
          <div v-if="onBigScreen" class="programVideo__player">
            <Media
              :gallery="video.thumbnail ? [{ url: video.thumbnail }] : []"
              :youtubeUrl="video.url"
              height="100%"
            />
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import Loader from "@/components/Loader.vue";
import Media from "@/components/Media/Media.vue";
import useProgramVideos from "@/models/useProgramVideos";
import useMediaQueries from "@/hooks/useMediaQueries";

const DowneyProgramVideos = defineComponent({
  name: "DowneyProgramVideos",
  components: {
    Loader,
    Media
  },
  setup(props) {
    const { onBigScreen } = useMediaQueries();
    const { programVideos, isLoading, fetchProgramVideos } = useProgramVideos();

    fetchProgramVideos();

    return { programVideos, isLoading, onBigScreen };
  }
});

export default DowneyProgramVideos;
</script>
<style lang="stylus">
@import '../../styles/variables.styl';

$margin_between_videos = 2em;

.programVideos
  min-height: 500px;
  position: relative;
  display: flex;
  flex-direction: column;

  .programVideoContainer
    margin-bottom: $margin_between_videos;

    .programVideo
      margin: 15px 0;
      height: 330px;
      display: flex;

      @media (max-width: $md)
        flex-direction: column;
        height: auto;

      &__title
        margin-top: 0;
        margin-bottom: 5px;

        @media (max-width: $md)
          margin-top: 5px;

      &__text
        text-align: justify;

      &__videoData
        color: $blue;

      &__meta
        padding-right: 10px;
        width: 40%;
        max-height: 100%;
        overflow-y: auto;

        @media (max-width: $md)
          width: 100%;
          padding-right: 0;

      &__player
        margin-left: 15px;
        width: 60%;

        @media (max-width: $md)
          width: 100%;
          margin-left: 0;

  hr
    width: 100%;
    margin-top: $margin_between_videos;
    display: block;
</style>
