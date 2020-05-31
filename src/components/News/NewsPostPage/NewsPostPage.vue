<template>
  <div class="page">
    <div class="newsPostPage">
      <div v-if="post" class="newsPostPageLeft">
        <Media :youtubeUrl="post.video_url" :gallery="post.gallery" />

        <h1 class="pageTitleText">{{ post.title }}</h1>

        <div class="">{{ post.date }}</div>

        <p v-html="post.abstract" class="newsPostAbstract"></p>

        <div class="pageBody" v-html="post.text"></div>
      </div>
      <div
        v-if="post && post.related && post.related.length > 0"
        class="newsPostPageRight newsPostRelated"
      >
        <h3 class="newsPostRelatedTitle">Noticias relacionadas</h3>
        <hr />
        <div v-bind:key="post.id" v-for="post in post.related">
          <router-link :title="post.title" :to="getNewsPostUrl(post.slug)">
            <div
              class="newsPostRelated__thumb"
              v-bind:style="{ 'background-image': `url(${post.thumbnail})` }"
            ></div
          ></router-link>
          <h4 class="newsPostRelated__title">
            <router-link :title="post.title" :to="getNewsPostUrl(post.slug)">{{
              post.title
            }}</router-link>
          </h4>
          <p class="newsPostRelated__date">{{ post.date }}</p>
        </div>
      </div>
      <Loader v-if="isLoading" />
    </div>
  </div>
</template>

<script lang="ts" src="./newsPostPage.ts"></script>
<style scoped lang="stylus">
@import '../../../styles/variables.styl';

.newsPostPage
  display: flex;

  .newsPostPageRight
    width: 20%;
    padding: 10px;

    .newsPostRelatedTitle
      color: $black;
      margin-bottom: 0;
      margin-top: 0;

    .newsPostRelated__title
      margin-top: 5px;
      margin-bottom: 5px;

      &:hover
        text-decoration: underline;

    .newsPostRelated__date
      margin-top: 0;

    .newsPostRelated__thumb
      height: 100px;
      background-color: $blue;
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;

  .newsPostPageLeft
    width: 80%;
    flex-grow: 1;

    .pageTitleText
      color: $blue;

    .newsPostAbstract
      font-weight: bold;
</style>
