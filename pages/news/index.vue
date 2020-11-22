<template>
  <div class="page newsPage">
    <div class="pageTitle">
      <h1 class="pageTitleText">Noticias</h1>
    </div>
    <div class="newsPage__topGrid">
      <NewsPostThumbnail
        :small="!onBigScreen"
        :post="post"
        v-bind:key="post.id"
        v-for="post in highlightedNews"
      />
    </div>
    <div class="newsPage__grid">
      <NewsPostThumbnail
        small
        :post="post"
        v-bind:key="post.id"
        v-for="post in news"
      />
      <Loader v-if="news.length" :loading="isLoading" size="20px" />
    </div>
    <infinite-loading @infinite="infiniteHandler">
      <div slot="spinner"></div>
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="stylus" src="./index.styl"></style>
