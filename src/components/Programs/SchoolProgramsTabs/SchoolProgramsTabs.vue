<template>
  <div class="schoolProgramTabs">
    <h1 class="pageTitle">Escuelas</h1>
    <!-- &#8221; => '' is used to filter  https://www.codetable.net/decimal/8221 -->
    <div
      class="pageBody"
      v-if="
        schoolProgramsAbstract && !schoolProgramsAbstract.includes(`&#8221;`)
      "
      v-html="schoolProgramsAbstract"
    ></div>
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
    <div v-if="displayActiveProgram" class="pageRow schoolProgramTabsContent">
      <div class="schoolProgram">
        <div class="schoolProgramThumb">
          <router-link
            v-if="
              activeProgram.is_active &&
                activeProgram.gallery &&
                activeProgram.gallery[0]
            "
            :title="activeProgram.name"
            :to="getSchoolProgramUrlBySlug(activeProgram.slug)"
          >
            <ProgressiveImage
              height="300px"
              :src="activeProgram.gallery[0].url"
            />
          </router-link>
          <ProgressiveImage
            v-else-if="activeProgram.gallery && activeProgram.gallery[0]"
            height="300px"
            :src="activeProgram.gallery[0].url"
          />
        </div>
        <div class="schoolProgramInfo">
          <h3 class="schoolProgramName">
            <router-link
              v-if="activeProgram.is_active"
              :title="activeProgram.name"
              :to="getSchoolProgramUrlBySlug(activeProgram.slug)"
              >{{ activeProgram.name }}</router-link
            >
            {{ !activeProgram.is_active && activeProgram.name }}
          </h3>
          <p class="schoolProgramAbstract" v-html="activeProgram.abstract"></p>
          <DownloadLink
            v-if="activeProgram.pdf"
            label="Descargar programa completo"
            :url="activeProgram.pdf"
          />
        </div>
      </div>
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
    text-align: center;
    margin-bottom: 10px;
    justify-content: center;

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

  .schoolProgramTabsContent
    .schoolProgram
      display: flex;
      width: 100%;

      .schoolProgramThumb, .schoolProgramInfo
        flex: 1;

      .schoolProgramThumb
        width: 60%;
        padding-left: 0;
        height: 300px;
        background-color: $blue;
        margin-right: 1em;

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
</style>
