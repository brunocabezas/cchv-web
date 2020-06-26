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
        <ProgressiveImage
          height="180px"
          className="schoolProgramTabLogo"
          :src="tab.logo"
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
          <p v-html="activeProgram.abstract"></p>
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

        .schoolProgramName
          color: $blue;
          margin-top: 0;
</style>
