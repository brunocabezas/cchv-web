<template>
  <div class="workshopsTabs">
    <h1 class="pageTitle">
      Mandrágoras. Tecnologías para la conversación
    </h1>
    <div class="pageBody" v-html="workshopsAbstract"></div>
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
        v-for="(tab, index) in tabs"
      >
        <ProgressiveImage
          height="180px"
          :src="
            (activeWorkshop && activeWorkshop.id === tab.id) ||
            (!activeWorkshop && index === 0)
              ? tab.active_school_logo
              : tab.logo
          "
          className="schoolProgramTabLogo"
        />
      </button>
    </div>
    <div class="pageRow workshopsTabsContent">
      <div v-if="displayActiveWorkshop" class="schoolProgram">
        <div class="schoolProgramThumb">
          <router-link
            v-if="activeWorkshop.gallery && activeWorkshop.gallery[0]"
            :title="activeWorkshop.name"
            :to="getWorkshopUrlBySlug(activeWorkshop.slug)"
          >
            <ProgressiveImage
              height="300px"
              :src="activeWorkshop.gallery[0].url"
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
          <p class="schoolProgramAbstract" v-html="activeWorkshop.abstract"></p>
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

<script lang="ts" src="./schoolProgramWorkshopsTabs.ts"></script>
<style lang="stylus">
@import '../../../styles/variables.styl';

.workshopsTabs
  margin-top: 4em;
  position: relative;
  min-height: 630px;

  .pageTitle
    text-align: center;
    margin-bottom: 25px;
    justify-content: center;

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

  .workshopsTabsContent
    .schoolProgram
      display: flex;
      width: 100%;

      .schoolProgramThumb, .schoolProgramInfo
        flex: 1;

      .schoolProgramThumb
        width: 60%;
        height: 300px;
        background-color: $blue;
        padding: 0;
        margin-right: 1em;

        &:hover
          opacity: 0.8;

      .schoolProgramInfo
        padding-right: 0;
        font-size: 18px;
        padding: 0 1em;

        .schoolProgramAbstract
          margin-top: 0;
          text-align: justify;

        .schoolProgramName
          color: $blue;
          margin-top: 0;
          margin-bottom: 0;

          a:hover
            text-decoration: underline;
</style>
