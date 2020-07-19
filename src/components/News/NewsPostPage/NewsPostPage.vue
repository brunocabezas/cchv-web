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
        <h3 class="latestPostsTitle">Últimas noticias</h3>
        <hr />
        <div
          class="latestPostsItem"
          v-bind:key="post.id"
          v-for="(post, index) in latestNews"
        >
          <router-link
            :title="post.title"
            :to="getNewsPostUrlBySlug(post.slug)"
          >
            <ProgressiveImage :src="post.thumbnail" height="100px" />
          </router-link>
          <h4 class="latestPostsItem__title">
            <router-link
              v-html="post.title"
              :title="post.title"
              :to="getNewsPostUrlBySlug(post.slug)"
            ></router-link>
          </h4>
          <p class="latestPostsItem__date">{{ post.date }}</p>
          <hr v-if="latestNews.length > index + 1" />
        </div>
      </div>
      <Loader v-if="isLoading" />
    </div>
  </div>
</template>

<script lang="ts" src="./newsPostPage.ts"></script>
<style lang="stylus">
@import '../../../styles/variables.styl';

.newsPostPage
  display: flex;
  padding-top: 2em;

  // Single news post content
  .newsPostPageLeft
    width: 80%;
    flex-grow: 1;
    margin-right: 25px;

    .pageTitleText
      color: $blue;

    .newsPostAbstract
      font-weight: bold;

    .newsPostDate
      color: $latest_posts_grey;

  // Latest news
  .newsPostPageRight
    latest_posts();
</style>
