<template>
  <div class="page">
    <div class="newsPostPage">
      <div v-if="post && !isLoading" class="newsPostPageLeft">
        <Media :youtubeUrl="post.video_url" :gallery="post.gallery" />

        <h1 v-html="post.title" class="pageTitleText"></h1>
        <ActivitySchedule
          v-if="post.activity_date"
          :calendarUrl="post.activity_calendar_url"
          :date="post.activity_date"
          :isDisabled="post.activity_date_has_passed"
        />
        <div v-else class="newsPostDate">Publicado el {{ post.date }}</div>

        <p v-html="post.abstract" class="newsPostAbstract"></p>

        <div class="pageBody" v-html="post.text"></div>
        <hr v-if="!onBigScreen" />
      </div>
      <div
        v-if="latestNews.length && onBigScreen && !isLoading"
        class="newsPostPageRight latestNews"
      >
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
            <ProgressiveImage
              :src="post.thumbnail"
              :height="MOBILE_IMG_HEIGHT"
            />
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
      <div
        v-else-if="latestNews.length && !onBigScreen && !isLoading"
        class="newsPostPageRight"
      >
        <h3 class="latestPostsTitle">Últimas noticias</h3>
        <NewsPostMobileThumbnail
          v-for="post in latestNews"
          v-bind:key="post.id"
          :post="post"
        />
      </div>
      <div v-else class="newsPostPageRight latestNews"></div>
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

  @media (max-width: $md)
    flex-direction: column;
    padding: 0;

  // Single news post content
  .newsPostPageLeft
    // .newsPostPageRight is same but with 0.2 as ratio
    width: 'calc(%s * 0.8)' % $boxed_content_max_width;
    margin-right: 25px;

    @media (max-width: $md)
      width: 100%;
      display: block;

    hr
      display: none;

      @media (max-width: $md)
        display: block;
        margin-left: $mobile_padding;
        margin-right: $mobile_padding;
        border-bottom: 2px solid $blue;
        margin-bottom: 1em;

    .pageTitleText
      color: $blue;

      @media (max-width: $md)
        padding: 0 10px;

    .newsPostAbstract
      font-weight: bold;

      @media (max-width: $md)
        padding: 0 $mobile_padding;

    .newsPostDate
      color: $latest_posts_grey;

      @media (max-width: $md)
        padding: 0 $mobile_padding;

    .pageBody
      @media (max-width: $md)
        padding: 0 $mobile_padding;

  // Latest news
  .newsPostPageRight
    @media (max-width: $md)
      width: 100%;
      padding: 0 $mobile_padding;

    .latestPostsTitle
      @media (max-width: $md)
        width: 100%;
        border-bottom: 1px solid darken($grey, 10);
        margin-bottom: 1em !important;

    latest_posts();
</style>
