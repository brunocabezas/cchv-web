<template>
  <div class="news homeSection">
    <div title="Ir a noticias" class="homeSection__title">
      <nuxt-link :to="newsGridUrl"><h1>Noticias</h1> </nuxt-link>
      <nuxt-link v-if="onBigScreen" :to="newsGridUrl"
        ><v-icon :color="MAIN_COLOR" name="chevron-right" scale="1.5"> </v-icon>
      </nuxt-link>
    </div>
    <Loader size="30px" v-if="isLoading" />
    <div v-if="!isLoading && onBigScreen" class="newsList">
      <NewsPostThumbnail
        :post="post"
        v-bind:key="post.id"
        v-for="post in news"
      />
    </div>
    <div v-else-if="!isLoading && !onBigScreen" class="newsList">
      <NewsPostMobileThumbnail
        :post="post"
        v-bind:key="post.id"
        v-for="post in news"
      />
    </div>
    <div class="newsLinkContainer" v-if="!onBigScreen">
      <nuxt-link class="newsLink" :to="newsGridUrl">Ver todas</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" src="./homeNews.ts"></script>

<style lang="stylus" scoped>
@import '~/assets/variables.styl';

.news
  min-height: 500px;

  @media (max-width: $md)
    min-height: auto;

  .homeSection__title
    display: flex;

    &:hover
      opacity: 0.7;

    a
      font-family: NoeDisplay;
      display: flex;
      align-items: center;

      h1
        margin: 0 10px 0 0;

  .newsList
    display: flex;
    padding: 0 10px;

    // min-height: 360px;
    @media (max-width: $md)
      flex-direction: column;

    .newsPostPreview
      &:first-child
        padding-right: 1em;

      &:last-child
        padding-left: 1em;

      hr
        width: 99%;

  .newsLinkContainer
    text-align: center;
    padding: 10px;

    .newsLink
      background-color: $blue;
      color: white;
      padding: 10px;
      margin: 0 auto;
      display: block;

      @media (max-width: $md)
        padding: 5px $mobile_padding;
</style>
