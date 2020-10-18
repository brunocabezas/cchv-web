<template>
  <div class="media carousel" v-bind:style="{ height: mediaHeight }">
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
          v-bind:style="{ height: mediaHeight }"
          title="Ampliar imagen"
          class="carouselLightboxOverlay"
          @click="openLightBox(index)"
        >
          <ProgressiveImage :height="mediaHeight" :src="image.url">
          </ProgressiveImage>
        </button>
        <ProgressiveImage
          v-if="image.url && hideLightBox"
          :height="mediaHeight"
          :src="image.url"
        >
        </ProgressiveImage>
        <span v-if="image.description" class="carouselItemLegend">{{
          image.description
        }}</span>
      </slide>
    </vue-carousel>
    <button
      v-if="carouselLength > 1"
      title="Imagen anterior"
      class="carouselButton carouselButton--prev"
      type="button"
      @click="goToPrevItem"
    >
      <v-icon color="white" name="chevron-left" scale="1.5"> </v-icon>
    </button>
    <button
      v-if="carouselLength > 1"
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
<style lang="stylus" src="./media.styl"></style>
