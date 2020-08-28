<template>
  <div class="page newsPage">
    <div class="pageTitle">
      <h1 class="pageTitleText">Noticias</h1>
    </div>
    <Loader :loading="initialDataLoading" />
    <div class="newsPage__topGrid">
      <NewsPostThumbnail
        :small="!onBigScreen"
        :post="post"
        v-bind:key="post.id"
        v-for="post in homeNews"
      />
    </div>
    <div class="newsPage__grid">
      <NewsPostThumbnail
        small
        :post="post"
        v-bind:key="post.id"
        v-for="post in news"
      />
      <infinite-loading @infinite="infiniteHandler">
        <div slot="spinner"></div>
        <div slot="no-more"></div>
        <div slot="no-results"></div>
      </infinite-loading>
      <Loader
        v-if="!initialDataLoading && news.length"
        :loading="isLoading"
        size="20px"
      />
    </div>
  </div>
</template>
<script lang="ts" src="./newsPage.ts"></script>
<style lang="stylus">
@import '../../../styles/variables.styl';

$grid_padding = 25px;
// $mobile_grid_padding = '10px %s' % $grid_padding;

.newsPage
  .pageTitleText
    margin-bottom: 0;

    @media (max-width: $md)
      padding-left: 15px;

  &__topGrid, &__grid
    width: 100%;
    display: flex;

    @media (max-width: $md)
      flex-direction: column;

  &__topGrid
    .newsGridItem
      width: 50%;
      margin: 1em 0;

      @media (max-width: $md)
        width: 100%;

      &.newsPostPreview
        padding: $grid_padding;

        @media (max-width: $md)
          margin: 0;
          padding: $mobile_padding;

      &:first-child
        padding-left: 0;

        @media (max-width: $md)
          padding-left: $mobile_padding;
          padding-right: $mobile_padding;

      &:last-child
        padding-right: 0;

        @media (max-width: $md)
          padding-left: $mobile_padding;
          padding-right: $mobile_padding;

      hr
        width: 99%;

  &__grid
    flex-wrap: wrap;
    position: relative;
    margin-bottom: 30px;

    > .loader
      height: 20px;
      bottom: 20px;
      top: calc(100% + 20px);
      transform: none;
      margin: auto 0;
      left: 0;
      right: 0;

    .newsGridItem
      width: 33.3%;
      margin: 1em 0;

      @media (max-width: $md)
        width: 100%;

      &.newsPostPreview
        padding: $grid_padding;

        @media (max-width: $md)
          padding: $mobile_padding;
          margin: 0;

      // Grid of 3 items
      // first in the middle
      &:nth-child(3n + 1)
        &.newsPostPreview
          padding-left: 0;

          @media (max-width: $md)
            padding-left: $mobile_padding;

      // last in the middle
      &:nth-child(3n)
        &.newsPostPreview
          padding-right: 0;

          @media (max-width: $md)
            padding-right: $mobile_padding;
</style>
