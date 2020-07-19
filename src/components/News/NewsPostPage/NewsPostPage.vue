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
        <div v-bind:key="post.id" v-for="(post, index) in latestNews">
          <router-link
            :title="post.title"
            :to="getNewsPostUrlBySlug(post.slug)"
          >
            <ProgressiveImage :src="post.thumbnail" height="100px" />
          </router-link>
          <h4 class="latestNews__title">
            <router-link
              v-html="post.title"
              :title="post.title"
              :to="getNewsPostUrlBySlug(post.slug)"
            ></router-link>
          </h4>
          <p class="latestNews__date">{{ post.date }}</p>
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

$grey = #868686;

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
      color: $grey;

  // Latest news
  .newsPostPageRight
    width: 'calc(%s * 0.2)' % $boxed_content_max_width;

    .latestNewsTitle
      margin-bottom: 0;
      margin-top: 0;

    hr
      border: 1px solid $grey;
      margin-top: 2px;
      margin-bottom: 15px;

    .latestNews__title
      margin-top: 5px;
      margin-bottom: 5px;

      &:hover
        text-decoration: underline;

    .latestNews__date
      margin-top: 0;
      color: $grey;
      margin-bottom: 8px;
      font-size: 14px;

    .progressiveImage:hover
      opacity: 0.9;
</style>
