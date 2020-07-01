<template>
  <div class="homeVideos homeSection">
    <h1 class="homeSection__title">CChV TV</h1>
    <div class="homeVideosCarousel">
      <Loader v-if="isLoading" />
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
            :video-id="getYoutubeIdFromUrl(video.video_url)"
          >
          </youtube>
        </slide>
      </carousel>
      <button
        v-if="videos.length > 1"
        title="Atrás"
        class="carouselButton carouselButton--prev"
        type="button"
        @click="goToPrevSlide"
        @keyup.left="goToNextSlide"
      >
        <v-icon color="white" name="chevron-left" scale="1.5"> </v-icon>
      </button>
      <button
        v-if="videos.length > 1"
        title="Siguiente"
        class="carouselButton carouselButton--next"
        type="button"
        @keyup.right="goToNextSlide"
        @click="goToNextSlide"
      >
        <v-icon color="white" name="chevron-right" scale="1.5"> </v-icon>
      </button>
    </div>
  </div>
</template>

<script lang="ts" src="./homeVideosCarousel.ts"></script>

<style lang="stylus">
@import '../../../styles/variables.styl';

.homeVideos
  &.homeSection
    margin-bottom: 2em;
    margin-top: 0;
    padding-top: 0;

  .homeVideosCarousel
    position: relative;
    height: 500px;

    &:hover
      .VueCarousel
        .VueCarousel-pagination
          display: block;

    .VueCarousel
      .VueCarousel-pagination
        display: none;
        position: absolute;
        bottom: 10px;

  .carouselButton
    position: absolute;
    top: 240px;

    &--next
      right: -60px;

    &--prev
      left: -60px;
</style>