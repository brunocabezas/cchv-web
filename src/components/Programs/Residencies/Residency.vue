<template>
  <div class="page">
    <div class="residency">
      <div v-if="residency" class="residencyContent">
        <Media :youtubeUrl="residency.video_url" :gallery="residency.gallery" />

        <h1 v-html="residency.name" class="pageTitleText"></h1>

        <div v-if="!residency.end_date" class="residencyDate">
          {{ residency.date }}
        </div>
        <div v-else class="residencyDate">
          <p>Desde: {{ residency.date }}</p>
          <p>Hasta: {{ residency.end_date }}</p>
        </div>

        <div class="pageBody" v-html="residency.text"></div>
      </div>
      <div v-if="latestResidencies.length" class="latestResidencies">
        <h3 class="latestPostsTitle">Últimas residencias</h3>
        <hr />
        <div
          class="latestPostsItem"
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
          <h4 class="latestPostsItem__title">
            <router-link
              v-html="post.name"
              :title="post.name"
              :to="getResidencyUrlBySlug(post.slug)"
            ></router-link>
          </h4>
          <p v-if="post.end_date" class="latestPostsItem__date">
            {{ post.short_date }}
            {{ post.short_end_date ? ` - ${post.short_end_date}` : "" }}
          </p>
          <p v-else>
            {{ post.date }}
          </p>
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

.residency
  display: flex;
  padding-top: 2em;

  .residencyContent
    width: 80%;
    flex-grow: 1;
    margin-right: 25px;

  // Based on news post page newsPostPageRight
  .latestResidencies
    latest_posts();

  .pageTitleText
    margin-bottom: 0;

  .residencyDate
    color: #868686;

    > p
      color: #868686;
</style>
