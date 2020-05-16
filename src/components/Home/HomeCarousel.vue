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
        <a :title="img.name" target="_blank" :href="img.url">
          <img v-bind:key="img.id" :src="img.image" />
        </a>
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
      </slide>
    </vue-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from "@vue/composition-api";
import { Carousel as VueCarousel, Slide } from "vue-carousel";
import { useAsyncState } from "@vueuse/core";
import Icon from "vue-awesome/components/Icon.vue";
import apiRoutes from "@/api/apiRoutes";
import client from "@/api/client";
import Loader from "@/components/Loader.vue";
import { getCustomField } from "@/utils/api";
import { Carousel, CarouselImage } from "@/types/customFieldsTypes";
import { WpResponseData, WPResponseItem } from "@/types/wordpressTypes";
import useCarouselImages from "@/factories/useCarouselImages";
const initialState: WpResponseData = [];

const HomeCarousel = defineComponent({
  name: "HomeCarousel",
  components: { Loader, VueCarousel, Slide, "v-icon": Icon },
  setup() {
    const activeImg = ref(0);
    const { carousel, fetchCarouselImages, isLoading } = useCarouselImages();

    fetchCarouselImages();

    function goToNextImg() {
      if (activeImg.value === carousel.value.length - 1) {
        activeImg.value = 0;
      } else {
        activeImg.value = activeImg.value + 1;
      }
    }

    function goToPrevImg() {
      if (activeImg.value === 0) {
        activeImg.value = carousel.value.length - 1;
      } else {
        activeImg.value = activeImg.value - 1;
      }
    }

    return {
      isLoading,
      carousel,
      activeImg,
      goToNextImg,
      goToPrevImg
    };
  }
});
export default HomeCarousel;
</script>

<style lang="stylus">
@import '../../styles/variables.styl';

// Viewport height less header height
$carousel_height = 'calc(100vh - %s)' % $header_height;

.VueCarousel-wrapper, .homeCarousel
  height: $carousel_height;

.homeCarousel
  background-color: $blue;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .VueCarousel-slide
    position: relative;

  .carouselImage
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;

  .VueCarousel
    height: 100%;
    width: 100%;
    background-color: $purple;

    .loaderContainer, .carouselButton
      top: 'calc((%s / 2) - 13px)' % $carousel_height;

    .carouselButton
      z-index: 1;
      background-color: transparent;
      border: none;
      position: absolute;
      cursor: pointer;

      &.carouselButton--next
        right: 15px;

      &.carouselButton--prev
        left: 15px;
</style>
