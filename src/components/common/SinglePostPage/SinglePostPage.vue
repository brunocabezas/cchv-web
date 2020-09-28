<template>
  <div class="page singlePostPage">
    <Loader :loading="isLoading" />
    <div v-if="page">
      <Media :youtubeUrl="page.video_url" :gallery="page.gallery" />
      <h1 v-html="page.name" class="pageTitleText"></h1>
      <div class="pageBody" v-html="page.text"></div>
      <div v-if="page.pdf" class="pageBody">
        <DownloadLink label="Descargar programa completo" :url="page.pdf" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./singlePostPage.ts"></script>
<style lang="stylus">
@import '../../../styles/variables.styl';

.page.singlePostPage
  padding-top: 2em;

  @media (max-width: $md)
    padding-top: 0;

  .pageTitleText, .pageBody
    padding: 0 10px;
</style>
