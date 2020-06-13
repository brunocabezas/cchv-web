<template>
  <div class="page program">
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
    <WorkshopsTabs v-if="isSchoolProgram" />
    <ProgramActivites v-if="isMagneticFieldsProgram" />
  </div>
</template>

<script lang="ts" src="./programPage.ts"></script>
<style lang="stylus">
@import '../../styles/variables.styl';

.program
  .programText.pageRow
    display: block;
</style>
