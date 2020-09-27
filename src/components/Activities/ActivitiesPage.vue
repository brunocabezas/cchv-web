<template>
  <div class="page activitiesPage">
    <div class="pageTitle">
      <router-link
        class="pageTitleLink"
        title="Volver a Campos Magnéticos"
        :to="backUrl"
      >
        <v-icon name="chevron-left" scale="0.8" />Campos Magnéticos</router-link
      >
      <h1 class="pageTitleText">{{ title }}</h1>
    </div>
    <Loader :loading="isLoading" />
    <ActivitiesGrid onPage v-if="!isLoading" :type="activityType" />
  </div>
</template>
<script lang="ts" src="./activitiesPage.ts"></script>
