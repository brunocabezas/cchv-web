<template>
  <div class="homeCarousel">
    <Loader v-if="isLoading" color="black" />
    <vue-carousel
      v-if="!isLoading"
      class="carousel"
      :navigate-to="activeImg"
      :perPage="1"
    >
      <slide v-bind:key="img.id" v-for="img in carousel">
        <a
          v-if="img.url && img.image"
          target="_blank"
          class="carouselImage"
          :title="img.name"
          :href="img.url"
          v-bind:style="{
            'background-image': `url(${img.image})`
          }"
        ></a>
        <div
          v-if="!img.url && img.image"
          class="carouselImage"
          v-bind:style="{
            'background-image': `url(${img.image})`
          }"
        ></div>

        <youtube
          v-if="img.video_url && !img.image"
          height="100%"
          width="100%"
          :video-id="getYoutubeIdFromUrl(img.video_url)"
          ref="youtube"
        >
        </youtube>
      </slide>
    </vue-carousel>
    <button
      v-if="carousel.length > 1"
      title="Imagen anterior"
      class="carouselButton carouselButton--prev"
      type="button"
      @click="goToPrevImg"
    >
      <v-icon color="white" name="chevron-left" scale="1.5"> </v-icon>
    </button>
    <button
      v-if="carousel.length > 1"
      title="Siguiente imagen"
      class="carouselButton carouselButton--next"
      type="button"
      @keyup.right="goToNextImg"
      @click="goToNextImg"
    >
      <v-icon color="white" name="chevron-right" scale="1.5"> </v-icon>
    </button>
  </div>
</template>

<script lang="ts" src="./homeCarousel.ts"></script>

<style lang="stylus">
@import '../../../styles/variables.styl';

// Viewport height less header height
$carousel_height = 'calc(100vh - %s)' % $header_height;

.homeCarousel
  height: $carousel_height;

  .VueCarousel-wrapper
    height: $carousel_height;

.homeCarousel
  background-color: $blue;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .carouselImage
    display: block;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;

  .VueCarousel
    height: 100%;
    width: 100%;
    background-color: $blue;

    .VueCarousel-slide
      position: relative;

    .VueCarousel-pagination
      position: absolute;
      bottom: 4em;

    .loaderContainer, .carouselButton
      top: 'calc((%s / 2) - 13px)' % $carousel_height;

.carouselButton
  z-index: 1;
  background-color: $blue;
  border: none;
  position: absolute;
  cursor: pointer;
  padding: 8px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  &.carouselButton--next
    right: 15px;

  &.carouselButton--prev
    left: 15px;
</style>
