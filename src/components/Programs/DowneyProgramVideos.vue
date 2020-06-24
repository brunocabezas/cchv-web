<template>
  <div class="pageRow programVideos">
    <h1>Videos Ganadores</h1>
    <Loader :loading="isLoading" />
    <div class="programVideosList">
      <div
        v-bind:key="video.id"
        v-for="video in programVideos"
        class="programVideoContainer"
      >
        <div class="programVideo">
          <div class="programVideo__meta">
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
          <div class="programVideo__player">
            <Media
              :gallery="[{ url: video.thumbnail }]"
              :youtubeUrl="video.url"
              height="300px"
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
import useProgramVideos from "@/factories/useProgramVideos";

const DowneyProgramVideos = defineComponent({
  name: "DowneyProgramVideos",
  components: {
    Loader,
    Media
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { programVideos, isLoading, fetchProgramVideos } = useProgramVideos();

    fetchProgramVideos();

    return { programVideos, isLoading };
  }
});

export default DowneyProgramVideos;
</script>
<style lang="stylus">
@import '../../styles/variables.styl';

.programVideos
  min-height: 500px;
  position: relative;
  display: flex;
  flex-direction: column;

  .programVideoContainer
    margin-bottom: 4em;

    .programVideo
      margin: 15px 0;
      height: 330px;
      display: flex;

      &__title
        margin-top: 0;

      &__text
        text-align: justify;

      &__videoData
        color: $blue;

      &__meta
        width: 40%;
        padding: 1em 0;
        max-height: 100%;
        overflow-y: auto;

      &__player
        margin: 15px;
        width: 60%;

  hr
    width: 100%;
    margin-top: 1em;
    display: block;
</style>
