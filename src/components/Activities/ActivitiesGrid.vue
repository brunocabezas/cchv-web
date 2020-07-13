<template>
  <div v-if="activities.length" class="activitiesGrid">
    <h1 v-if="!onPage" class="activitiesGridTitle">
      <router-link :title="pageLinkTitle" :to="activitiesGridUrl">
        {{ title }}</router-link
      >
    </h1>
    <div class="activitiesGridContainer">
      <div v-for="act in activities" v-bind:key="act.id" class="activity">
        <router-link
          class="activitiesGridLink"
          :title="act.name"
          :to="
            act.isNewsPost
              ? getNewsPostUrlBySlug(act.slug)
              : getActivityUrlBySlug(act.slug)
          "
        >
          <ProgressiveImage
            v-if="act.gallery"
            height="200px"
            :src="act.gallery[0].url"
          />
          <h3 v-html="act.name" class="activitiesGridTitle"></h3>
        </router-link>
      </div>
      <div v-if="!onPage" class="activitiesGridGoToPageButtonContainer">
        <router-link
          class="activitiesGridGoToPageButton"
          :title="pageLinkTitle"
          :to="activitiesGridUrl"
        >
          Ver más</router-link
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./activitiesGrid.ts"></script>
<style lang="stylus">
@import '../../styles/variables.styl';

.activitiesGrid
  width: 100%;
  text-align: center;
  display: block;

  .activitiesGridContainer
    display: flex;
    flex-wrap: wrap;

    .activity
      margin: 5px;
      width: calc(33.333333% - 10px);

  .activitiesGridTitle
    margin-top: 5px;

    &:hover
      text-decoration: underline;

  .activitiesGridLink
    display: block;

    &:hover
      text-decoration: underline;

  .activitiesGridGoToPageButtonContainer
    width: 100%;
    display: flex;
    justify-content: flex-end;

    .activitiesGridGoToPageButton
      background-color: $blue;
      color: white;
      border: none;
      display: inline-block;
      width: 33.333%;
      padding: 5px 0;
      transform: background-color 0.2;

      &:hover
        background-color: darken($blue, 10);
</style>
