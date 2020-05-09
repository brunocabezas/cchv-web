<template>
  <div class="home-carousel">
    <Loader v-if="!ready" />
    <vue-carousel
      v-if="ready"
      class="carousel"
      :navigate-to="activeImg"
      :perPage="1"
    >
      <slide v-bind:key="img.ID" v-for="img in carousel">
        <img v-bind:key="img.ID" :src="img.url" />

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
import { useAsyncState } from "@vueuse/core";
import Icon from "vue-awesome/components/Icon.vue";
import apiRoutes from "../../api/apiRoutes";
import client from "../../api/client";
import Loader from "@/components/Loader.vue";
import { getCustomField } from "../../utils/api";
import { Carousel as VueCarousel, Slide } from "vue-carousel";
import { Carousel, CarouselKeys, CarouselImage } from "../../types/customFieldsTypes";
import { WpResponseData, WPResponseItem } from "../../types/wordpressTypes";

const initialState: WpResponseData = [];

const HomeCarousel = defineComponent({
  name: "HomeCarousel",
  components: { Loader, VueCarousel, Slide, "v-icon": Icon },
  setup() {
    const activeImg = ref(0);
    const { state: asyncState, ready } = useAsyncState<WpResponseData>(
      client.get(apiRoutes.HomeCarousel).then(t =>t.data),
      initialState
    );

    // TODO add type def
    const carousel = computed<WpResponseData>(() => {
      if (!asyncState.value[0]) return [];
      // Displaying the first carousel only
      const wpRes: WPResponseItem = asyncState.value[0];
      return getCustomField(wpRes, CarouselKeys.images);
    });

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
      ready,
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

.VueCarousel-wrapper, .home-carousel
  height: $carousel_height;

.home-carousel
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
