<template>
  <div
    v-bind:class="{
      'program--full-width': pageHasFullWidth
    }"
    class="page program"
  >
    <div class="program--full-width-boxed">
      <Loader v-if="!program" :loading="isLoading" />
      <div v-if="program" class="pageTitle">
        <h1 class="pageTitleText">{{ program.name }}</h1>
      </div>
      <Media
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
      <ProgramActivities v-if="isMagneticFieldsProgram" />
      <Residencies v-if="isResidencies" />
    </div>
    <Editions v-if="isArtScienceAndCultureProgram" />
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="stylus">
@import '~/assets/variables.styl';

.program
  .programText.pageRow
    display: block;

  &.program--full-width
    width: 100% !important;
    padding: 0;
    max-width: none;

    .program--full-width-boxed
      max-width: $boxed_content_max_width;
      margin: 0 auto;
      page_padding(0, 0);
</style>
