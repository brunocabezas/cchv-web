<template>
  <div class="news homeSection">
    <carousel
      loop
      v-if="!isLoading"
      class="carousel"
      :navigate-to="activeVideo"
      :perPage="1"
    >
      <slide v-bind:key="video.id" v-for="video in videos">
        <youtube
          v-if="video && video.video_url"
          height="100%"
          width="100%"
          :video-id="getYoutubeIdFromUrl(img.video_url)"
        >
        </youtube>
      </slide>
    </carousel>
  </div>
</template>

<script lang="ts" src="./homeVideosCarousel.ts"></script>

<style lang="stylus" scoped>
@import '../../../styles/variables.styl';

.news
  height: 400px;
</style>