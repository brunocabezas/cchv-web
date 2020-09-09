<template>
  <div class="page activitiesPage">
    <div class="pageTitle">
      <h1 class="pageTitleText">{{ title }}</h1>
      <router-link :to="backUrl">Campos Magneticos</router-link> 
    </div>
    <Loader :loading="isLoading" />
    <ActivitiesGrid onPage v-if="!isLoading" :type="activityType" />
  </div>
</template>
<script lang="ts" src="./activitiesPage.ts"></script>
