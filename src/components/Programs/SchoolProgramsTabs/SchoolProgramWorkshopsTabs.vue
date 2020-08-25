<template>
  <div class="workshopsTabs">
    <hr class="workshopTabSeparator" v-if="!onBigScreen" />
    <h1 class="pageTitle">
      Mandrágoras. Tecnologías para la conversación
    </h1>
    <div class="pageBody workshopsAbstract" v-html="workshopsAbstract"></div>
    <Loader :loading="isLoading" />
    <div v-if="onBigScreen" class="pageRow workshopsTabsTitle">
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
    <div v-if="onBigScreen" class="pageRow workshopsTabsContent">
      <SchoolProgramThumbnail isWorkshop :program="activeWorkshop" />
    </div>
    <div v-if="!onBigScreen">
      <SchoolProgramThumbnail
        isWorkshop
        v-for="program in workshops"
        :program="program"
        v-bind:key="program.id"
      />
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

  @media (max-width: $md)
    margin-top: 2em;

  .workshopTabSeparator
    width: calc(100% - 1em);

  .pageTitle
    margin-bottom: 25px;
    justify-content: center;

    @media (max-width: $md)
      justify-content: flex-start;

  .workshopsAbstract
    @media (max-width: $md)
      padding: $mobile_padding;

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
      transition: all 0.2;

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
