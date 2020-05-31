<template>
  <div class="media carousel">
    <LightBox
      ref="lightBoxRef"
      :showLightBox="false"
      :media="lightBoxData"
    ></LightBox>
    <vue-carousel
      :paginationEnabled="false"
      :perPage="1"
      :navigate-to="currentImage"
    >
      <slide>
        <youtube
          height="100%"
          width="100%"
          :video-id="youtubeVideoId"
          ref="youtube"
        >
        </youtube>
      </slide>
      <slide v-bind:key="image.id" v-for="(image, index) in gallery">
        <button
          type="button"
          title="Ampliar imagen"
          class="carouselLightboxOverlay"
          @click="openLightBox(index)"
        >
          <ProgressiveImage :src="image.url"> </ProgressiveImage>
        </button>
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

<script lang="ts" src="./media"></script>
<style lang="stylus">
@import '../../styles/variables.styl';

.media
  display: block;
  width: 100%;
  background-color: $blue;
  height: 500px;
</style>

<style lang="stylus" scoped>
.carousel
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;

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
</style>

<style lang="stylus">
// @import '../../../styles/constants';
// $carousel_height = 300px;
.VueCarousel
  height: 100%;
  width: 100%;
  background-color: black;

  .VueCarousel-slide
    height: 500px;

  hr
    display: none;

  .loaderContainer, .carouselButton
    top: calc((300px / 2) - 13px);

  .carouselButton
    &.carouselButton--next
      right: 10px;

    &.carouselButton--prev
      left: 10px;

  .VueCarousel-wrapper
    position: relative;

  .VueCarousel-wrapper, .carouselImage, .VueCarousel-inner
    // height: 300px !important;
    height: 500px;
    width: 100%;

  .progressive-background-image
    height: 500px;
</style>
