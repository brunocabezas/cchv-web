<template>
  <div class="page newsPage">
    <div class="pageTitle">
      <h1 class="pageTitleText">Noticias</h1>
      <!-- <div class="pageTitleInput">search input</div>-->
    </div>
    <Loader v-if="initialDataLoading" />
    <div class="newsPage__topGrid">
      <NewsThumb :post="post" v-bind:key="post.id" v-for="post in homeNews" />
    </div>
    <div class="newsPage__grid">
      <NewsThumb small :post="post" v-bind:key="post.id" v-for="post in news" />
      <infinite-loading @infinite="infiniteHandler">
        <div slot="spinner"></div>
        <div slot="no-more"></div>
      </infinite-loading>
      <Loader v-if="!initialDataLoading" :loading="isLoading" size="20px" />
    </div>
  </div>
</template>
<script lang="ts" src="./newsPage.ts"></script>
<style lang="stylus">
@import '../../../styles/variables.styl';

$grid_padding = 25px;

.newsPage
  .pageTitleText
    margin: 0;

  &__topGrid, &__grid
    width: 100%;
    display: flex;

  &__topGrid
    .newsGridItem
      width: 50%;
      margin: 1em 0;

      &.newsPostPreview
        padding: $grid_padding;

      &:first-child
        padding-left: 0;

      &:last-child
        padding-right: 0;

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

      &.newsPostPreview
        padding: $grid_padding;

      // Grid of 3 items
      // first in the middle
      &:nth-child(3n + 1)
        &.newsPostPreview
          padding-left: 0;

      // item in the middle
      &:nth-child(3n + 2)
        &.newsPostPreview
          hr
            width: calc(100% - 50px);

      // last in the middle
      &:nth-child(3n)
        &.newsPostPreview
          padding-right: 0;
</style>
