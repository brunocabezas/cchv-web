<template>
  <div class="schoolProgramTabs">
    <div class="pageTitle">
      <h2 class="pageTitleText">Escuelas</h2>
    </div>
    <Loader :loading="isLoading" />
    <div class="pageRow schoolProgramTabsTitle">
      <button
        :title="`Ver ${tab.title}`"
        v-bind:class="{
          'schoolProgramTabTitle--active':
            activeProgram && activeProgram.id === tab.id
        }"
        class="schoolProgramTabTitle"
        v-bind:key="tab.id"
        @click="setActiveTab(tab.id)"
        v-for="tab in tabs"
      >
        <div
          class="schoolProgramTabLogo"
          v-bind:style="{ 'background-image': `url(${tab.logo})` }"
        ></div>

        {{ tab.title }}
      </button>
    </div>
    <div class="pageRow schoolProgramTabsContent">
      <div
        v-if="displayActiveProgram && activeProgram.gallery[0]"
        class="schoolProgram"
      >
        <div class="schoolProgramThumb">
          <router-link
            :title="activeProgram.name"
            :to="getSchoolProgramUrlBySlug(activeProgram.slug)"
          >
            <ProgressiveImage height="300px" :src="activeProgram.gallery[0].url"
          /></router-link>
        </div>
        <div class="schoolProgramInfo">
          <h3 class="schoolProgramName">
            <router-link
              :title="activeProgram.name"
              :to="getSchoolProgramUrlBySlug(activeProgram.slug)"
              >{{ activeProgram.name }}</router-link
            >
          </h3>
          <p>{{ activeProgram.abstract }}</p>
          <a
            download="diseño-web-mobile1.pdf"
            title="Descargar programa"
            :href="activeProgram.pdf"
            >Descargar programa completo</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./schoolProgramsTabs.ts"></script>
<style lang="stylus">
@import '../../styles/variables.styl';

.schoolProgramTabs
  position: relative;

  .pageTitle
    text-align: center;
    margin-bottom: 1.5em;

    .pageTitleText
      margin-bottom: 0;

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
      transition: 0.2 all;

      &:hover
        text-decoration: underline;
        color: $blue;
        opacity: 0.9;

      &--active
        color: $blue;
        text-decoration: underline;

      .schoolProgramTabLogo
        margin: 0 auto;
        height: 180px;
        width: 180px;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;

  .schoolProgramTabsContent
    .schoolProgram
      display: flex;
      width: 100%;

      .schoolProgramThumb, .schoolProgramInfo
        flex: 1;
        padding: 0 1em;

      .schoolProgramThumb
        width: 60%;
        max-height: 300px;
        padding-left: 0;

      .schoolProgramInfo
        padding-right: 0;
        font-size: 18px;

        .schoolProgramName
          color: $blue;
          margin-top: 0;
</style>
