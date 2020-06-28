<template>
  <div class="page singlePostPage">
    <Loader :loading="isLoading" />
    <div v-if="page">
      <Media
        :height="MEDIA_HEIGHT"
        :youtubeUrl="page.video_url"
        :gallery="page.gallery"
      />
      <h1 v-html="page.name" class="pageTitleText"></h1>
      <div v-html="page.text"></div>
      <div v-if="page.pdf" class="pageBody">
        <DownloadLink label="Descargar programa completo" :url="page.pdf" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./singlePostPage.ts"></script>
<style lang="stylus">
@import '../../../styles/variables.styl';
</style>
