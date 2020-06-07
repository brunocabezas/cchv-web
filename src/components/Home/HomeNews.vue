<template>
  <div class="news homeSection">
    <div title="Ir a noticias" class="homeSection__title">
      <router-link :to="newsGridUrl"><h1>noticias</h1> </router-link>
      <router-link :to="newsGridUrl"
        ><v-icon :color="MAIN_COLOR" name="chevron-right" scale="1.5"> </v-icon>
      </router-link>
    </div>
    <Loader v-if="isLoading" />
    <div v-if="!isLoading" class="newsList">
      <NewsThumb :post="post" v-bind:key="post.id" v-for="post in news" />
    </div>
  </div>
</template>

<script lang="ts" src="./homeNews.ts"></script>

<style lang="stylus" scoped>
@import '../../styles/variables.styl';

.news
  min-height: 400px;

  .homeSection__title
    display: flex;

    &:hover
      opacity: 0.7;

    a
      font-family: NoeDisplay;

      h1
        margin: 0 10px 0 0;

      svg
        margin-top: 10px;

  .newsList
    display: flex;

    .newsPost
      flex: 1;
      max-width: 50%;
      padding: 1em;

      &:first-child
        padding-left: 0;

      &:last-child
        padding-right: 0;

      &__title
        color: $blue;

      &__thumbnail
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        height: 300px;
        width: 100%;
</style>
