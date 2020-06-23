<template>
  <div class="workshopsTabs">
    <div class="pageTitle">
      <h2 class="pageTitleText">
        Mandrágoras. Tecnologías para la conversación
      </h2>
    </div>
    <Loader :loading="isLoading" />
    <div class="pageRow workshopsTabsTitle">
      <button
        :title="`Ver ${tab.title}`"
        v-bind:class="{
          'schoolProgramTabTitle--active':
            activeWorkshop && activeWorkshop.id === tab.id
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
      </button>
    </div>
    <div class="pageRow workshopsTabsContent">
      <div v-if="displayActiveWorkshop" class="schoolProgram">
        <div class="schoolProgramThumb">
          <router-link
            :title="activeWorkshop.name"
            :to="getWorkshopUrlBySlug(activeWorkshop.slug)"
          >
            <ProgressiveImage
              height="300px"
              :src="
                (activeWorkshop.gallery && activeWorkshop.gallery[0].url) || ''
              "
          /></router-link>
        </div>
        <div class="schoolProgramInfo">
          <h3 class="schoolProgramName">
            <router-link
              :title="activeWorkshop.name"
              :to="getWorkshopUrlBySlug(activeWorkshop.slug)"
              >{{ activeWorkshop.name }}</router-link
            >
          </h3>
          <p v-html="activeWorkshop.abstract"></p>
          <DownloadLink
            v-if="activeWorkshop.pdf"
            label="Descargar programa completo"
            :url="activeWorkshop.pdf"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./workshopsTabs.ts"></script>
<style lang="stylus">
@import '../../styles/variables.styl';

.workshopsTabs
  position: relative;

  .pageTitle
    text-align: center;
    margin-bottom: 1.5em;

    .pageTitleText
      margin-bottom: 0;

  .workshopsTabsTitle
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
        background-color: $blue;
        border-radius: 50%;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;

  .workshopsTabsContent
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
