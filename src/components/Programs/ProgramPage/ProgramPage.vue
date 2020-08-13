<template>
  <div
    v-bind:class="{
      'program--full-width': pageHasFullWidth,
      'program--small-title': displaySmallTitle
    }"
    class="page program"
  >
    <div class="program--full-width-boxed">
      <Loader v-if="!program" :loading="isLoading" />
      <div v-if="program" class="pageTitle">
        <h1 class="pageTitleText">{{ program.name }}</h1>
      </div>
      <Media
        :height="onBigScreen ? '500px' : '300px'"
        v-if="program"
        :youtubeUrl="program.video_url"
        :gallery="program.gallery"
      />

      <div
        v-if="program"
        class="pageRow pageBody programText"
        v-html="program.text"
      ></div>
      <DowneyProgramVideos v-if="isDowneyProgram" />
      <SchoolProgramsTabs v-if="isSchoolProgram" />
      <SchoolProgramWorkshopsTabs v-if="isSchoolProgram" />
      <ProgramActivites v-if="isMagneticFieldsProgram" />
      <Residencies v-if="isResidencies" />
    </div>
    <Editions v-if="isArtScienceAndCultureProgram" />
  </div>
</template>

<script lang="ts" src="./programPage.ts"></script>
<style lang="stylus">
@import '../../../styles/variables.styl';

.program
  .programText.pageRow
    display: block;

&.program--small-title
  .pageTitleText
    font-size: 38px;

  &.program--full-width
    width: 100% !important;
    padding: 0;
    max-width: none;

    .program--full-width-boxed
      max-width: $boxed_content_max_width;
      margin: 0 auto;
      page_padding(0, 0);
</style>
