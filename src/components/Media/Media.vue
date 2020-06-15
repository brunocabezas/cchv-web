<template>
  <div class="media carousel" v-bind:style="{ height }">
    <LightBox
      v-if="!hideLightBox"
      ref="lightBoxRef"
      :showLightBox="false"
      :media="lightBoxData"
    ></LightBox>
    <vue-carousel
      :paginationEnabled="false"
      :perPage="1"
      :navigate-to="currentImage"
    >
      <slide v-if="!!youtubeVideoId">
        <youtube
          height="100%"
          width="100%"
          :video-id="youtubeVideoId"
          ref="youtube"
        >
        </youtube>
      </slide>

      <slide
        class="carouselItem"
        v-bind:key="image.id"
        v-for="(image, index) in gallery"
      >
        <button
          v-if="image.url && !hideLightBox"
          type="button"
          v-bind:style="{ height }"
          title="Ampliar imagen"
          class="carouselLightboxOverlay"
          @click="openLightBox(index)"
        >
          <ProgressiveImage :height="height" :src="image.url">
          </ProgressiveImage>
        </button>
        <ProgressiveImage
          v-if="image.url && hideLightBox"
          :height="height"
          :src="image.url"
        >
        </ProgressiveImage>
      </slide>
    </vue-carousel>
    <button
      v-if="gallery.length > 1"
      title="Imagen anterior"
      class="carouselButton carouselButton--prev"
      type="button"
      @click="goToPrevItem"
    >
      <v-icon color="white" name="chevron-left" scale="1.5"> </v-icon>
    </button>
    <button
      v-if="gallery.length > 1"
      title="Siguiente imagen"
      class="carouselButton carouselButton--next"
      type="button"
      @keyup.right="goToNextItem"
      @click="goToNextItem"
    >
      <v-icon color="white" name="chevron-right" scale="1.5"> </v-icon>
    </button>
  </div>
</template>

<script lang="ts" src="./media.ts"></script>
<style lang="stylus">
@import '../../styles/variables.styl';

.media
  display: block;
  width: 100%;
  background-color: $blue;

.carousel
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  hr
    display: none;

  .carouselButton--next
    right: 0;

  .carouselButton--prev
    left: 0;

  .carouselLightboxOverlay
    cursor: pointer;
    display: block;
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: transparent;
    border: none;

    > div > span
      height: 100%;

  .carouselButton
    z-index: 1;
    background-color: transparent;
    border: none;
    position: absolute;
    cursor: pointer;

  .carouselImage
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;

.VueCarousel
  height: 100%;
  width: 100%;
  background-color: black;

  hr
    display: none;

  .carouselButton
    &.carouselButton--next
      right: 10px;

    &.carouselButton--prev
      left: 10px;

  .VueCarousel-wrapper
    position: relative;

  .VueCarousel-wrapper, .carouselImage, .VueCarousel-inner
    height: 100% !important;
    width: 100%;
</style>
