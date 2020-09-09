<template>
  <div class="homeVideos homeSection">
    <h1 class="homeSection__title">{{ YOUTUBE_CHANNEL_LABEL }}</h1>
    <div class="homeVideosCarousel">
      <Loader v-if="isLoading" />
      <carousel
        loop
        v-if="!isLoading"
        class="carousel"
        :navigate-to="activeVideo"
        :perPage="1"
        :paginationSize="paginationSize"
        :paginationActiveColor="MAIN_COLOR"
      >
        <slide
          class="homeVideosCarousel"
          v-bind:key="video.id"
          v-for="video in videos"
        >
          <youtube
            class="homeVideosCarouselItem"
            v-if="video && video.video_url"
            width="100%"
            :resize="true"
            @playing="onPlay"
            @paused="onPause"
            @ended="onStop"
            :video-id="getYoutubeIdFromUrl(video.video_url)"
          >
          </youtube>
        </slide>
      </carousel>
      <button
        v-if="videos.length > 1 && displayControls"
        title="Atrás"
        class="carouselButton carouselButton--prev"
        type="button"
        @click="goToPrevSlide"
        @keyup.left="goToNextSlide"
      >
        <v-icon color="white" name="chevron-left" :scale="iconScale"> </v-icon>
      </button>
      <button
        v-if="videos.length > 1 && displayControls"
        title="Siguiente"
        class="carouselButton carouselButton--next"
        type="button"
        @keyup.right="goToNextSlide"
        @click="goToNextSlide"
      >
        <v-icon color="white" name="chevron-right" :scale="iconScale"> </v-icon>
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

    @media (max-width: $md)
      border-top: 1px solid black;

  .homeVideosCarousel
    position: relative;
    height: 500px;

    @media (max-width: $md)
      height: 300px;

      .VueCarousel
        .VueCarousel-pagination
          display: block;

    // Pagination dots are displayed only on hover
    &:hover
      .VueCarousel
        .VueCarousel-pagination
          display: block;

    // Carousel dots
    .VueCarousel
      .VueCarousel-pagination
        display: none;
        position: absolute;
        bottom: 10px;

    .homeVideosCarouselItem
      height: 100%;

  .carouselButton
    position: absolute;
    top: 240px;

    @media (max-width: $md)
      top: 140px;

    &--next
      right: -60px;

      @media (max-width: $md)
        right: 5px;
        opacity .9

    &--prev
      left: -60px;

      @media (max-width: $md)
        left: 5px;
        opacity .9
</style>