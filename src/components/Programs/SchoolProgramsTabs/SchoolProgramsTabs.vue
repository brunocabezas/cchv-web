<template>
  <div class="schoolProgramTabs">
    <h1 class="pageTitle">Escuelas</h1>
    <!-- &#8221; => '' is used to filter  https://www.codetable.net/decimal/8221 -->
    <div
      class="pageBody schoolProgramsAbstract"
      v-if="
        schoolProgramsAbstract && !schoolProgramsAbstract.includes(`&#8221;`)
      "
      v-html="schoolProgramsAbstract"
    ></div>
    <Loader :loading="isLoading" />
    <div v-if="onBigScreen" class="pageRow schoolProgramTabsTitle">
      <button
        :title="`Ver ${tab.title}`"
        v-bind:class="{
          'schoolProgramTabTitle--active':
            activeProgram && activeProgram.id === tab.id
        }"
        class="schoolProgramTabTitle"
        v-bind:key="tab.id"
        @click="setActiveTab(tab.id)"
        v-for="(tab, index) in tabs"
      >
        <ProgressiveImage
          height="180px"
          :src="
            (activeProgram && activeProgram.id === tab.id) ||
            (!activeProgram && index === 0)
              ? tab.active_school_logo
              : tab.logo
          "
          className="schoolProgramTabLogo"
        />
      </button>
    </div>
    <div
      v-if="displayActiveProgram && onBigScreen"
      class="pageRow schoolProgramTabsContent"
    >
      <SchoolProgramThumbnail :program="activeProgram" />
    </div>
    <div v-if="!onBigScreen">
      <SchoolProgramThumbnail
        v-for="program in schoolPrograms"
        :program="program"
        v-bind:key="program.id"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./schoolProgramsTabs.ts"></script>
<style lang="stylus">
@import '../../../styles/variables.styl';

.schoolProgramTabs
  margin-top: 2em;
  position: relative;
  min-height: 600px;

  .pageTitle
    margin-bottom: 10px;
    justify-content: center;

    @media (max-width: $md)
      justify-content: flex-start;

  .schoolProgramsAbstract
    @media (max-width: $md)
      padding: $mobile_padding;

  .schoolProgramTabsTitle
    justify-content: center;
    margin-bottom: 2.5em;

    .schoolProgramTabTitle
      background: none;
      border: none;
      cursor: pointer;
      text-align: center;
      font-size: 18px;
      padding: 1em;
      transition: all 0.2s;

      &:hover
        text-decoration: underline;
        color: $blue;
        opacity: 0.7;

      &--active
        color: $blue;
        text-decoration: underline;

      .schoolProgramTabLogo
        margin: 0 auto;
        height: 180px;
        width: 180px;
        background-color: $blue;
        border-radius: 50%;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
</style>
