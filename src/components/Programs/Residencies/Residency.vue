<template>
  <div class="page">
    <div class="residency">
      <div v-if="residency" class="residencyContent">
        <Media :youtubeUrl="residency.video_url" :gallery="residency.gallery" />

        <h1 v-html="residency.name" class="pageTitleText"></h1>

        <div class="residencyDate">{{ residency.date }}</div>

        <div class="pageBody" v-html="residency.text"></div>
      </div>
      <div v-if="latestResidencies.length" class="latestResidencies">
        <h3 class="latestTitle">Últimas residencias</h3>
        <hr />
        <div
          class="latestItem"
          v-bind:key="post.id"
          v-for="(post, index) in latestResidencies"
        >
          <router-link
            :title="post.name"
            :to="getResidencyUrlBySlug(post.slug)"
          >
            <ProgressiveImage
              :src="post.gallery ? post.gallery[0].url : ''"
              height="100px"
            />
          </router-link>
          <h4 class="latestItem__title">
            <router-link
              v-html="post.name"
              :title="post.name"
              :to="getResidencyUrlBySlug(post.slug)"
            ></router-link>
          </h4>
          <p class="latestItem__date">{{ post.date }}</p>
          <hr v-if="latestResidencies.length > index + 1" />
        </div>
      </div>
      <Loader v-if="isLoading" />
    </div>
  </div>
</template>

<script lang="ts" src="./residency.ts"></script>
<style scoped lang="stylus">
@import '../../../styles/variables.styl';

$margin_between_videos = 2em;
$grey = #868686;

.residency
  display: flex;
  padding-top: 2em;

  .residencyContent
    width: 80%;
    flex-grow: 1;
    margin-right: 25px;

  // Based on news post page newsPostPageRight
  .latestResidencies
    width: 'calc(%s * 0.2)' % $boxed_content_max_width;

    .latestTitle
      margin-bottom: 0;
      margin-top: 0;

    .latestItem
      .progressiveImage:hover
        opacity: 0.9;

      .latestItem__title
        margin-top: 5px;
        margin-bottom: 5px;

        &:hover
          text-decoration: underline;

      .latestItem__date
        margin-top: 0;
        color: $grey;
        margin-bottom: 8px;
        font-size: 14px;

    hr
      border: 1px solid $grey;
      margin-top: 2px;
      margin-bottom: 15px;
</style>
