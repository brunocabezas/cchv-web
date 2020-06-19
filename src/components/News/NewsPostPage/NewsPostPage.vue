<template>
  <div class="page">
    <div class="newsPostPage">
      <div v-if="post" class="newsPostPageLeft">
        <Media :youtubeUrl="post.video_url" :gallery="post.gallery" />

        <h1 v-html="post.title" class="pageTitleText"></h1>

        <div class="newsPostDate">{{ post.date }}</div>

        <p v-html="post.abstract" class="newsPostAbstract"></p>

        <div class="pageBody" v-html="post.text"></div>
      </div>
      <div v-if="latestNews.length" class="newsPostPageRight latestNews">
        <h3 class="latestNewsTitle">Últimas noticias</h3>
        <hr />
        <div v-bind:key="post.id" v-for="post in latestNews">
          <router-link :title="post.title" :to="getNewsPostUrl(post.slug)">
            <div
              class="latestNews__thumb"
              v-bind:style="{ 'background-image': `url(${post.thumbnail})` }"
            ></div>
          </router-link>
          <h4 class="latestNews__title">
            <router-link
              v-html="post.title"
              :title="post.title"
              :to="getNewsPostUrl(post.slug)"
            ></router-link>
          </h4>
          <p class="latestNews__date">{{ post.date }}</p>
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

  .newsPostPageLeft
    width: calc(1280px * 0.5);

  .newsPostPageRight
    top: 0;
    right: calc(1280px * -0.2);
    padding: 0 10px;
    width: calc(1280px * 0.2);

    .latestNewsTitle
      margin-bottom: 0;
      margin-top: 0;

    hr
      color: $blue;
      margin-top: 2px;
      margin-bottom: 15px;

    .latestNews__title
      margin-top: 5px;
      margin-bottom: 5px;

      &:hover
        text-decoration: underline;

    .latestNews__date
      margin-top: 0;

    .latestNews__thumb
      height: 100px;
      background-color: $blue;
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;

      &:hover
        opacity: 0.9;

  .newsPostPageLeft
    width: 80%;
    flex-grow: 1;
    margin-right: 25px;

    .pageTitleText
      color: $blue;

    .newsPostAbstract
      font-weight: bold;
</style>
