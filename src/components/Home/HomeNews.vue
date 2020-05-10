<template>
  <div class="news homeSection">
    <h1 class="news__title homeSection__title">
      <router-link :to="newsGridUrl"
        >noticias
        <v-icon color="#00009f" name="chevron-right" scale="1.5"> </v-icon>
      </router-link>
    </h1>
    <Loader v-if="loading" />
    <div v-if="!loading" class="newsList">
      <div v-bind:key="post.ID" v-for="post in news" class="newsPost">
        <div
          class="newsPost__thumbnail"
          v-bind:style="{ 'background-image': `url(${post.imageUrl})` }"
          :alt="post.title"
        />
        <h3 class="newsPost__title">{{ post.title }}</h3>
        <p>{{ post.date }}</p>
        <p>{{ post.abstract }}</p>
        <a>Leer noticia completa</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./homeNews.ts"></script>

<style lang="stylus" scoped>
@import '../../styles/variables.styl';

.news
  min-height 400px
  
  &__title
    color: $blue;

  .newsList
    display: flex;

    .newsPost
      flex: 1;
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
