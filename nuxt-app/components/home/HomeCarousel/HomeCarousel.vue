<template>
  <div class="homeCarousel">
    <Loader v-if="isLoading" color="black" />
    <vue-carousel
      :loop="true"
      v-if="!isLoading"
      class="carousel"
      :navigate-to="activeImg"
      :paginationSize="paginationSize"
      :paginationActiveColor="MAIN_COLOR"
      :perPage="1"
    >
      <slide v-bind:key="img.id" v-for="img in carousel">
        <nuxt-link
          v-if="img.image && img.url && img.isInternal"
          :title="img.name"
          :to="img.url"
        >
          <ProgressiveImage :src="img.image" height="100%" />
        </nuxt-link>
        <a
          v-if="img.image && img.url && !img.isInternal"
          :title="img.name"
          :href="img.url"
          target="_blank"
        >
          <ProgressiveImage :src="img.image" height="100%" />
        </a>

        <ProgressiveImage
          v-if="img.image && !img.url"
          :src="img.image"
          height="100%"
        />

        <youtube
          v-if="!img.image && img.video_url"
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
      title="Atrás"
      class="carouselButton carouselButton--prev"
      type="button"
      @click="goToPrevImg"
    >
      <v-icon color="white" name="chevron-left" :scale="iconScale"> </v-icon>
    </button>
    <button
      v-if="carousel.length > 1"
      title="Siguiente"
      class="carouselButton carouselButton--next"
      type="button"
      @keyup.right="goToNextImg"
      @click="goToNextImg"
    >
      <v-icon color="white" name="chevron-right" :scale="iconScale"> </v-icon>
    </button>
  </div>
</template>

<script lang="ts" src="./homeCarousel.ts"></script>
<style lang="stylus" src="./homeCarousel.styl"></style>
